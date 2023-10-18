import axios from "axios";
import { UserAPI, adminAPI, artistAPI } from "../constants/api"; // Assuming artistAPI is imported from your constants/api file

// Create an Axios instance for the User API
const userAxiosInstance = axios.create({
  baseURL: UserAPI,
  headers: {
    "Content-Type": "application/json",
  },

});

// Create another Axios instance for the Artist API
const artistAxiosInstance = axios.create({
  baseURL: artistAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

  const adminAxiosInstance = axios.create({
    baseURL:adminAPI,
    headers:{
      "Content-Type" : "application/json",
    }
  })

export { userAxiosInstance, artistAxiosInstance, adminAxiosInstance};
