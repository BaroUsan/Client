"use client";

import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import Header from '../Header/page';
import Image from 'next/image';

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
            text: "죄송합니다. 아직 답변을 생성하도록 구현되지 않았습니다.",
            isUser: false,
          };
          setMessages(prev => [...prev, botMessage]);
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
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "죄송합니다. 아직 답변을 생성하도록 구현되지 않았습니다.",
        isUser: false,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <div className={`w-full max-w-3xl mx-auto h-screen flex flex-col transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {!isChatting ? (
          <div className="flex-1 flex flex-col pt-64 px-4">
            <div className="mb-12 text-center flex items-center justify-center">
              <Image src="/logo.svg" alt="Logo" width={120} height={36} />
              <span className="text-5xl font-semibold text-black">과 대화하기</span>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="메세지 입력"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartChat(inputText)}
                className="w-full p-4 pr-12 rounded-lg bg-white text-black border border-gray-200 focus:outline-none focus:border-gray-300"
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
                onClick={() => handleStartChat("오늘 날씨 알려줘")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                오늘 날씨 알려줘
              </button>
              <button 
                onClick={() => handleStartChat("우산 대여 여부 확인")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                우산 대여 여부 확인
              </button>
              <button 
                onClick={() => handleStartChat("날씨별 행동 추천")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                날씨별 행동 추천
              </button>
              <button 
                onClick={() => handleStartChat("내일 날씨 알려줘")}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                내일 날씨 알려줘
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden relative">
              <div className="h-[calc(100vh-90px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                <div className="p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isUser
                            ? 'bg-[#2D88FF] text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-[80px] left-0 right-0 bg-white border-t">
                <div className="p-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                      placeholder="메세지 입력"
                      className="w-full p-4 pr-12 rounded-lg bg-white text-black border border-gray-200 focus:outline-none focus:border-gray-300"
                    />
                    <button
                      onClick={() => handleSendMessage(inputText)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}