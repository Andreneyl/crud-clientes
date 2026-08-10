import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { buscarCep } from "../services/cepService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { IMaskInput } from 'react-imask'; /*importação da mascara*/

export default function ClienteForm({ onSalvar, cliente }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

const [loadingCep, setLoadingCep] = useState(false);

const [erroCep, setErroCep] = useState(false);

  useEffect(() => {
    if (cliente) {
      setForm(cliente);
    }
  }, [cliente]);

  function alterar(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

async function consultarCep() {

    if (form.cep.replace(/\D/g, "").length !== 8)
        return;

    setLoadingCep(true);

    const endereco = await buscarCep(form.cep);

    setLoadingCep(false);

    if (!endereco) {

        setErroCep(true);

        return;

    }

    setForm(prev => ({
        ...prev,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        uf: endereco.uf

    }));

}
const [erros, setErros] = useState({});
  function salvar() {

    let novosErros = {};

    if (!form.nome.trim())
        novosErros.nome = "Informe o nome";

    if (!form.email.trim())
        novosErros.email = "Informe o e-mail";

    if (!form.cep.trim())
        novosErros.cep = "Informe o CEP";

    if (!form.numero.trim())
        novosErros.numero = "Informe o número";

    if (Object.keys(novosErros).length > 0) {
        setErros(novosErros);
        return;
    }

    onSalvar(form);
}


  return (
    <Paper sx={{ p: 4, mb: 3, borderRadius: 3 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
        <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={alterar}
            error={!!erros.nome}
            helperText={erros.nome}
        />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={alterar}
            error={!!erros.email}
            helperText={erros.email}
          />
        </Grid>

        <Grid size={6}>
        <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={alterar}
            slotProps={{
                input: {
                inputComponent: IMaskInput,
                inputProps: {
                    mask: "(00) 00000-0000",
                },
                },
            }}
            />
        </Grid>

        <Grid size={6}>
        <TextField
            fullWidth
            label="CEP"
            name="cep"
            value={form.cep}
            onBlur={consultarCep}
            onChange={alterar}
            helperText={loadingCep ? "Buscando endereço..." : ""}
            slotProps={{
                input: {
                inputComponent: IMaskInput,
                inputProps: {
                    mask: "00000-000",
                },
                },
            }}
            />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Número"
            name="numero"
            value={form.numero}
            onChange={alterar}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Logradouro"
            name="logradouro"
            value={form.logradouro}
            disabled
          />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Complemento"
            name="complemento"
            value={form.complemento}
            onChange={alterar}
          />
        </Grid>

        <Grid size={5}>
          <TextField
            fullWidth
            label="Bairro"
            name="bairro"
            value={form.bairro}
            disabled
          />
        </Grid>

        <Grid size={5}>
          <TextField
            fullWidth
            label="Cidade"
            name="cidade"
            value={form.cidade}
            disabled
          />
        </Grid>

        <Grid size={2}>
          <TextField
            fullWidth
            label="UF"
            name="uf"
            value={form.uf}
            disabled
          />
        </Grid>

        <Grid size={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={salvar}
          >
            Salvar Cliente
          </Button>
        </Grid>
      </Grid>
     
<Snackbar
    open={erroCep}
    autoHideDuration={3000}
    onClose={() => setErroCep(false)}
>
    <Alert severity="error">
        CEP não encontrado.
    </Alert>
</Snackbar>

    </Paper>
  );
}