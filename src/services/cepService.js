import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws"
});

export async function buscarCep(cep) {

    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        return null;
    }

    try {

        const { data } = await api.get(`/${cepLimpo}/json`);

        if (data.erro) {
            return null;
        }

        return data;

    } catch (error) {

        console.error("Erro ao buscar CEP", error);
        return null;

    }

}