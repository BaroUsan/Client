import React from 'react';
import Header from './Header/page';
import Image from 'next/image';

interface UmbrellaCardProps {
  id: number;
  status: '가능' | '불가능';
  startDate: string;
  endDate: string;
  isRenting?: boolean;
}

const UmbrellaCard: React.FC<UmbrellaCardProps> = ({ id, status, startDate, endDate, isRenting }) => {
  const backgroundColor = isRenting ? '#FFF6F6' : '#E6FDF0';
  
  return (
    <div className="p-6 rounded-[12px] w-full h-[280px] flex flex-col justify-between" style={{ backgroundColor }}>
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold text-[#6D6D6D] mt-6 font-Pretendard">우산 {id}</div>
          <div className="text-[32px] font-semibold text-[#000000] mb-0 font-Pretendard">대여 {status}</div> 
          <div className="text-[20px] font-Medium text-[#878787] mb-20 font-Pretendard">
            {isRenting ? '대여 중: ' : ''}{startDate} ~ {endDate}
          </div>
        </div>
        <span className="text-[68px] font-Pretendard">{isRenting ? '🌂' : '☂'}</span>
      </div>
      <div className="flex justify-end -mt-2">
        <button className="bg-white px-4 py-2 rounded-md text-[#000000] font-semibold w-[127px] h-[39px] font-Pretendard">
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
          <div className="mb-4">
            <Image src="/logo.svg" alt="Logo" width={120} height={36} />
            <p className="text-[#878787] mt-2 font-Pretendard">우산이 필요한 날 우산을 대여해보세요.</p>
          </div>
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
          <p className="text-[#878787] text-center mt-4 font-Pretendard">
            대여 기간은 3일입니다. 3일내로 반납해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}