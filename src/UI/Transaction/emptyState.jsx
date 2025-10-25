import React from "react";
import { MdReceiptLong } from "react-icons/md";

export const EmptyState = ({ click }) => {
  return (
    <div className="flex flex-col items-center md:items-start mx-auto md:max-w-[30%] justify-center py-20">
      <div className="w-14 h-14 bg-gradient-to-t from-[#DBDEE5] to-[#F6F7F9] rounded-2xl flex items-center justify-center mb-4">
        <MdReceiptLong className="text-[#131316] text-2xl " />
      </div>
      <h3 className="text-base md:text-2xl text-center md:text-start font-bold text-gray-900 mb-2">
        No matching transaction found for the selected filter
      </h3>

      <p className="text-sm text-gray-500 mb-6 max-w-md text-center md:text-start">
        Change your filters to see more results, or add a new product.
      </p>
      <button
        onClick={() => {
          click();
        }}
        className="px-6 py-2.5 bg-gradient-to-t from-[#DBDEE5] to-[#F6F7F9] hover:bg-gradient-to-b rounded-full text-sm font-medium transition-colors"
      >
        Clear Filter
      </button>
    </div>
  );
};
