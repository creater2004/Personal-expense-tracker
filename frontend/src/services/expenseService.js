import api from "./api";

export const expenseService = {
  getAll: async () => (await api.get("/expenses")).data,
  getById: async (id) => (await api.get(`/expenses/${id}`)).data,
  create: async (details) => (await api.post("/expenses", details)).data,
  update: async (id, details) => (await api.put(`/expenses/${id}`, details)).data,
  remove: async (id) => (await api.delete(`/expenses/${id}`)).data,
  summary: async () => (await api.get("/expenses/summary")).data
};
