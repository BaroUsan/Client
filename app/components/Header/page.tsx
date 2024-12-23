import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-none border-b border-[#EBEBEB]"> 
      <div className="flex items-center ml-[150px] mt-[10px]"> 
        <img src="/logo.svg" alt="바로우산 로고" className="h-8" /> 
      </div>
      <nav className="flex space-x-14 mr-[150px]">
        <a href="/" className="text-lg text-black hover:text-blue-600">홈</a> 
        <a href="#" className="text-lg text-black hover:text-blue-600">챗봇 대화</a> 
        <a href="#" className="text-lg text-black hover:text-blue-600">마이페이지</a> 
        <a href="#" className="text-lg text-black hover:text-blue-600">로그인</a>
      </nav>
    </header>
  );
};

export default Header;