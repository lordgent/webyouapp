"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DUMMY_CHATS = [
  { id: 1, name: "Zayn", message: "Bro, di mana?", time: "10:30", unread: 2 },
  { id: 2, name: "Alice", message: "Proyeknya sudah selesai ya", time: "09:15", unread: 0 },
  { id: 3, name: "Dev Team", message: "Pull request sudah di-merge", time: "Yesterday", unread: 5 },
  { id: 4, name: "Mama", message: "Jangan lupa makan malam", time: "Yesterday", unread: 0 },
];

export default function ChatList() {
  const router = useRouter();

  return (
    <main className="min-h-screen items-center justify-center  bg-gradient-to-r from-[#09141A] via-[#09141A] to-[#1F4247] ">
      <header className="flex items-center justify-between bg-gradient-to-r from-[#09141A] to-[#1F4247] p-6 shadow-md">
        <h1 className="text-xl font-bold text-white">Chats</h1>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#62CDCB] to-[#4599DB] flex items-center justify-center font-bold">
          JD
        </div>
      </header>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full rounded-xl bg-[#1F4247] px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#62CDCB]"
        />
      </div>

      <section className="flex-1 overflow-y-auto px-2">
        {DUMMY_CHATS.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            className="flex items-center gap-4 rounded-2xl p-4 transition hover:bg-[#1F4247] cursor-pointer"
          >
            <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gray-600 flex items-center justify-center text-lg font-semibold border-2 border-[#62CDCB]">
              {chat.name[0]}
            </div>

            <div className="flex-1 border-b border-gray-800 pb-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{chat.name}</h3>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-400 truncate w-48">
                  {chat.message}
                </p>
                {chat.unread > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-[#62CDCB] to-[#4599DB] px-1 text-[10px] font-bold text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <button className="fixed bottom-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#62CDCB] to-[#4599DB] shadow-lg hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </main>
  );
}