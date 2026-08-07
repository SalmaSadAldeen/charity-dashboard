import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";

import { API } from "@/services/api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await API.post("/auth/login", { email, password });
      const { accessToken, user, userType } = response.data;

      localStorage.setItem("token", accessToken);

      localStorage.setItem("rememberedEmail", email);

      dispatch(
        loginSuccess({
          ...user,
          userType: userType,
        }),
      );
      navigate("/dashboard/employees");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login Failed";
      dispatch(loginFailure(errorMessage));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    isLoading,
    error,
    togglePasswordVisibility,
    handleLoginSubmit,
  };
};
