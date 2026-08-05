import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRole, fetchRoleById } from "@/store/index";
import { useTranslation } from "@/hooks/useTranslation";
import toast from "react-hot-toast";

import RolesHeader from "@/pages/RolesGallery/components/RolesHeader";
import RolesTable from "@/pages/RolesGallery/components/RolesTable";
import RoleModal from "@/pages/RolesGallery/components/RoleModel";
import DeleteConfirmModal from "@/pages/RolesGallery/components/DeleteConfirmModal";

export default function RolesPage() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation();
  const { items: roles, status } = useSelector((state) => state.roles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDeleteId, setRoleToDeleteId] = useState(null);

  const hasExistingRoles = Array.isArray(roles) && roles.length > 0;
  const [hasLoadedAtLeastOnce, setHasLoadedAtLeastOnce] =
    useState(hasExistingRoles);


  useEffect(() => {
    if (!hasExistingRoles) {
      setHasLoadedAtLeastOnce(false);
    }
    dispatch(fetchRoles()).then(() => {
      setHasLoadedAtLeastOnce(true);
    });
  }, [dispatch, lang, hasExistingRoles]);


  const handleOpenAddModal = () => {
    setRoleToEdit(null);
    setIsModalOpen(true);
  };


  const handleOpenEditRole = (role) => {
    setRoleToEdit(role);
    setIsModalOpen(true);


    dispatch(fetchRoleById({ id: role.id })).then((res) => {
      if (res.payload?.data || res.payload) {
        setRoleToEdit(res.payload.data || res.payload);
      }
    });
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
      });
    } else {
      toast.success(t("roleDeleteSuccess"), {
        position: lang === "ar" ? "bottom-left" : "bottom-right",
      });
      setHasLoadedAtLeastOnce(false);
      dispatch(fetchRoles()).then(() => {
        setHasLoadedAtLeastOnce(true);
      });
    }
  };

  return (
    <div
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <RolesHeader t={t} onAddClick={handleOpenAddModal} />

      <section className="bg-surface-lowest p-6 rounded-3xl shadow-sm border border-border min-h-[500px] flex flex-col justify-between">
        <div className="relative min-h-[300px] flex flex-col">
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
        key={roleToEdit ? roleToEdit.id : "add-mode"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRoleToEdit(null);
        }}
        roleToEdit={roleToEdit}
        onSuccess={() => {
          setHasLoadedAtLeastOnce(false);
          dispatch(fetchRoles()).then(() => {
            setHasLoadedAtLeastOnce(true);
          });
        }}
        lang={lang}
        t={t}
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
