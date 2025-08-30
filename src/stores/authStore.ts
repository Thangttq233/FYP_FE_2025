import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponseDto, LoginRequestDto } from "@/types/auth";
import api from "@/libs/axios";

interface AuthState {
    auth: AuthResponseDto | null;
    login: (data: LoginRequestDto) => Promise<AuthResponseDto>;
    setAuth: (data: AuthResponseDto) => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            auth: null,
            login: async (data: LoginRequestDto) => {
                const response = await api.post<AuthResponseDto>("/api/auth/login", data);
                set({ auth: response.data });
                return response.data;
            },
            setAuth: (data) => set({ auth: data }),
            logOut: () => set({ auth: null }),
        }),
        {
            name: "auth",
        }
    )
);
