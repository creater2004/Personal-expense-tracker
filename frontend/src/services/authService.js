import api from "./api";

export const authService = {
  register: async (details) => (await api.post("/auth/register", details)).data,
  login: async (credentials) => (await api.post("/auth/login", credentials)).data,
  me: async () => (await api.get("/auth/me")).data
};
