import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRole, updateRole } from "@/store/index";

export const useRoleForm = ({ roleToEdit, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(roleToEdit);

  const [labelAr, setLabelAr] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔍 [Full roleToEdit Object]:", roleToEdit);
    if (isEditMode && roleToEdit) {
      setLabelAr(roleToEdit.label?.ar || "");
      setLabelEn(roleToEdit.label?.en || "");

      const existingPermissions = roleToEdit.permissions
        ? roleToEdit.permissions.map((p) => (typeof p === "object" ? p.id : p))
        : roleToEdit.permissionIds || [];

      setSelectedPermissions(existingPermissions);
    } else {
      setLabelAr("");
      setLabelEn("");
      setSelectedPermissions([]);
    }
  }, [roleToEdit, isEditMode]);
  const handleTogglePermission = (id) => {
    // 👈 تحويل الـ id إلى رقم صريح (Number) لضمان عدم حدوث مشاكل تطابق الأنواع (Type Mismatch)
    const numericId = Number(id);

    setSelectedPermissions((prev) =>
      prev.includes(numericId)
        ? prev.filter((item) => item !== numericId)
        : [...prev, numericId],
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      label: {
        ar: labelAr,
        en: labelEn,
      },
      permissionIds: selectedPermissions,
    };

    console.log("🚀 [Frontend JSON Payload Sent]:", payload);

    try {
      let result;
      if (isEditMode) {
        // 🔍 البحث عن الـ id بكل الطرق الممكنة لمنع ظهور undefined
        const roleId =
          roleToEdit?.id ||
          roleToEdit?._id ||
          (typeof roleToEdit === "object"
            ? Object.values(roleToEdit)[0]
            : roleToEdit);

        console.log("🎯 [Extracted Role ID]:", roleId); // التأكد من أنه ظهر رقماً وليس undefined

        if (!roleId) {
          throw new Error("Role ID is missing!");
        }

        result = await dispatch(
          updateRole({ id: roleId, data: payload }),
        ).unwrap();
      } else {
        result = await dispatch(addRole(payload)).unwrap();
      }

      console.log("✅ [API Success Response]:", result);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error(
        "تفاصيل خطأ الباك إند:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    labelAr,
    setLabelAr,
    labelEn,
    setLabelEn,
    selectedPermissions,
    handleTogglePermission,
    handleSubmit,
    loading,
    isEditMode,
  };
};
