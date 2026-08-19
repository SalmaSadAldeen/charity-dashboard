import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "@/store/index";
import toast from "react-hot-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { API } from "@/services/api";
import { useNavigate } from "react-router-dom";

export function useProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const isArabic = lang === "ar";

  const { selectedDetails: profileData, detailsStatus } = useSelector(
    (state) => state.profile || {},
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("MALE");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setEmail(profileData.email || "");
      setGender(profileData.gender || "MALE");
      setDateOfBirth(
        profileData.dateOfBirth ? profileData.dateOfBirth.split("T")[0] : "",
      );
      setPreviewImage(profileData.personalPhoto || "");
    }
  }, [profileData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonalPhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    const formData = new FormData();
    if (firstName) formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);
    if (email) formData.append("email", email);
    if (gender) formData.append("gender", gender);
    if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth);
    if (personalPhoto) formData.append("personalPhoto", personalPhoto);

    try {
      await dispatch(updateProfile(formData)).unwrap();

      toast.success(
        t("profileUpdatedSuccess") || "تم تحديث الملف الشخصي بنجاح",
      );
      dispatch(getProfile());

      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000);

    } catch (error) {
      toast.error(typeof error === "string" ? error : "فشل التحديث");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t("fillAllFields") || "يرجى تعبئة جميع الحقول");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        t("passwordLengthError") || "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("passwordsNotMatch") || "كلمة المرور غير متطابقة");
      return;
    }

    setLoadingPassword(true);
    try {
      await API.patch("/api/profile/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(
        t("passwordUpdatedSuccess") || "تم تغيير كلمة المرور بنجاح",
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "فشل تغيير كلمة المرور";

      toast.error(errorMsg);
    } finally {
      setLoadingPassword(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    gender,
    setGender,
    dateOfBirth,
    setDateOfBirth,
    previewImage,
    handleImageChange,
    handleUpdateProfile,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    loadingPassword,
    loadingProfile,
    isLoading: detailsStatus === "loading",
    isArabic,
    t,
  };
}