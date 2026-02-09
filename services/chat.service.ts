const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMessages(targetUserId: string) {
  const token = localStorage.getItem("access_token");
  
  try {
    const res = await fetch(`${API_URL}/chat/messages?userId=${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    if (!res.ok || !json.data) {
      return []; 
    }

    return json.data;
  } catch (error) {
    return [];
  }
}

export async function getConversations() {
  const token = localStorage.getItem("access_token");
  
  try {
    const res = await fetch(`${API_URL}/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    return json.data || []; 
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}
export async function sendMessage(receiverId: string, content: string) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}/chat/send`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ receiverId, content }),
  });
  return res.json();
}
