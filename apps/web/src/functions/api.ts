// src/functions/api.ts

import axios from "axios";

const API_BASE_URL =
  // "http://192.168.31.213:8000/dev"; // adjust for production later
  // "http://0.0.0.0:8000/dev";
  "https://hbvb7csq5g.execute-api.ap-south-1.amazonaws.com/dev";
/**
 * Create a new reflection.
 */
export const createReflection = async (reflectionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reflections`,
      reflectionData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reflection:", error);
    throw error;
  }
};

/**
 * Fetch reflections created by the current user.
 */
export const fetchUserReflections = async () => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    console.warn("No userId found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/user-reflections`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user reflections:", error);
    return [];
  }
};

/**
 * Fetch reflections by the fellow breathers.
 */
export const fetchPeerReflections = async (tags?: string[]) => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    console.warn("No user ID found in localStorage.");
    return [];
  }

  try {
    const params: Record<string, any> = { userId };

    // Add tags if provided
    if (tags && tags.length > 0) {
      params.tags = tags.join(",");
    }

    const response = await axios.get(`${API_BASE_URL}/peer-reflections`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching peer reflections:", error);
    return [];
  }
};

export const sendMoment = async (momentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/send-moment`,
      momentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending moment:", error);
    throw error;
  }
};

export const fetchUserMoments = async () => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    console.warn("No userId found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/moments`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching moments:", error);
    throw error;
  }
};

export const sendWalkRequest = async (walkRequestData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/walk-together`,
      walkRequestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending walk request:", error);
    throw error;
  }
};

export const fetchWalkRequests = async () => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    console.warn("No userId found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/walk-requests`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching walk requests:", error);
    return [];
  }
};

export const fetchWalkRooms = async () => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    console.warn("No userId found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/walk-rooms`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching walk rooms:", error);
    return [];
  }
};

export const acceptWalkRequest = async (requestId: string) => {
  const accepterId = localStorage.getItem("breatheUserId");
  if (!accepterId) {
    throw new Error("No userId found in localStorage.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/walk-accept`,
      {
        requestId,
        accepterId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting walk request:", error);
    throw error;
  }
};

export const declineWalkRequest = async (requestId: string) => {
  const declinerId = localStorage.getItem("breatheUserId");
  if (!declinerId) {
    throw new Error("No userId found in localStorage.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/walk-decline`,
      {
        requestId,
        declinerId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error declining walk request:", error);
    throw error;
  }
};

/**
 * Fetch a Stream Chat token for the given user. Uses the backend API base URL.
 */
export const getChatToken = async (userId: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat-token`, {
      params: { userId },
    });
    const token = response.data?.token;
    if (!token) {
      throw new Error("No token in chat-token response");
    }
    return token;
  } catch (error) {
    console.error("Error fetching chat token:", error);
    throw error;
  }
};

/**
 * Mark a walk room as closed and leave. Uses the backend API base URL.
 */
export const leaveWalkRoom = async (roomId: string) => {
  const userId = localStorage.getItem("breatheUserId");
  if (!userId) {
    throw new Error("No userId found in localStorage.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/walk-leave`,
      { roomId, userId },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error leaving walk room:", error);
    throw error;
  }
};