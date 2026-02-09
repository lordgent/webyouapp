"use client";

import { useEffect, useState, useRef, use } from "react";
import { getMessages, sendMessage } from "@/services/chat.service";
import { getOtherUserProfile, UserProfile } from "@/services/user.service";
import { ChevronLeft, Send, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function ChatDetailPage({ params }: { params: any }) {
  const router = useRouter();

  const resolvedParams = params instanceof Promise ? use(params) : params;
  const chatId = resolvedParams?.id;

  const [messages, setMessages] = useState<any[]>([]);
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !chatId || chatId === "undefined") return;

    const initChat = async () => {
      setLoading(true);
      try {
        const [msgData, userData] = await Promise.all([
          getMessages(chatId),
          getOtherUserProfile(chatId),
        ]);

        const rawMessages = msgData?.data?.messages || msgData?.messages || (Array.isArray(msgData) ? msgData : []);
        setMessages([...rawMessages].reverse());
        setOtherUser(userData);
      } catch (err) {
        console.error("Error loading chat data:", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [chatId, isMounted]);

  useEffect(() => {
    if (isMounted) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMounted]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;
    try {
      const res = await sendMessage(chatId, input);
      if (res.status === 200 || res.data) {
        const newMessage = res.data || res;
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
      }
    } catch (err) {
      console.error("Failed to send:", err);
    }
  };


  if (!isMounted) {
    return <div className="min-h-screen bg-[#09141A]" />;
  }

  if (loading && !otherUser) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="min-h-screen bg-[#09141A] flex flex-col text-white">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0E191F]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <ChevronLeft onClick={() => router.back()} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
          <div className="relative">
            {otherUser?.image ? (
              <img 
                src={otherUser.image} 
                className="w-10 h-10 rounded-full object-cover border border-[#D4B785]/30 shadow-sm" 
                alt="Profile"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B785] to-[#A0855B] flex items-center justify-center text-black font-bold text-lg border border-white/10">
                {otherUser?.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#09141A]" />
          </div>
          <div>
            <h2 className="text-sm font-bold leading-none mb-1">{otherUser?.name || "User"}</h2>
            <span className="text-[10px] text-green-500 font-medium italic">Online</span>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-gray-500 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full opacity-20 text-center py-20">
            <Send size={32} className="mb-2" />
            <p className="text-xs italic">Belum ada pesan.<br/>Mulai obrolan dengan {otherUser?.name}!</p>
          </div>
        ) : (
          messages.map((m, idx) => {
            const isThem = m.senderId?._id === chatId || m.senderId === chatId;
            return (
              <div key={m._id || idx} className={`flex ${!isThem ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 px-4 rounded-2xl max-w-[75%] text-sm shadow-sm ${
                  !isThem 
                    ? "bg-gradient-to-br from-[#D4B785] to-[#A0855B] text-black rounded-tr-none" 
                    : "bg-[#162329] text-white rounded-tl-none border border-white/5"
                }`}>
                  {m.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-[#0E191F] border-t border-white/5 pb-8">
        <div className="flex gap-2 bg-[#1F2C33] p-2 rounded-2xl border border-white/5 shadow-inner">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none px-3 text-sm placeholder:text-gray-600" 
            placeholder="Ketik pesan..." 
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-[#D4B785] text-black active:scale-90 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
          >
            <Send size={18} fill="black" />
          </button>
        </div>
      </div>
    </div>
  );
}