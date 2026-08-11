import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
} from "@mui/material";

import ClienteForm from "../components/ClienteForm";
import ClienteTable from "../components/ClienteTable";

import {
    listarClientes,
    salvarCliente,
    atualizarCliente,
    excluirCliente,
} from "../services/clienteService";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

  // Carrega clientes salvos
  useEffect(() => {
    async function carregarClientes() {
      try {
          const response = await listarClientes();

          setClientes(response.data);
      } catch (error) {
          console.error("Erro ao carregar clientes:", error);
      }
    }

    carregarClientes();
  }, []);

  // Salva automaticamente
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  function salvar(cliente) {
    if (cliente.id) {
      setClientes((lista) =>
        lista.map((c) => (c.id === cliente.id ? cliente : c))
      );
    } else {
      cliente.id = Date.now();

      setClientes((lista) => [...lista, cliente]);
    }

    setClienteEditando(null);
  }

  function excluir(id) {
    setClientes((lista) => lista.filter((c) => c.id !== id));
  }

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Cadastro de Clientes
      </Typography>

      <ClienteForm
        onSalvar={salvar}
        cliente={clienteEditando}
      />

      <Box sx={{ my: 3 }}>
        <TextField
          fullWidth
          label="Pesquisar cliente"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </Box>

      <ClienteTable
        clientes={clientesFiltrados}
        onEditar={setClienteEditando}
        onExcluir={excluir}
      />
    </Container>
  );
}