import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: 'last7days',
  startDate: null,
  endDate: null,
  transactionTypes: [],
  transactionStatus: [],
  isDrawerOpen: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setTransactionTypes: (state, action) => {
      state.transactionTypes = action.payload;
    },
    setTransactionStatus: (state, action) => {
      state.transactionStatus = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    clearFilters: (state) => {
      state.dateRange = 'last7days';
      state.startDate = null;
      state.endDate = null;
      state.transactionTypes = [];
      state.transactionStatus = [];
    },
  },
});

export const {
  setDateRange,
  setStartDate,
  setEndDate,
  setTransactionTypes,
  setTransactionStatus,
  toggleDrawer,
  closeDrawer,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
