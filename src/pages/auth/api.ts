import api from "@/libs/axios";

export const authApi = {
    login: async (data: { email: string; password: string }) => {
        const res = await api.post('/auth/login', data);
        return res.data();
    },
    register: async (payload: any) => {
        const res = await api.post('/auth/register', payload);
        return res.data();
    }
}