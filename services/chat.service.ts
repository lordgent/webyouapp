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

export async function getMessages(targetUserId: string) {
  const token = getAuthToken();
  
  try {
    const res = await fetch(`${API_URL}/chat/messages?userId=${targetUserId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      },
    });

    const json = await res.json();
    if (!res.ok || !json.data) {
      return []; 
    }

    return json.data;
  } catch (error) {
    console.error("Error getMessages:", error);
    return [];
  }
}

export async function getConversations() {
  const token = getAuthToken();
  
  try {
    const res = await fetch(`${API_URL}/chat/conversations`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      },
    });

    const json = await res.json();
    return json.data || []; 
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

export async function sendMessage(receiverId: string, content: string) {
  const token = getAuthToken();
  
  const res = await fetch(`${API_URL}/chat/send`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ receiverId, content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengirim pesan");
  }

  return res.json();
}