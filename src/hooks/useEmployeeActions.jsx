import { useDispatch, useSelector } from "react-redux"; // أضفنا useSelector
import { translations } from "@/context/translations";
import { deleteEmployee } from "@/store/index"; // تأكدي من المسار الصحيح
// استيراد كائن الترجمة
import toast from "react-hot-toast";
export const useEmployeeActions = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const t = (key) => translations[lang][key] || key;

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
