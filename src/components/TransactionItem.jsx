import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { HiArrowLongDown, HiArrowLongUp } from "react-icons/hi2";
import { bgColors, statusColors } from "../Reusable/constant";
import { formatDate } from "../Reusable/dateUtils";
import { formatAmount } from "../Reusable/formatCurrency";

const TransactionItem = ({ transaction }) => {
  const isCredit = transaction.type === "deposit";

  return (
    <div className="flex items-center gap-4 py-4 hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors">
      <div
        className={`w-12 h-12 rounded-full ${
          bgColors[isCredit ? transaction.status : "debit"] || "bg-green-50"
        } flex items-center justify-center flex-shrink-0`}
      >
        {isCredit ? (
          <HiArrowLongDown className="rotate-45 text-[#075132]" />
        ) : (
          <HiArrowLongUp className="rotate-45 text-[#961100]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[13px] font-medium text-gray-900 mb-2">
          {transaction.metadata?.product_name || transaction.type}
        </h3>
        <p className="text-[11px] text-gray-500">
          {transaction.metadata?.name}
        </p>
        {transaction.status && !isCredit && (
          <p
            className={`text-xs capitalize mt-0.5 ${
              statusColors[transaction.status.toLowerCase()] || "text-gray-600"
            }`}
          >
            {transaction.status}
          </p>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-[13px] font-bold text-[#131316]">
          {formatAmount(transaction.amount)}
        </div>
        <div className="text-[11px] text-gray-500 mt-0.5">
          {formatDate(transaction.date)}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
