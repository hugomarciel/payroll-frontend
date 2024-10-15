import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import autorizationService from "../services/autorization.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AutorizationList = () => {
  const [autorizations, setAutorizations] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    autorizationService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las Autorizaciones.", response.data);
        setAutorizations(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las Autorizaciones.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Imprimiendo id", id);
    const confirmDelete = window.confirm(
      "¿Está seguro que desea borrar esta Autorización?"
    );
    if (confirmDelete) {
      autorizationService
        .remove(id)
        .then((response) => {
          console.log("Autorización eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar la Autorización",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Imprimiendo id", id);
    navigate(`/autorization/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/autorization/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
        >
          Ingresar Autorización
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Rut Empleado
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Reason
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Horas autorizadas
            </TableCell>
            
        
          </TableRow>
        </TableHead>
        <TableBody>
  {autorizations.map((autorization) => (
    <TableRow
      key={autorization.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{autorization.rutEmployee}</TableCell>
      <TableCell align="left">{autorization.date}</TableCell>
      <TableCell align="left">{autorization.reason}</TableCell>
      <TableCell align="left">{autorization.authorizedHours}</TableCell>
     
      <TableCell>
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => handleEdit(autorization.id)}
          style={{ marginLeft: "0.5rem" }}
          startIcon={<EditIcon />}
        >
          Editar
        </Button>

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(autorization.id)}
          style={{ marginLeft: "0.5rem" }}
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default AutorizationList;
