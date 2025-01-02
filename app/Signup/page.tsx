'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import Header from '../Header/page';

export default function LoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const requestData = {
      email,
      studentId,
      name,
      password,
    };

    console.log('POST 데이터:', requestData);

    try {
      const response = await axios.post(
        'https://port-0-cloud-lylb047299de6c8f.sel5.cloudtype.app/signup',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          router.push('/signin'); 
        }, 1000); 
      }
    } catch (error: any) {
      console.log('Error details:', error);
      console.log('Response:', error.response);
      setErrorMessage(
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header />

      <div className="flex flex-grow flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-semibold mb-10">회원가입</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm text-center">{successMessage}</div>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@bssm.hs.kr 이메일 주소를 입력하세요."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="학번을 입력해주세요. ex)2409"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                {showPassword ? (
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22" />
                ) : (
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                )}
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            회원가입
          </button>
        </form>

        <div className="mt-6">
          <Link href="/signin" className="text-sm text-gray-600 hover:text-gray-800">
            이미 회원가입 했다면? 로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
