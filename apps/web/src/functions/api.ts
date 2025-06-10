// src/functions/api.ts

import axios from "axios";

const API_BASE_URL =
  // "http://192.168.31.213:8000/dev"; // adjust for production later
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
