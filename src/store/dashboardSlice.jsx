import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "@/services/adminService"; // تأكدي من مسار ملف الـ service
import { beneficiaryService } from "@/services/beneficiaryService"; // استيراد الخدمة
// 1. تعريف الـ Thunks لجلب البيانات من الـ API
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await adminService.getDashboardStats();
    return response.data;
  },
);

export const fetchCharts = createAsyncThunk(
  "dashboard/fetchCharts",
  async (view) => {
    const response = await adminService.getDistributionCharts(view);
    return response.data;
  },
);
export const fetchRequestsCharts = createAsyncThunk(
  "dashboard/fetchRequests",
  async () => {
    const response = await adminService.getRequestsCharts();
    return response.data;
  },
);

export const fetchBeneficiaryStats = createAsyncThunk(
  "dashboard/fetchBeneficiaryStats",
  async () => {
    const response = await beneficiaryService.getHelpRequestStats();
    return response.data;
  },
);
const initialState = {
  stats: null, // الأرقام الرئيسية
  charts: [], // المخططات البيانية
  isLoading: false,
  error: null,
  beneficiariesStats: null, // <--- أضيفي هذا هنا
  requestsCharts: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  // 2. معالجة حالات الجلب (التحميل والنجاح والخطأ)
  extraReducers: (builder) => {
    builder
      // التعامل مع الإحصائيات الرئيسية
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchRequestsCharts.fulfilled, (state, action) => {
        // افترضي أنكِ ستخزنينها في متغير جديد اسمه requestsCharts
        state.requestsCharts = action.payload;
      })
      // التعامل مع المخططات
      .addCase(fetchCharts.fulfilled, (state, action) => {
        state.charts = action.payload;
      })
      .addCase(fetchBeneficiaryStats.fulfilled, (state, action) => {
        state.beneficiariesStats = action.payload; // هنا نخزن إحصائيات المستفيدين
      })
      .addCase(fetchBeneficiaryStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("خطأ في السيرفر:", action.error);
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
