import { useDispatch, useSelector } from "react-redux"; // أضفنا useSelector
import { deleteEmployee } from "@/store/index"; // تأكدي من المسار الصحيح
// استيراد كائن الترجمة
import { useTranslation } from "@/hooks/useTranslation";

import toast from "react-hot-toast";
export const useUserActions = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.employees);

  const handleDelete = async (id) => {
    if (status === "loading") return;
    try {
      // طلب واحد فقط يكفي
      const result = await dispatch(deleteEmployee(id)).unwrap();
      const successMessage = result?.message || t("deletedSuccessfully");

      toast.success(successMessage);
    } catch (error) {
      const serverMessage = error?.response?.data?.message || error;
      toast.error(serverMessage || t("errorOccurred"));
    }
  };

  return { handleDelete, isLoading: status === "loading" };
};
