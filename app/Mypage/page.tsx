'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../Header/page';

interface UserData {
  email: string;
  borrowedUmbrellas: string[];
  borrowDates: { [key: string]: string };
  dueDates: { [key: string]: string };
  overdueUmbrellas: string[];
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('userEmail');
      const accessToken = localStorage.getItem('accessToken');

      if (!email || !accessToken) {
        setError('로그인 정보가 없습니다. 다시 로그인해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://port-0-cloud-lylb047299de6c8f.sel5.cloudtype.app/mypage/${email}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.');
        }
      } catch (err) {
        setError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const umbrellaData = userData?.borrowedUmbrellas.map((code) => ({
    code,
    borrowDate: new Date(userData.borrowDates[code]).toLocaleDateString(),
    returnDate: new Date(userData.dueDates[code]).toLocaleDateString(),
    status: userData.overdueUmbrellas.includes(code) ? '연체' : '반납',
  })) || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex justify-center items-center flex-grow pt-8">
        <div className="w-full max-w-3xl">
          <div className="flex items-center mb-6">
            <Image
              src="/userface.svg"
              alt="User Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{userData?.email}</h2>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 text-center py-3 rounded-lg mb-6 font-semibold">
            🔔 현재 대여 중 | 우산 코드 {userData?.borrowedUmbrellas.join(', ')} / 반납 예정일 {umbrellaData.length > 0 ? umbrellaData[0].returnDate : '없음'}
          </div>

          <div className="w-full">
            <table className="w-full border-collapse text-sm text-gray-700 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-8 py-3 text-left font-semibold">우산코드</th>
                  <th className="border border-gray-200 px-8 py-3 text-left font-semibold">대여일자</th>
                  <th className="border border-gray-200 px-8 py-3 text-left font-semibold">반납일자</th>
                  <th className="border border-gray-200 px-8 py-3 text-left font-semibold">연체여부</th>
                </tr>
              </thead>
              <tbody>
                {umbrellaData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 px-8 py-3 text-center">{item.code}</td>
                    <td className="border border-gray-200 px-8 py-3 text-center">{item.borrowDate}</td>
                    <td className="border border-gray-200 px-8 py-3 text-center">{item.returnDate}</td>
                    <td
                      className={`border border-gray-200 px-8 py-3 text-center ${
                        item.status === '연체'
                          ? 'bg-red-50 text-red-600 font-semibold'
                          : 'bg-green-50 text-green-600 font-semibold'
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}