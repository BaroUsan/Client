'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Send } from 'lucide-react';
import Header from '../Header/page'; // 헤더 추가

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const messageContainerRef = useRef<HTMLDivElement>(null); // 메시지 컨테이너 참조

  const handleStartChat = (text: string = '') => {
    setIsVisible(false);

    setTimeout(() => {
      setIsChatting(true);
      if (text) {
        const newMessage = {
          id: Date.now(),
          text: text,
          isUser: true,
        };
        setMessages([newMessage]);

        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: '죄송합니다. 아직 답변을 생성하도록 구현되지 않았습니다.',
            isUser: false,
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 1000);
      }
      setInputText('');
      setIsVisible(true);
    }, 300);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: text,
      isUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: '죄송합니다. 아직 답변을 생성하도록 구현되지 않았습니다.',
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-white">
      <Header /> {/* 헤더 추가 */}
      <div
        className={`w-full max-w-3xl mx-auto h-screen flex flex-col transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {!isChatting ? (
          <div className="flex-1 flex flex-col pt-28 px-4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="메세지 입력"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartChat(inputText)}
                className="w-full p-4 pr-12 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-300"
              />
              <button
                onClick={() => handleStartChat(inputText)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleStartChat('오늘 날씨 알려줘')}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                오늘 날씨 알려줘
              </button>
              <button
                onClick={() => handleStartChat('우산 대여 여부 확인')}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                우산 대여 여부 확인
              </button>
              <button
                onClick={() => handleStartChat('날씨별 행동 추천')}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                날씨별 행동 추천
              </button>
              <button
                onClick={() => handleStartChat('내일 날씨 알려줘')}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                내일 날씨 알려줘
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={messageContainerRef}
              className={`flex-1 p-4 space-y-4 overflow-y-auto`}
              style={{
                maxHeight: 'calc(100vh - 230px)', // 스크롤 높이 제한
                scrollbarWidth: 'none', // Firefox 스크롤 숨김
                msOverflowStyle: 'none', // IE 스크롤 숨김
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none; /* WebKit 기반 브라우저에서 스크롤바 숨김 */
                }
              `}</style>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative" style={{ position: 'relative', bottom: '-70px' }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="메세지 입력"
                className="w-full p-4 pr-12 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-300"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Send size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
