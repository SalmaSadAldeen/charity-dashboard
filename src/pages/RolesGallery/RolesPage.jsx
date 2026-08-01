import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  deleteRole,
  addRole,
  updateRole,
  fetchRoleById,
} from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import toast from "react-hot-toast";

import RolesHeader from "@/pages/RolesGallery/components/RolesHeader";
import RolesTable from "@/pages/RolesGallery/components/RolesTable";
import RoleModal from "@/pages/RolesGallery/components/RoleModel";
import DeleteConfirmModal from "@/pages/RolesGallery/components/DeleteConfirmModal";
import { useDelayedLoading } from "@/hooks/useDelayedLoading"; // استيراد الهوك

export default function RolesPage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const {
    items: roles,
    status,
    selectedDetails,
    detailsStatus,
  } = useSelector((state) => state.roles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDeleteId, setRoleToDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    labelAr: "",
    labelEn: "",
    permissionIds: [1, 2],
  });

  // إعادة جلب الأدوار تلقائياً عند تغيير اللغة أو عند أول تحميل
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch, lang]);
  const isReallyLoading = useDelayedLoading(status === "loading", 300);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentRoleId(null);
    setFormData({ name: "", labelAr: "", labelEn: "", permissionIds: [1, 2] });
    setIsModalOpen(true);
  };

  const handleOpenEditRole = async (role) => {
    setIsEditMode(true);
    setCurrentRoleId(role.id);
    const res = await dispatch(fetchRoleById({ id: role.id }));
    if (res.payload?.data) {
      const data = res.payload.data;
      setFormData({
        name: data.name,
        labelAr: data.label?.ar || data.label || "",
        labelEn: data.label?.en || "",
        permissionIds: data.permissions?.map((p) => p.id) || [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloadData = {
      name: formData.name,
      label: {
        ar: formData.labelAr,
        en: formData.labelEn || formData.labelAr,
      },
      permissionIds: formData.permissionIds,
    };

    if (isEditMode) {
      await dispatch(updateRole({ id: currentRoleId, data: payloadData }));
    } else {
      await dispatch(addRole(payloadData));
    }
    setIsModalOpen(false);
    dispatch(fetchRoles());
  };
  const handleDeleteClick = (id) => {
    setRoleToDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!roleToDeleteId) return;

    const res = await dispatch(deleteRole(roleToDeleteId));
    setIsDeleteModalOpen(false);
    setRoleToDeleteId(null);

    if (res.error) {
      toast.error(res.payload || t("roleLinkedError"), {
        position: lang === "ar" ? "bottom-left" : "bottom-right",
        style: {
          borderRadius: "16px",
          background: "#1e293b",
          color: "#ffffff",
          border: "1px solid #334155",
          borderLeft: "4px solid var(--color-error)",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 10px 10px -5px rgb(0 0 0 / 0.4)",
          padding: "14px 18px",
          fontWeight: "600",
          opacity: "1",
        },
      });
    } else {
      toast.success(t("roleDeleteSuccess"), {
        position: lang === "ar" ? "bottom-left" : "bottom-right",
        style: {
          borderRadius: "16px",
          background: "#1e293b",
          color: "#ffffff",
          border: "1px solid #334155",
          borderLeft: "4px solid #22c55e",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 10px 10px -5px rgb(0 0 0 / 0.4)",
          padding: "14px 18px",
          fontWeight: "600",
          opacity: "1",
        },
      });
      dispatch(fetchRoles());
    }
  };

  return (
    <div
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 1. Header Area */}
      <RolesHeader t={t} onAddClick={handleOpenAddModal} />

      {/* 2. Main Content Area مع تثبيت الارتفاع لمنع الرجة */}
      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
        <div className="relative min-h-[300px] flex flex-col">
          {/* الأفرلاي الخاص بالتحميل (Overlay) */}
          {isReallyLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-3xl z-20">
              <div className="flex items-center gap-2 text-on-surface-variant/80 text-base font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                <span className="ms-2">
                  {t("loading") ||
                    (lang === "ar" ? "جاري التحميل..." : "Loading...")}
                </span>
              </div>
            </div>
          )}

          <RolesTable
            roles={roles}
            status={status}
            onEdit={handleOpenEditRole}
            onDelete={handleDeleteClick}
            t={t}
            lang={lang}
          />
        </div>
      </section>

      <RoleModal
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        currentRoleId={currentRoleId}
        formData={formData}
        setFormData={setFormData}
        detailsStatus={detailsStatus}
        selectedDetails={selectedDetails}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        t={t}
        lang={lang}
      />
    </div>
  );
}
