import api from "./axios";

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  image?: string;
  [key: string]: unknown;
}

/** Профили корбар аз рӯи id (sid аз JWT) */
export async function getUserProfile(id: string): Promise<UserProfile | null> {
  const { data } = await api.get("/UserProfile/get-user-profile-by-id", {
    params: { id },
  });
  return (data?.data ?? null) as UserProfile | null;
}

/** Навсозии профил — multipart/form-data (PUT).
 *  Content-Type-ро interceptor (axios.ts) барои FormData худкор танзим мекунад. */
export async function updateUserProfile(form: FormData) {
  const { data } = await api.put("/UserProfile/update-user-profile", form);
  return data;
}
