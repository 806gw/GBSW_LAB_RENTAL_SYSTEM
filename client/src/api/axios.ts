import axios, { AxiosResponse } from "axios";

const apiServer: string = "http://localhost:3000";

export const customAxios = axios.create({
  baseURL: apiServer,
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcherWithToken = async (
  accessToken: string | null,
  url: string
): Promise<any> => {
  const response: AxiosResponse = await customAxios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const postWithToken = async (
  accessToken: string | null,
  url: string,
  data: any
): Promise<any> => {
  const response: AxiosResponse = await customAxios.post(url, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const putWithToken = async (
  accessToken: string | null,
  url: string,
  data: any
): Promise<any> => {
  const response: AxiosResponse = await customAxios.put(url, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const deleteWithToken = async (
  accessToken: string | null,
  url: string
): Promise<any> => {
  const response: AxiosResponse = await customAxios.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export default customAxios;
