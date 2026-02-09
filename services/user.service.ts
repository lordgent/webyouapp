const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Token not found");
  }

  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch profile");
  }

  const json: UserMeResponse = await res.json();
  return json.data;
}

export async function updateMe(data: {
  birthday?: string;
  height?: number;
  weight?: number;
  interests?: string[];
}): Promise<UserProfile> {
  const token = localStorage.getItem("access_token");

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update profile");
  }

  const json = await res.json();
  return json.data;
}

export async function getDiscovery(): Promise<UserProfile[]> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/users/discovery`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch discovery");
  }

  const json = await res.json();
  return json.data;
}

export async function getOtherUserProfile(userId: string): Promise<UserProfile> {
  if (!userId || userId === "undefined") {
    console.error("getOtherUserProfile: userId is invalid", userId);
    throw new Error("Invalid User ID");
  }

  const token = localStorage.getItem("access_token");
  
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to fetch profile");
    }

    return json.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}