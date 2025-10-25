import { X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateRange,
  setStartDate,
  setEndDate,
  setTransactionTypes,
  setTransactionStatus,
  clearFilters,
  closeDrawer,
} from "../store/slices/filterSlice";
import { useState } from "react";
import { DateRangePicker } from "../Reusable/datePicker";
import { MultiSelectDropdown } from "../Reusable/MultiSelectDropdown";

const FilterDrawer = () => {
  const dispatch = useDispatch();
  const {
    isDrawerOpen,
    dateRange,
    startDate,
    endDate,
    transactionTypes,
    transactionStatus,
  } = useSelector((state) => state.filter);

  const [selectedDateRange, setSelectedDateRange] = useState(dateRange);
  const [filterdateRange, setFilterDateRange] = useState({
    startDate: new Date(startDate || "2023-07-17"),
    endDate: new Date(endDate || "2023-08-17"),
  });
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const transactionTypeOptions = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer and Earn",
  ];

  const statusOptions = ["Successful", "Pending", "Failed"];

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setSelectedDateRange("last7days");
    setSelectedStartDate("2023-07-17");
    setSelectedEndDate("2023-08-17");
    dispatch(closeDrawer());
  };

  const handleApply = () => {
    dispatch(setDateRange(selectedDateRange));
    dispatch(setStartDate(filterdateRange?.startDate));
    dispatch(setEndDate(filterdateRange?.endDate));
    dispatch(closeDrawer());
  };

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "last7days", label: "Last 7 days" },
    { value: "thismonth", label: "This month" },
    { value: "last3months", label: "Last 3 months" },
  ];

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#E8E8E8] bg-opacity-70 z-50"
        onClick={handleClose}
      ></div>

      <div className="fixed  right-2 top-2  bottom-2 w-[80%] lg:w-[30%] rounded-3xl  bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-2 md:px-4 py-5 ">
          <h2 className="text-lg font-bold">Filter</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 md:px-4 py-4">
          <div className="flex gap-1 md:gap-2 w-full justify-between mb-6">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDateRange(option.value)}
                className={`px-[2px] md:px-1 w-full py-2 rounded-full text-[#131316] text-[9px] md:text-xs font-medium transition-colors ${
                  selectedDateRange === option.value
                    ? "bg-[#EFF1F6] "
                    : "border border-[#EFF1F6] hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="pb-6 pt-4 w-full">
            <label className="block text-sm font-semibold text-[#131316] mb-3">
              Date Range
            </label>
            <DateRangePicker
              startDate={filterdateRange.startDate}
              endDate={filterdateRange.endDate}
              onChange={setFilterDateRange}
            />
          </div>

          <div className="mb-6">
            <MultiSelectDropdown
              label="Transaction Type"
              options={transactionTypeOptions}
              selected={transactionTypes}
              onChange={(selected) => dispatch(setTransactionTypes(selected))}
              placeholder="Select transaction types"
            />
          </div>

          <div className="mb-6">
            <MultiSelectDropdown
              label="Transaction Status"
              options={statusOptions}
              selected={transactionStatus}
              onChange={(selected) => dispatch(setTransactionStatus(selected))}
              placeholder="Select transaction status"
            />
          </div>
        </div>

        <div className=" px-6 py-4 flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 px-6 py-3 border border-[#EFF1F6] bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-full font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
