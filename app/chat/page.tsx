"use client";

import { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { getConversations  } from "@/services/chat.service";

export default function ChatListPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChat() {
      const data = await getConversations();
      setConversations(data);
      setLoading(false);
    }
    fetchChat();
  }, []);

  return (
    <BaseLayout>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full bg-[#162329] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-[#D4B785]/50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          {loading ? (
            <p className="text-center text-gray-500">Loading chats...</p>
          ) : conversations.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            conversations.map((chat: any) => (
              <div 
                key={chat.userId}
                onClick={() => router.push(`/chat/${chat.userId}`)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4B785] to-[#a88d5a] flex items-center justify-center text-black font-bold text-xl">
                    {chat.userName.charAt(0)}
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-[#D4B785] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09141A]">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 border-b border-white/5 pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm">{chat.userName}</h3>
                    <span className="text-[10px] text-gray-500">
                      {new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${chat.unreadCount > 0 ? "text-white font-medium" : "text-gray-500"}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </BaseLayout>
  );
}