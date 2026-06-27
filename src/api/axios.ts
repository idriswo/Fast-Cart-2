import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const ACCESS_KEY = "token";
const REFRESH_KEY = "refreshToken";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ===== Request interceptor — access token ҳамроҳ мекунад =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    // Барои FormData (multipart) — Content-Type-ро ҳазф мекунем,
    // то axios/браузер худаш boundary-и дурустро гузорад (вагарна 400)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response interceptor — refresh token дар ҳолати 401 =====
let isRefreshing = false;
let queue: { resolve: (t: string) => void; reject: (e: unknown) => void }[] = [];

const flushQueue = (error: unknown, token: string | null) => {
  queue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  queue = [];
};

const forceLogout = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (error.response?.status === 401 && !original._retry) {
      // Агар refresh token набошад — фавран logout
      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // муваққатан дар навбат мегузорем
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token: string) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/Account/refresh-token`,
          { refreshToken }
        );
        const newAccess: string =
          typeof data?.data === "string"
            ? data.data
            : data?.data?.accessToken ?? data?.data?.token;
        const newRefresh: string | undefined = data?.data?.refreshToken;

        if (!newAccess) throw new Error("No access token from refresh");
        localStorage.setItem(ACCESS_KEY, newAccess);
        if (newRefresh) localStorage.setItem(REFRESH_KEY, newRefresh);

        flushQueue(null, newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        flushQueue(e, null);
        forceLogout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
