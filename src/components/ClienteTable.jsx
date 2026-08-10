import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ClienteTable({
  clientes,
  onEditar,
  onExcluir,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Table>

        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Nome
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Cidade
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              UF
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Email
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Telefone
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clientes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">
                  Nenhum cliente cadastrado.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                hover
              >
                <TableCell>{cliente.nome}</TableCell>

                <TableCell>{cliente.cidade}</TableCell>

                <TableCell>{cliente.uf}</TableCell>

                <TableCell>{cliente.email}</TableCell>

                <TableCell>{cliente.telefone}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEditar(cliente)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onExcluir(cliente.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}