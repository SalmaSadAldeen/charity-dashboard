import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useCreateAidRequest } from "@/hooks/useCreateAidRequest";
import { ArrowLeft,  Sparkles } from "lucide-react";
import {  AnimatePresence } from "framer-motion";

import { HealthForm } from"@/pages/AddAidRequests/components/HealthForm";
import { FoodForm } from "@/pages/AddAidRequests/components/FoodForm";
import { EducationForm } from "@/pages/AddAidRequests/components/EducationForm";
import { HousingForm } from "@/pages/AddAidRequests/components/HousingForm";
import { SmallProjectsForm } from "@/pages/AddAidRequests/components/SmallProjectsForm";

export default function CreateAidRequestPage() {
  const { id: beneficiaryId } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { submitAidRequest, loading } = useCreateAidRequest(beneficiaryId);

  const [aidType, setAidType] = useState("HEALTH");
  const [form, setForm] = useState({
    categoryId: 1,
    subCategoryId: 2,
    beneficiaryFatherName: "",
    cost: "",
    isUrgent: false,
    titleAr: "",
    titleEn: "",
    detailsAr: "",
    detailsEn: "",
    descAr: "",
    descEn: "",
    donorImage: null,
    // الخاصة
    typeAid: "MEDICINE_INSURANCE",
    numberIndividuals: 5,
    academicAchievement: "BACHELOR",
    institutionNameAr: "",
    institutionNameEn: "",
    year: "2026",
    currentRent: 250,
    currentHousingSituationAr: "",
    currentHousingSituationEn: "",
    numberOfPeopleSupported: 3,
    projectNameAr: "",
    projectNameEn: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      title: { ar: form.titleAr, en: form.titleEn },
      details: { ar: form.detailsAr, en: form.detailsEn },
      description: { ar: form.descAr, en: form.descEn },
      institutionName:
        aidType === "EDUCATION"
          ? { ar: form.institutionNameAr, en: form.institutionNameEn }
          : undefined,
      currentHousingSituation:
        aidType === "HOUSING"
          ? {
              ar: form.currentHousingSituationAr,
              en: form.currentHousingSituationEn,
            }
          : undefined,
      projectName:
        aidType === "SMALL_PROJECTS"
          ? { ar: form.projectNameAr, en: form.projectNameEn }
          : undefined,
    };

    const res = await submitAidRequest(aidType, payload);
    if (res.success) {
      navigate(-1);
    }
  };

  const tabs = [
    { id: "HEALTH", label: t("aid_type_health"), color: "bg-blue-600" },
    { id: "FOOD", label: t("aid_type_food"), color: "bg-emerald-600" },
    { id: "EDUCATION", label: t("aid_type_education"), color: "bg-indigo-600" },
    { id: "HOUSING", label: t("aid_type_housing"), color: "bg-amber-600" },
    {
      id: "SMALL_PROJECTS",
      label: t("aid_type_small_projects"),
      color: "bg-purple-600",
    },
  ];

  return (
    <div
      className="p-6 md:p-8 max-w-4xl mx-auto space-y-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-700 rtl:rotate-180" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900">
              {t("create_aid_request")}
            </h1>
            <p className="text-xs text-slate-400 font-bold mt-0.5">
              Beneficiary ID: #{beneficiaryId}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-100 p-2 rounded-3xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAidType(tab.id)}
            className={`py-3 px-4 rounded-2xl text-xs font-black transition-all ${
              aidType === tab.id
                ? `${tab.color} text-white shadow-lg shadow-slate-300 scale-102`
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("beneficiary_father_name")}
            </label>
            <input
              type="text"
              value={form.beneficiaryFatherName}
              onChange={(e) =>
                setForm({ ...form, beneficiaryFatherName: e.target.value })
              }
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("cost")}
            </label>
            <input
              type="number"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
        </div>

        {/* Titles JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("title_ar")}
            </label>
            <input
              type="text"
              value={form.titleAr}
              onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("title_en")}
            </label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
        </div>

        {/* Details JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("details_ar")}
            </label>
            <input
              type="text"
              value={form.detailsAr}
              onChange={(e) => setForm({ ...form, detailsAr: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("details_en")}
            </label>
            <input
              type="text"
              value={form.detailsEn}
              onChange={(e) => setForm({ ...form, detailsEn: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
              required
            />
          </div>
        </div>

        {/* Description JSON */}
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("description_ar")}
          </label>
          <textarea
            value={form.descAr}
            onChange={(e) => setForm({ ...form, descAr: e.target.value })}
            rows="2"
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>

        {/* Dynamic Form Component based on Type */}
        <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
          <AnimatePresence mode="wait">
            {aidType === "HEALTH" && (
              <HealthForm key="health" form={form} setForm={setForm} t={t} />
            )}
            {aidType === "FOOD" && (
              <FoodForm key="food" form={form} setForm={setForm} t={t} />
            )}
            {aidType === "EDUCATION" && (
              <EducationForm
                key="education"
                form={form}
                setForm={setForm}
                t={t}
              />
            )}
            {aidType === "HOUSING" && (
              <HousingForm key="housing" form={form} setForm={setForm} t={t} />
            )}
            {aidType === "SMALL_PROJECTS" && (
              <SmallProjectsForm
                key="projects"
                form={form}
                setForm={setForm}
                t={t}
              />
            )}
          </AnimatePresence>
        </div>

        {/* File upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {t("donor_image")}
            </label>
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, donorImage: e.target.files[0] })
              }
              className="w-full text-xs font-bold text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white"
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isUrgent"
              checked={form.isUrgent}
              onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
              className="w-5 h-5 rounded-lg text-slate-900 focus:ring-slate-900"
            />
            <label
              htmlFor="isUrgent"
              className="text-xs font-black text-slate-700"
            >
              {t("is_urgent")}
            </label>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles size={18} />
          {loading ? t("processing") : t("submit_request")}
        </button>
      </form>
    </div>
  );
}
