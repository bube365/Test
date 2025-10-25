import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ChevronDown } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  maxDate = new Date(),
}) => {
  const [localStart, setLocalStart] = useState(startDate || new Date());
  const [localEnd, setLocalEnd] = useState(endDate || new Date());

  const handleStartChange = (date) => {
    setLocalStart(date);
    if (date > localEnd) {
      setLocalEnd(date);
    }
    onChange?.({ startDate: date, endDate: localEnd });
  };

  const handleEndChange = (date) => {
    setLocalEnd(date);
    onChange?.({ startDate: localStart, endDate: date });
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Start Date */}
      <div className="relative w-full ">
        <DatePicker
          selected={localStart}
          onChange={handleStartChange}
          maxDate={maxDate}
          dateFormat="dd MMM yyyy"
          className="w-full px-4 py-3  bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          placeholderText="Start date"
          popperClassName="w-full"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* End Date */}
      <div className="relative w-full">
        <DatePicker
          selected={localEnd}
          onChange={handleEndChange}
          minDate={localStart}
          maxDate={maxDate}
          dateFormat="dd MMM yyyy"
          className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          placeholderText="End date"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};
