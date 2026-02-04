"use client";

import { useState } from "react";

export default function UserInfo() {
  const [editAbout, setEditAbout] = useState(false);
  const [editInterest, setEditInterest] = useState(false);

  const [about, setAbout] = useState({
    birthday: "28 / 08 / 1998",
    age: 28,
    horoscope: "Virgo",
    zodiac: "Pig",
    height: 175,
    weight: 69,
  });

  const [interest, setInterest] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09141A] to-[#1F4247] p-4">
      <div className="max-w-md mx-auto space-y-4 text-white">

       <div className="bg-[#0E191F] rounded-xl h-42 p-4">


       </div>

        {/* ABOUT */}
        <div className="bg-[#0E191F] rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">About</p>
            <img
              src="/icons/edit-2.svg"
              className="cursor-pointer"
              onClick={() => setEditAbout(true)}
            />
          </div>

          {!editAbout ? (
            <div className="text-sm text-gray-300 space-y-2">
              <p>Birthday: {about.birthday} (Age {about.age})</p>
              <p>Horoscope: {about.horoscope}</p>
              <p>Zodiac: {about.zodiac}</p>
              <p>Height: {about.height} cm</p>
              <p>Weight: {about.weight} kg</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input className="input" placeholder="Birthday" />
              <input className="input" placeholder="Horoscope" />
              <input className="input" placeholder="Zodiac" />
              <input className="input" placeholder="Height (cm)" />
              <input className="input" placeholder="Weight (kg)" />

              <div className="flex justify-end gap-2">
                <button
                  className="text-gray-400 text-sm"
                  onClick={() => setEditAbout(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#1F4247] px-4 py-2 rounded-md text-sm"
                  onClick={() => setEditAbout(false)}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* INTEREST */}
        <div className="bg-[#0E191F] rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">Interest</p>
            <img
              src="/icons/edit-2.svg"
              className="cursor-pointer"
              onClick={() => setEditInterest(true)}
            />
          </div>

          {!editInterest ? (
            <p className="text-sm text-gray-400">
              {interest || "Add in your interest to find a better match"}
            </p>
          ) : (
            <div className="space-y-3">
              <input
                className="input"
                placeholder="Your interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="text-gray-400 text-sm"
                  onClick={() => setEditInterest(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#1F4247] px-4 py-2 rounded-md text-sm"
                  onClick={() => setEditInterest(false)}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: #162329;
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          outline: none;
        }
      `}</style>
    </main>
  );
}
