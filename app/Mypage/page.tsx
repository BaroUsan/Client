'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../Header/page'; 

export default function UserDashboard() {
  const umbrellaData = [
    { code: 2, borrowDate: '24/09/15', returnDate: '24/09/18', status: '반납' },
    { code: 1, borrowDate: '24/10/13', returnDate: '24/10/16', status: '반납' },
    { code: 3, borrowDate: '24/11/3', returnDate: '24/11/9', status: '연체' },
    { code: 4, borrowDate: '24/11/15', returnDate: '24/11/18', status: '반납' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex justify-center items-center flex-grow mt-[-90]">
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
              <h2 className="text-lg font-semibold text-gray-800">XXX님</h2>
              <p className="text-sm text-gray-500">2023XXX@bssm.hs.kr</p>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 text-center py-3 rounded-lg mb-6 font-semibold">
            🔔 현재 대여 중 | 우산 코드 1 / 반납 예정일 24/12/15
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