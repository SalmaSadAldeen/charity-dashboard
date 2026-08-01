import AppButton from "@/pages/Dashboard/components/AppButton";

export default function RoleModal({
  isOpen,
  isEditMode,
  currentRoleId,
  formData,
  setFormData,
  detailsStatus,
  selectedDetails,
  onClose,
  onSubmit,
  loading, // أضيفي حالة التحميل هنا إذا كانت موجودة بالـ store أو الـ state
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-surface-lowest w-full max-w-lg p-6 rounded-3xl shadow-xl border border-border">
        <h3 className="text-xl font-bold mb-4">
          {isEditMode ? "تعديل الدور والصلاحيات" : "إضافة دور جديد"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* حقول المدخلات (Name, Label Ar, Label En) نفس ما كانت */}
          <div>
            <label className="block text-xs font-bold mb-1">
              اسم الدور البرمجي (Name - English بدون فراغات)
            </label>
            <input
              type="text"
              required
              disabled={isEditMode && currentRoleId <= 6}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-border bg-surface-container/30 focus:outline-primary text-sm"
              placeholder="e.g. branch_manager"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">
                التسمية بالعربي (Label AR)
              </label>
              <input
                type="text"
                required
                value={formData.labelAr}
                onChange={(e) =>
                  setFormData({ ...formData, labelAr: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-border bg-surface-container/30 focus:outline-primary text-sm"
                placeholder="إدارة الفرع"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">
                التسمية بالإنجليزي (Label EN)
              </label>
              <input
                type="text"
                value={formData.labelEn}
                onChange={(e) =>
                  setFormData({ ...formData, labelEn: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-border bg-surface-container/30 focus:outline-primary text-sm"
                placeholder="Branch Management"
              />
            </div>
          </div>

          {/* قسم الموظفين الحاصلين على الدور */}
          {isEditMode &&
            detailsStatus === "succeeded" &&
            selectedDetails?.employees?.length > 0 && (
              <div className="bg-primary/5 p-3 rounded-2xl border border-primary/20">
                <span className="text-xs font-bold text-primary block mb-1">
                  الموظفون الحاصلون على هذا الدور:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedDetails.employees.map((emp) => (
                    <span
                      key={emp.userId}
                      className="text-xs bg-surface-lowest px-2.5 py-1 rounded-lg border border-border font-medium"
                    >
                      {emp.firstName} {emp.lastName}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* أزرار الإغلاق وAppButton الحماسي */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-border font-semibold text-sm hover:bg-surface-container transition"
            >
              إلغاء
            </button>

            <div className="w-1/2">
              <AppButton
                isLoading={loading}
                text={isEditMode ? "حفظ التعديلات" : "إضافة الدور"}
                loadingText="جاري الحفظ..."
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
