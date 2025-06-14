import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="flex flex-col items-center p-5 bg-white rounded-xl border border-gray-200 transition-all hover:shadow-lg">
      <div className={`${color} p-4 rounded-full mb-4`}>
        {icon}
      </div>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className="text-gray-600">{title}</span>
    </div>
  );
};

export default StatCard;