import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const ACCESS_KEY = "token";
const REFRESH_KEY = "refreshToken";
const PROFILE_NAME_KEY = "profileName";

export interface AuthUser {
  sid?: string;
  name?: string;
  email?: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

interface AuthState {
  user: AuthUser | null;
  /** Номи намоишӣ аз профил (firstName lastName) — дар header ва ғ. */
  profileName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setSession: (access: string, refresh?: string | null) => void;
  setProfileName: (name: string | null) => void;
  logout: () => void;
}

/** Ҷудо кардани маълумоти корбар аз JWT (claimҳои гуногунро мегирад) */
function parseUser(token: string): AuthUser | null {
  try {
    const raw = jwtDecode<Record<string, unknown>>(token);
    const pick = (...keys: string[]) => {
      for (const k of keys) {
        const found = Object.keys(raw).find((rk) => rk.toLowerCase().includes(k));
        if (found) return raw[found] as string;
      }
      return undefined;
    };
    return {
      ...raw,
      sid: pick("sid", "nameidentifier"),
      name: pick("name", "unique_name"),
      email: pick("emailaddress", "email"),
      role: pick("role"),
      exp: raw.exp as number | undefined,
    };
  } catch {
    return null;
  }
}

function loadInitial(): Pick<
  AuthState,
  "user" | "accessToken" | "refreshToken" | "isAuthenticated"
> {
  const access = localStorage.getItem(ACCESS_KEY);
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (access) {
    const user = parseUser(access);
    const valid = !user?.exp || user.exp * 1000 > Date.now();
    if (user && valid) {
      return { user, accessToken: access, refreshToken: refresh, isAuthenticated: true };
    }
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
  return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
}

export const useAuth = create<AuthState>((set) => ({
  ...loadInitial(),
  profileName: localStorage.getItem(PROFILE_NAME_KEY),
  setSession: (access, refresh) => {
    localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    set({
      accessToken: access,
      refreshToken: refresh ?? null,
      user: parseUser(access),
      isAuthenticated: true,
    });
  },
  setProfileName: (name) => {
    const trimmed = name?.trim() || null;
    if (trimmed) localStorage.setItem(PROFILE_NAME_KEY, trimmed);
    else localStorage.removeItem(PROFILE_NAME_KEY);
    set({ profileName: trimmed });
  },
  logout: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(PROFILE_NAME_KEY);
    set({
      user: null,
      profileName: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
