import axios from "axios";
import { API_URL } from "../constants";
import snackbarStore from "stores/snackbarStore";

export const request = async ({ url, uri, method, ...rest }: any) => {
  try {
    const response = await axios({
      method: method || "GET",
      url: url || `${API_URL}/api${uri}`,
      ...rest,
    });

    return response.data;
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.message ||
      `Failed Request. [URL=${url}]`;

    snackbarStore.show(errMsg, "error");
    throw error;
  }
};
