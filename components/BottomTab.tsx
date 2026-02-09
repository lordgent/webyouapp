"use client";

import { Heart, MessageCircle, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomTab() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Discover", icon: Heart, path: "/" },
    { label: "Chats", icon: MessageCircle, path: "/chat" },
    { label: "Profile", icon: User, path: "/user-info" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0E191F]/90 backdrop-blur-xl py-3 px-10 flex justify-between items-center border-t border-white/5 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
              isActive ? "text-[#D4B785] scale-110" : "text-gray-500 hover:text-white"
            }`}
          >
            <item.icon size={24} fill={isActive ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}