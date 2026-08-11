import axios from "axios";

const api = axios.create({
    baseURL: "https://plum-partridge-156259.hostingersite.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const listarClientes = () => {
    return api.get("/clientes");
};

export const salvarCliente = (cliente) => {
    return api.post("/clientes", cliente);
};

export const atualizarCliente = (cliente) => {
    return api.put(`/clientes/${cliente.id}`, cliente);
};

export const excluirCliente = (id) => {
    return api.delete(`/clientes/${id}`);
};