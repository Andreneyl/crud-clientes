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

  async function salvar(cliente) {
    try {
      const clienteSemMascara = {
        ...cliente,
        cep: cliente.cep ? cliente.cep.replace(/\D/g, "") : "",
      };

      if (clienteSemMascara.id) {
        await atualizarCliente(clienteSemMascara);
        
        setClientes((lista) =>
          lista.map((c) =>
            c.id === clienteSemMascara.id
              ? {
                  ...c,
                  nome: clienteSemMascara.nome,
                  cidade: clienteSemMascara.cidade,
                  uf: clienteSemMascara.uf,
                  email: clienteSemMascara.email,
                  cep: clienteSemMascara.cep,
                }
              : c
          )
        );
      } else {
        const response = await salvarCliente(clienteSemMascara);
        const novoCliente = response.data?.data || response.data || clienteSemMascara;

        setClientes((lista) => [...lista, novoCliente]);
      }

      setClienteEditando(null);
    } catch (error) {
      console.error("Erro ao salvar dado do cliente:", error);
    }
  }

  async function excluir(id) {
    try {
      await excluirCliente(id);

      setClientes((lista) =>
        lista.filter((c) => c.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    const nome = cliente?.nome || "";
    return nome.toLowerCase().includes(pesquisa.toLowerCase());
  });

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