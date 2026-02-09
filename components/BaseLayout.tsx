"use client";

import BottomTab from "./BottomTab";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#09141A] via-[#09141A] to-[#1F4247] text-white flex flex-col relative overflow-hidden">
      <div className="flex-1 pb-24 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {children}
      </div>
      <BottomTab />
    </div>
  );
}