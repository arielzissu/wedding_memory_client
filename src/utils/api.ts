import axios from "axios";
import { API_URL } from "../constants";

export const request = async ({ url, uri, method, ...rest }: any) => {
  try {
    const response = await axios({
      method: method || "GET",
      url: url || `${API_URL}/api${uri}`,
      ...rest,
    });

    return response.data;
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};
