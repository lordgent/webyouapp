"use client";

import { useEffect, useState } from "react";
import { getMe, getDiscovery, UserProfile } from "@/services/user.service";
import { X, Heart, MessageCircle, Settings } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function DatingHome() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | any>(null);
  const [discoveryUsers, setDiscoveryUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const [me, discovery] = await Promise.all([getMe(), getDiscovery()]);
        setCurrentUser(me);
        setDiscoveryUsers(discovery);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleAction = () => {
    setDiscoveryUsers((prev) => prev.slice(1));
  };

  if (loading) return (
   <LoadingScreen />
  );

  const activeUser = discoveryUsers[0];

  return (
    <BaseLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* <Settings size={24} className="text-gray-400 cursor-pointer" /> */}
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-[#D4B785] to-[#f3e3ad] bg-clip-text text-transparent">
          YOUAPP
        </h1>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4B785] flex items-center justify-center bg-[#162329]">
          {currentUser?.image && currentUser.image.length > 0 ? (

            <img
              src={currentUser.image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] font-bold text-[#D4B785]">
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 mt-4 relative flex flex-col items-center">
        {activeUser ? (
          <>
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl group transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                {activeUser.image && activeUser.image.length > 0 ? (
                  <img
                    src={activeUser.image.startsWith('data:') ? activeUser.image : `data:image/png;base64,${activeUser.image}`}
                    className="w-full h-full object-cover"
                    alt={activeUser.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#162329] to-[#09141A]">
                    <span className="text-6xl font-bold text-[#D4B785] opacity-50">
                      {activeUser.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeUser.name}{activeUser.age ? `, ${activeUser.age}` : ''}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {activeUser.interests?.length > 0 ? (
                    activeUser.interests.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium border border-white/5">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">No interests shared</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={handleAction}
                className="w-14 h-14 rounded-full bg-[#162329] border border-white/5 flex items-center justify-center text-red-500 shadow-lg active:scale-90 transition-transform hover:bg-white/5"
              >
                <X size={28} />
              </button>
              <button
                onClick={() => activeUser?._id && router.push(`/chat/${activeUser._id}`)}
                disabled={!activeUser?._id}
                className={`w-12 h-12 rounded-full bg-[#162329] border border-white/5 flex items-center justify-center text-blue-400 shadow-lg active:scale-90 transition-transform hover:bg-white/5 ${!activeUser?._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <MessageCircle size={22} />
              </button>
              <button
                onClick={handleAction}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4B785] to-[#A0855B] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
              >
                <Heart size={28} fill="currentColor" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Heart size={40} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-bold">No more people!</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              Try changing your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}