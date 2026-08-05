import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions, clearRoleDetails } from "@/store/index";
import { useRoleForm } from "@/hooks/useRoleForm";
import { X, Shield, Check, Loader2 } from "lucide-react";

export default function RoleModal({
  isOpen,
  onClose,
  onSuccess,
  roleToEdit,
  lang,
  t,
}) {
  const dispatch = useDispatch();
  const { items: permissions, status: permStatus } = useSelector(
    (state) => state.permissions,
  );

  console.log("🔍 [Permissions List]:", permissions);
  console.log("✏️ [Role To Edit Data]:", roleToEdit);

  const {
    labelAr,
    setLabelAr,
    labelEn,
    setLabelEn,
    selectedPermissions,
    handleTogglePermission,
    handleSubmit,
    loading,
    isEditMode,
    resetForm,
  } = useRoleForm({ roleToEdit, onClose, onSuccess });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchPermissions());
    }
  }, [isOpen, dispatch, lang]);

  const handleCloseModal = () => {
    if (resetForm) resetForm();
    dispatch(clearRoleDetails?.());
    onClose();
  };

  if (!isOpen) return null;

  const isPermLoading = permStatus === "loading" || permStatus === "pending";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {isEditMode ? t("editRoleAndPermissions") : t("addNewRole")}
              </h3>
              <p className="text-xs text-gray-500">
                {t("rolesManagementSubtitle")}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors shadow-sm border border-gray-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* اسم الدور باللغات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                {t("roleNameAr")}
              </label>
              <input
                type="text"
                required
                value={labelAr || ""}
                onChange={(e) => setLabelAr(e.target.value)}
                placeholder={t("roleNameArPlaceholder")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                {t("roleNameEn")}
              </label>
              <input
                type="text"
                required
                value={labelEn || ""}
                onChange={(e) => setLabelEn(e.target.value)}
                placeholder={t("roleNameEnPlaceholder")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
          </div>

          {/* قائمة الصلاحيات */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-3">
              {t("availablePermissions")}
            </label>

            {isPermLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto p-1 border border-gray-100 rounded-2xl bg-gray-50/50">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white animate-pulse"
                  >
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="w-5 h-5 rounded-md bg-gray-200 shrink-0"></div>
                      <div className="h-3.5 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto p-1 border border-gray-100 rounded-2xl bg-gray-50/50">
                {permissions?.map((permission) => {
                  const isSelected =
                    Array.isArray(selectedPermissions) &&
                    selectedPermissions.some(
                      (pId) => String(pId) === String(permission.id),
                    );
                  return (
                    <div
                      key={permission.id}
                      onClick={() => handleTogglePermission(permission.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/5 border-primary text-primary font-medium"
                          : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-primary border-primary text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className="text-xs truncate">
                          {permission.translatedName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {isEditMode ? t("updateRole") : t("saveRole")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
