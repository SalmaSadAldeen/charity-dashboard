export function CommonAidFields({ commonForm, setCommonForm, t }) {
  const handleDonorImageChange = (e) => {
    setCommonForm({ ...commonForm, donorImage: e.target.files[0] });
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setCommonForm({ ...commonForm, media: files });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("beneficiary_father_name")}
          </label>
          <input
            type="text"
            value={commonForm.beneficiaryFatherName}
            onChange={(e) =>
              setCommonForm({
                ...commonForm,
                beneficiaryFatherName: e.target.value,
              })
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
            value={commonForm.cost}
            onChange={(e) =>
              setCommonForm({ ...commonForm, cost: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("title_ar")}
          </label>
          <input
            type="text"
            value={commonForm.titleAr}
            onChange={(e) =>
              setCommonForm({ ...commonForm, titleAr: e.target.value })
            }
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
            value={commonForm.titleEn}
            onChange={(e) =>
              setCommonForm({ ...commonForm, titleEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("details_ar")}
          </label>
          <textarea
            value={commonForm.detailsAr}
            onChange={(e) =>
              setCommonForm({ ...commonForm, detailsAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("details_en")}
          </label>
          <textarea
            value={commonForm.detailsEn}
            onChange={(e) =>
              setCommonForm({ ...commonForm, detailsEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("description_ar")}
          </label>
          <textarea
            value={commonForm.descAr}
            onChange={(e) =>
              setCommonForm({ ...commonForm, descAr: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("description_en")}
          </label>
          <textarea
            value={commonForm.descEn}
            onChange={(e) =>
              setCommonForm({ ...commonForm, descEn: e.target.value })
            }
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("donor_image")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleDonorImageChange}
            className="w-full p-2 rounded-2xl border border-slate-200 bg-slate-50 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-700 mb-1">
            {t("beneficiary_media")}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMediaChange}
            className="w-full p-2 rounded-2xl border border-slate-200 bg-slate-50 text-sm"
          />
          <p className="text-[10px] text-slate-400 mt-1">
            {t("can_select_multiple_files")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5">
        <input
          type="checkbox"
          id="isUrgent"
          checked={commonForm.isUrgent}
          onChange={(e) =>
            setCommonForm({ ...commonForm, isUrgent: e.target.checked })
          }
          className="w-5 h-5 rounded-lg accent-slate-900 cursor-pointer"
        />
        <label
          htmlFor="isUrgent"
          className="text-xs font-black text-slate-700 cursor-pointer"
        >
          {t("is_urgent")}
        </label>
      </div>
    </div>
  );
}
