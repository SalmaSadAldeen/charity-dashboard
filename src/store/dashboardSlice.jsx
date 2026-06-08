import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalDonations: "$4,829,150",
  completedCases: "1,240",
  assistanceTypes: "5 ",

  weeklyData: [40, 65, 85, 55, 70, 30, 20],
  yearlyData: [30, 45, 70, 50, 80, 60, 90, 75, 55, 15, 27, 83],

  requestsData: {
    total: 500,
    edu: 20,
    med: 15,
    food: 30,
    hou: 20,
    proj: 15,
  },
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // هنا ستضعين الأكواد الخاصة باستقبال البيانات عند نجاح الـ API لاحقاً
    setDashboardData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
