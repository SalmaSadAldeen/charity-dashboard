import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { sendAnnualReportAction } from "@/store/index";
import toast from "react-hot-toast";

export function useOrphanReport({ sponsorshipId, orphan, onClose, t }) {
  const reportArRef = useRef();
  const reportEnRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("ar");
  const dispatch = useDispatch();

  const handleConfirmAndSend = async () => {
    if (!reportArRef.current || !reportEnRef.current || !orphan) return;

    try {
      setIsSending(true);

      await new Promise((resolve) => setTimeout(resolve, 10));

      const canvasAr = await html2canvas(reportArRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const blobAr = await new Promise((resolve) =>
        canvasAr.toBlob(resolve, "image/png"),
      );

      const canvasEn = await html2canvas(reportEnRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const blobEn = await new Promise((resolve) =>
        canvasEn.toBlob(resolve, "image/png"),
      );

      if (!blobAr || !blobEn) {
        throw new Error(
          "فشل توليد صور التقرير، تأكد من ظهور عناصر التقرير على الشاشة.",
        );
      }

      const formData = new FormData();
      formData.append(
        "reportImageAr",
        blobAr,
        `annual-report-ar-${orphan.id}.png`,
      );
      formData.append(
        "reportImageEn",
        blobEn,
        `annual-report-en-${orphan.id}.png`,
      );

      const resultAction = await dispatch(
        sendAnnualReportAction({ sponsorshipId, formData }),
      );

      if (sendAnnualReportAction.fulfilled.match(resultAction)) {
        if (typeof onClose === "function") {
          onClose();
        }

        toast.success(t("report_sent_success"), {
          position: "top-center",
          duration: 4000,
        });
      } else {
        throw new Error(resultAction.payload || t("error_sending_report"));
      }
    } catch (error) {
      console.error(t("report_send_failed"), error);
      toast.error(error.message || t("error_sending_report"), {
        position: "top-center",
      });
    } finally {
      setIsSending(false);
    }
  };

  const getFieldValue = (field, type) => {
    if (!field) return "-";
    if (typeof field === "object") {
      return field[type] || "-";
    }
    return field;
  };

  return {
    reportArRef,
    reportEnRef,
    isSending,
    activeTab,
    setActiveTab,
    handleConfirmAndSend,
    getFieldValue,
  };
}
