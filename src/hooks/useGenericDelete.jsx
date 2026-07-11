import { useDispatch } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation";
import toast from "react-hot-toast";
import { deleteOrphan, deleteEmployee } from "@/store/index";

export const useGenericDelete = (type) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getAction = () => {
    switch (type) {
      case "orphan":
        return deleteOrphan;
      case "employee":
        return deleteEmployee;
      default:
        return null;
    }
  };

  const handleDelete = async (id, onSuccess) => {
    const action = getAction();
    if (!action) return;
    try {
      const result = await dispatch(action(id)).unwrap();
      toast.success(result?.message || t("deletedSuccessfully"));
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("errorOccurred"));
    }
  };

  return { handleDelete };
};
