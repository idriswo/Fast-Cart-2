import api from "./axios";

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface AuthApiResponse {
  data: string | { accessToken?: string; token?: string; refreshToken?: string };
  errors?: string[];
}

/** Login — токенро бармегардонад. API ё string ё объект медиҳад. */
export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthApiResponse>("/Account/login", payload);
  return normalizeTokens(data);
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthApiResponse>("/Account/register", payload);
  return data;
}

/** Refresh — агар API endpoint дошта бошад. Ҳозир мавҷуд нест → хато медиҳад. */
export async function refresh(refreshToken: string) {
  const { data } = await api.post<AuthApiResponse>("/Account/refresh-token", {
    refreshToken,
  });
  return normalizeTokens(data);
}

function normalizeTokens(data: AuthApiResponse) {
  const d = data.data;
  if (typeof d === "string") {
    return { accessToken: d, refreshToken: null as string | null };
  }
  return {
    accessToken: d?.accessToken ?? d?.token ?? "",
    refreshToken: d?.refreshToken ?? null,
  };
}
