import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
import { PiDotOutlineFill } from "react-icons/pi";

const RevenueGraph = ({ transactions = [] }) => {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    const groupedByDate = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const dateKey = date.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          amount: 0,
          timestamp: date.getTime(),
        };
      }

      acc[dateKey].amount += transaction.amount;
      return acc;
    }, {});

    const sortedData = Object.values(groupedByDate)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((item) => ({
        date: item.date,
        amount: item.amount,
      }));

    return sortedData;
  }, [transactions]);

  const formatXAxis = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">
            {formatXAxis(payload[0].payload.date)}
          </p>
          <p className="text-sm font-semibold">
            USD{" "}
            {payload[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
      </div>
    );
  }

  const minDate = chartData.length > 0 ? chartData[0].date : "";
  const maxDate =
    chartData.length > 0 ? chartData[chartData.length - 1].date : "";

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF8A65" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FF8A65" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={false}
            height={0}
          />
          <YAxis hide={true} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#FF8A65", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#FF8A65"
            strokeWidth={2}
            fill="url(#colorAmount)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#FF8A65",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="w-full flex items-center gap-0">
        <PiDotOutlineFill className="text-[#DBDEE5] text-2xl mr-[-10px]" />{" "}
        <div className="w-full h-px bg-gradient-to-r from-[#DBDEE5] via-[#DBDEE5] to-[#DBDEE5]"></div>
        <PiDotOutlineFill className="text-[#DBDEE5] text-2xl ml-[-10px]" />
      </div>
      <div className="flex justify-between text-xs text-[#56616B] font-medium mt-1 px-2">
        <span>{formatXAxis(minDate)}</span>
        <span>{formatXAxis(maxDate)}</span>
      </div>
    </div>
  );
};

export default RevenueGraph;
