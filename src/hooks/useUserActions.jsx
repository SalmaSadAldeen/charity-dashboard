import { useDispatch } from "react-redux"; // أضفنا useSelector
import { deleteEmployee } from "@/store/index"; // تأكدي من المسار الصحيح
// استيراد كائن الترجمة
import { useTranslation } from "@/hooks/useTranslation";

import toast from "react-hot-toast";
export const useEmployeeActions = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // إزالة الـ confirm هنا لأننا سنستخدم المودال في الجدول
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
      toast.success(t("deletedSuccessfully"));
    } catch (error) {
      toast.error(t("errorOccurred"));
    }
  };

  return { handleDelete };
};
