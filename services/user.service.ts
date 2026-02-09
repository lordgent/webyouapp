import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => {
  const token = getCookie("access_token");
  if (token) return token;
  
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  age: number;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
  gender: string;
  image: string;
};

type UserMeResponse = {
  status: number;
  data: UserProfile;
  message: string;
  error: null;
};

export async function getMe(): Promise<UserProfile> {
  const token = getAuthToken();

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache", // Penting untuk mobile agar tidak caching token lama
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch profile");
  }

  const json: UserMeResponse = await res.json();
  return json.data;
}

export async function updateMe(data: Partial<UserProfile>): Promise<UserProfile> {
  const token = getAuthToken();
  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update profile");

  return json.data;
}

export async function getDiscovery(): Promise<UserProfile[]> {
  const token = getAuthToken();
  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/users/discovery`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch discovery");

  return json.data;
}

export async function getOtherUserProfile(userId: string): Promise<UserProfile> {
  if (!userId || userId === "undefined") throw new Error("Invalid User ID");

  const token = getAuthToken();
  
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch profile");

  return json.data;
}