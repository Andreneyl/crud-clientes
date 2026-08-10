import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost/api"

});

export const listarClientes = () => api.get("/clientes");

export const salvarCliente = (cliente) => api.post("/clientes", cliente);

export const atualizarCliente = (cliente) => api.put(`/clientes/${cliente.id}`, cliente);

export const excluirCliente = (id) => api.delete(`/clientes/${id}`);