import { ChevronDown, Download } from "lucide-react";
import {
  useGetWalletQuery,
  useGetTransactionsQuery,
} from "../store/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../store/slices/filterSlice";
import StatCard from "../components/StatCard";
import RevenueGraph from "../components/RevenueGraph";
import TransactionItem from "../components/TransactionItem";
import FilterDrawer from "../components/FilterDrawer";
import { useMemo } from "react";
import { EmptyState } from "../UI/Transaction/emptyState";
import { formatCurrency } from "../Reusable/formatCurrency";
import { getDateRangeCategory, getDateRangeText } from "../Reusable/dateUtils";

const RevenuePage = () => {
  const dispatch = useDispatch();
  const { data: walletData, isLoading: walletLoading } = useGetWalletQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactionsQuery();
  const { dateRange } = useSelector((state) => state.filter);

  // === Filter logic ===
  const filteredTransactions = useMemo(() => {
    if (!transactionsData) return [];
    const selectedDate = new Date(dateRange);
    const rangeCategory = getDateRangeCategory(selectedDate);

    return transactionsData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      switch (rangeCategory) {
        case "today":
          return transactionDate.toDateString() === new Date().toDateString();
        case "last7days":
          return new Date() - transactionDate <= 7 * 24 * 60 * 60 * 1000;
        case "thismonth":
          return (
            transactionDate.getMonth() === new Date().getMonth() &&
            transactionDate.getFullYear() === new Date().getFullYear()
          );
        case "last3months":
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return transactionDate >= threeMonthsAgo;
        default:
          return true;
      }
    });
  }, [transactionsData, dateRange]);

  const rangeCategory = getDateRangeCategory(dateRange);
  const rangeText = getDateRangeText(rangeCategory);

  const stats = [
    { label: "Ledger Balance", value: walletData?.ledger_balance },
    { label: "Total Payout", value: walletData?.total_payout },
    { label: "Total Revenue", value: walletData?.total_revenue },
    { label: "Pending Payout", value: walletData?.pending_payout },
  ];

  // === Loading state ===
  if (walletLoading || transactionsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-2 md:px-16 pt-6 md:pt-10 lg:pt-16 pb-12 w-full">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row w-full md:w-fit   mb-6 gap-4 lg:gap-16">
            <StatCard
              label="Available Balance"
              value={formatCurrency(walletData?.balance)}
              info={false}
            />
            <button className="px-8 md:px-12 py-3 mt-[10px] lg:mt-[20px] h-fit bg-black text-white rounded-3xl text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto">
              Withdraw
            </button>
          </div>

          <div className="w-full">
            <RevenueGraph transactions={filteredTransactions} />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-10 md:w-[30%] w-full">
          {stats.map(({ label, value }) => (
            <StatCard
              key={label}
              label={label}
              value={formatCurrency(value)}
              info
            />
          ))}
        </div>
      </div>

      {/* ===== Transactions Section ===== */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {filteredTransactions.length} Transactions
            </h2>
            <p className="text-[13px] text-[#56616B] mt-1">
              Your transactions {rangeText}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => dispatch(toggleDrawer())}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-t from-[#DBDEE5] to-[#F6F7F9] hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors"
            >
              Filter
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-t from-[#DBDEE5] to-[#F6F7F9] hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors">
              Export list
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <EmptyState click={() => dispatch(toggleDrawer())} />
        ) : (
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.payment_reference}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </div>

      <FilterDrawer />
    </div>
  );
};

export default RevenuePage;
