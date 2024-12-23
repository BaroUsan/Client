import React from 'react';
import Header from '../app/components/Header/page';

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
    <div className="p-6 rounded-[12px] w-full h-[280px] flex flex-col justify-between" style={{ backgroundColor }}>
      <div className="text-[18px] font-bold text-[#4B8BF5] mt-6 font-sans">우산 {id}</div>
      <div className="text-[32px] font-semibold text-[#000000] mb-0 font-sans">대여 {status}</div> 
      <div className="text-[20px] font-Medium text-[#C2C2C2] mb-20 font-sans">
        {isRenting ? '대여 중 | ' : ''}{startDate} ~ {endDate}
      </div>
      <div className="flex justify-end -mt-2">
        <button className="bg-white px-4 py-2 rounded-md text-[#000000] font-semibold w-[127px] h-[39px]">
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
    <div className="min-h-screen bg-white flex flex-col font-sans"> 
      <Header />
      <div className="flex-grow mt-[70px]"> 
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}