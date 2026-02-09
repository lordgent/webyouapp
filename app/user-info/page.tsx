"use client";

import { useEffect, useState, useRef } from "react";
import { getMe, updateMe, UserProfile } from "@/services/user.service";
import { Pencil, Plus, LogOutIcon } from "lucide-react";
import BaseLayout from "@/components/BaseLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { deleteCookie } from 'cookies-next';

export default function UserInfo() {
  const [editAbout, setEditAbout] = useState(false);
  const [editInterest, setEditInterest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [about, setAbout] = useState<any>({
    birthday: "",
    age: 0,
    horoscope: "--",
    zodiac: "--",
    height: 0,
    weight: 0,
    displayName: "",
    gender: "",
    image: "",
    interests: []
  });

  const [tempAbout, setTempAbout] = useState(about);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMe();
      const res = response as any;
      const userData = res.data || res;
      // const userData: any = response.data || response; 
      const mapped = { 
        ...userData, 
        displayName: userData.name || "" 
      };
      setAbout(mapped);
      setTempAbout(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * (MAX_WIDTH / img.width);
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          setTempAbout({ ...tempAbout, image: canvas.toDataURL("image/jpeg", 0.7) });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (type: 'about' | 'interest') => {
    setIsSaving(true);
    try {
      const payload = type === 'about' ? {
        name: tempAbout.displayName,
        gender: tempAbout.gender,
        birthday: tempAbout.birthday,
        height: Number(tempAbout.height),
        weight: Number(tempAbout.weight),
      } : {
        interests: tempAbout.interests
      };

      const response = await updateMe(payload);
      // const updatedData: any = response.data || response;
      const res = response as any;
      const updatedData = res.data || res;
      const finalData = { ...updatedData, displayName: updatedData.name };

      setAbout(finalData);
      setTempAbout(finalData);

      if (type === 'about') setEditAbout(false);
      if (type === 'interest') setEditInterest(false);
    } catch (err: any) {
      alert(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    deleteCookie('access_token');
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  if (loading) return <LoadingScreen />;

  // Helper untuk format tanggal dari ISO ke DD / MM / YYYY
  const formatBirthday = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // fallback jika format manual
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
  };

  return (
    <BaseLayout>
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={handleLogout} className="flex items-center cursor-pointer gap-1 text-sm font-medium">
          <LogOutIcon size={24} />
        </button>
        <p className="flex-1 text-center font-semibold text-sm">@{about.displayName || about.name}</p>
        <div className="w-10"></div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Profile Card Image */}
        <div className="relative w-full aspect-[4/3] bg-[#162329] rounded-2xl overflow-hidden flex flex-col justify-end p-5 shadow-xl">
          {about.image && <img src={about.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="profile" />}
          <div className="relative z-10">
            <p className="font-bold text-lg">@{about.displayName || about.name}{about.age ? `, ${about.age}` : ''}</p>
            <p className="text-xs text-white mb-3">{about.gender || ''}</p>
            <div className="flex gap-2">
              {about.horoscope && about.horoscope !== "--" && (
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-xs font-medium">{about.horoscope}</span>
                </div>
              )}
              {about.zodiac && about.zodiac !== "--" && (
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-xs font-medium">{about.zodiac}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#0E191F] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-sm text-white">About</h2>
            {editAbout ? (
              <button disabled={isSaving} onClick={() => handleSave('about')} className="text-[#D4B785] text-xs font-medium">
                {isSaving ? 'Saving...' : 'Save & Update'}
              </button>
            ) : (
              <Pencil size={18} className="cursor-pointer text-white opacity-80" onClick={() => setEditAbout(true)} />
            )}
          </div>

          {!editAbout ? (
            <div className="space-y-3">
              {about.displayName || about.birthday ? (
                <>
                  <DataRow label="Display Name" value={about.displayName || about.name} />
                  <DataRow label="Gender" value={about.gender || '-'} />
                  <DataRow label="Birthday" value={formatBirthday(about.birthday)} />
                  <DataRow label="Horoscope" value={about.horoscope || '-'} />
                  <DataRow label="Zodiac" value={about.zodiac || '-'} />
                  <DataRow label="Height" value={about.height ? `${about.height} cm` : '-'} />
                  <DataRow label="Weight" value={about.weight ? `${about.weight} kg` : '-'} />
                </>
              ) : (
                <p className="text-sm text-gray-500">Add in your details to help others know you better</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-[#1F2C33] rounded-2xl flex items-center justify-center cursor-pointer border border-dashed border-[#D4B785]/20 overflow-hidden">
                  {tempAbout.image ? <img src={tempAbout.image} className="w-full h-full object-cover" alt="preview" /> : <Plus size={24} className="text-[#D4B785]" />}
                </div>
                <span className="text-xs text-white">Add image</span>
              </div>
              <EditRow label="Display name:">
                <input className="custom-input" placeholder="Enter name" value={tempAbout.displayName || ""} onChange={e => setTempAbout({ ...tempAbout, displayName: e.target.value })} />
              </EditRow>
              <EditRow label="Gender:">
                <select className="custom-input select-icon" value={tempAbout.gender || ""} onChange={e => setTempAbout({ ...tempAbout, gender: e.target.value })}>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </EditRow>
              <EditRow label="Birthday:">
                <input type="text" className="custom-input" placeholder="YYYY-MM-DD" value={tempAbout.birthday || ""} onChange={e => setTempAbout({ ...tempAbout, birthday: e.target.value })} />
              </EditRow>
              <EditRow label="Height:">
                <input type="number" className="custom-input" placeholder="Add height" value={tempAbout.height || ""} onChange={e => setTempAbout({ ...tempAbout, height: e.target.value })} />
              </EditRow>
              <EditRow label="Weight:">
                <input type="number" className="custom-input" placeholder="Add weight" value={tempAbout.weight || ""} onChange={e => setTempAbout({ ...tempAbout, weight: e.target.value })} />
              </EditRow>
            </div>
          )}
        </div>

        {/* Interest Section */}
        <div className="bg-[#0E191F] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-sm text-white">Interest</h2>
            {editInterest ? (
              <button disabled={isSaving} onClick={() => handleSave('interest')} className="text-[#D4B785] text-xs font-medium">
                {isSaving ? 'Saving...' : 'Save & Update'}
              </button>
            ) : (
              <Pencil size={18} className="cursor-pointer text-white opacity-80" onClick={() => setEditInterest(true)} />
            )}
          </div>

          {!editInterest ? (
            <div className="flex flex-wrap gap-2">
              {about.interests?.length > 0 ? (
                about.interests.map((item: string, idx: number) => (
                  <span key={idx} className="bg-white/5 px-4 py-2 rounded-full text-xs font-medium text-white">{item}</span>
                ))
              ) : (
                <p className="text-sm text-gray-500">Add in your interest to find a better match</p>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-1">
              <input
                autoFocus
                className="custom-input !text-left"
                placeholder="Music, Sport, Tech"
                value={tempAbout.interests?.join(", ") || ""}
                onChange={e => {
                  const value = e.target.value;
                  const interestsArray = value === "" ? [] : value.split(",").map(i => i.trim()).filter(i => i !== "");
                  setTempAbout({ ...tempAbout, interests: interestsArray });
                }} 
              />
              <p className="text-[10px] text-gray-500 mt-2 ml-1">* Use comma to separate interests</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-input { width: 100%; background: rgba(217, 217, 217, 0.06); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 10px 14px; color: white; font-size: 13px; text-align: right; outline: none; }
        .custom-input:focus { border-color: #D4B785; }
        .select-icon { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; background-size: 14px; }
      `}</style>
    </BaseLayout>
  );
}

// Komponen Reusable untuk View Mode
function DataRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex text-sm">
      <span className="text-gray-500 w-[120px] shrink-0">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

// Komponen Reusable untuk Edit Mode
function EditRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
      <label className="text-[12px] text-gray-400">{label}</label>
      {children}
    </div>
  );
}