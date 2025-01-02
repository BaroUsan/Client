import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-none border-b border-gray-200">
      <div className="flex items-center ml-36 mt-2">
        <Image src="/logo.svg" alt="바로우산 로고" width={80} height={80} />
      </div>
      <nav className="flex space-x-14 mr-36">
        <Link href="/" className="text-lg text-black hover:text-blue-600">
          홈
        </Link>
        <Link href="/chat" className="text-lg text-black hover:text-blue-600">
          챗봇 대화
        </Link>
        <Link href="/mypage" className="text-lg text-black hover:text-blue-600">
          마이페이지
        </Link>
        {!isLoggedIn && (
          <Link href="/signin" className="text-lg text-black hover:text-blue-600">
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
