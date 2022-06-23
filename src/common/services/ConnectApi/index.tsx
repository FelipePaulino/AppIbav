import axios from "axios";

export const connectApi = axios.create({
  baseURL: "https://app-ibav-f06f4-default-rtdb.firebaseio.com",
});
