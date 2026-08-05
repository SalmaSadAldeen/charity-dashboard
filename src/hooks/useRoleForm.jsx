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

      if (typeof roleToEdit.label === "object" && roleToEdit.label !== null) {
        setLabelAr(roleToEdit.label.ar || "");
        setLabelEn(roleToEdit.label.en || "");
      } else {

        setLabelAr(roleToEdit.label || "");
        setLabelEn(roleToEdit.label || "");
      }


      const rawPermissions =
        roleToEdit.permissions ||
        roleToEdit.permissionIds ||
        roleToEdit.perms ||
        [];

      const existingPermissions = rawPermissions
        .map((p) => {
          if (typeof p === "object" && p !== null) {
            return p.id || p._id;
          }
          return p;
        })
        .filter(Boolean)
        .map(Number);

      setSelectedPermissions(existingPermissions);
    } else {
      setLabelAr("");
      setLabelEn("");
      setSelectedPermissions([]);
    }
  }, [roleToEdit, isEditMode]);

  const handleTogglePermission = (id) => {
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
        const roleId =
          roleToEdit?.id ||
          roleToEdit?._id ||
          (typeof roleToEdit === "object"
            ? Object.values(roleToEdit)[0]
            : roleToEdit);

        console.log("🎯 [Extracted Role ID]:", roleId);

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
