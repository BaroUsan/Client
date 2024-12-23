import React from 'react';

interface UmbrellaCardProps {
  id: number;
  status: '가능' | '불가능';
  startDate: string;
  endDate: string;
  isRenting?: boolean;
}

const UmbrellaCard: React.FC<UmbrellaCardProps> = ({ id, status, startDate, endDate, isRenting }) => {
  const backgroundColor = isRenting ? '#FFE5E5' : '#F7F7F7';
  
  return (
    <div className="p-6 rounded-[12px] w-full max-w-[380px] h-[280px] flex flex-col justify-between" style={{ backgroundColor }}>
      <div className="text-[18px] font-bold text-[#4B8BF5] mt-6">우산 {id}</div>
      <div className="text-[32px] font-semibold text-[#000000] mb-0">대여 {status}</div> 
      <div className="text-[20px] font-Medium text-[#C2C2C2] mb-20">
        {isRenting ? '대여 중 | ' : ''}{startDate} ~ {endDate}
      </div>
      <div className="flex justify-end -mt-2">
        <button className="bg-white px-4 py-2 rounded-md text-gray-700 w-[127px] h-[39px]">
          대여하기
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  const umbrellas = [
    { id: 1, status: '가능', startDate: '24.12.21', endDate: '24.12.24' },
    { id: 2, status: '가능', startDate: '24.12.21', endDate: '24.12.24' },
    { id: 3, status: '가능', startDate: '24.12.21', endDate: '24.12.24' },
    { id: 4, status: '가능', startDate: '24.12.21', endDate: '24.12.24' },
    { id: 5, status: '불가능', startDate: '24.12.21', endDate: '24.12.24', isRenting: true },
    { id: 6, status: '가능', startDate: '24.12.21', endDate: '24.12.24' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center"> 
          {umbrellas.map((umbrella) => (
            <UmbrellaCard
              key={umbrella.id}
              id={umbrella.id}
              status={umbrella.status as '가능' | '불가능'}
              startDate={umbrella.startDate}
              endDate={umbrella.endDate}
              isRenting={umbrella.isRenting}
            />
          ))}
        </div>
      </div>
    </div>
  );
}