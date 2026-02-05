"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DUMMY_MESSAGES = [
  { id: 1, sender: "Zayn", text: "Bro, di mana?", time: "10:30", isMe: false },
  { id: 2, sender: "Me", text: "Lagi di cafe dekat kantor nih. Kenapa?", time: "10:32", isMe: true },
  { id: 3, sender: "Zayn", text: "Bawa laptop gak? Mau titip cek kodingan bentar.", time: "10:33", isMe: false },
  { id: 4, sender: "Me", text: "Bawa kok, sini aja kalau mau.", time: "10:35", isMe: true },
];

export default function ChatDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <main className="flex h-screen flex-col bg-[#09141A]">
      {/* Header */}
      <header className="flex items-center gap-4 bg-gradient-to-r from-[#09141A] to-[#1F4247] p-4 shadow-md">
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-[#62CDCB]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center font-bold border border-[#62CDCB]">
          Z
        </div>
        
        <div className="flex-1">
          <h2 className="text-sm font-bold text-white">Zayn</h2>
          <span className="text-[10px] text-[#62CDCB]">Online</span>
        </div>
      </header>

      {/* Message Area */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        {DUMMY_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                msg.isMe
                  ? "bg-gradient-to-r from-[#62CDCB] to-[#4599DB] text-white rounded-tr-none"
                  : "bg-[#1F4247] text-white rounded-tl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.isMe ? "text-blue-100" : "text-gray-400"} text-right`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </section>

      <footer className="p-4 bg-[#09141A]">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-[#1F4247] px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#62CDCB]"
          />
          <button
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#62CDCB] to-[#4599DB] text-white transition hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rotate-45">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </footer>
    </main>
  );
}