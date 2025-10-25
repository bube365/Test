import { Info } from "lucide-react";

const StatCard = ({ label, value, className = "", info }) => {
  return (
    <div
      className={`${className} flex items-start w-full justify-between gap-2 mb-2`}
    >
      <div>
        <span className="text-[13px] font-normal text-[#56616B]">{label}</span>
        <div className="text-xl md:text-2xl font-bold tracking-tight mt-2 md:mt-3 text-[#131316]">
          {value}
        </div>
      </div>
      {info && <Info className="w-[18px] h-[18px] text-gray-400" />}
    </div>
  );
};

export default StatCard;
