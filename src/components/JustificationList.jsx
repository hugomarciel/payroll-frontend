import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import justificationService from "../services/justification.service";
import AddEditJustifications from "./AddEditJustifications";



const JustificationList = () => {
  const [justifications, setJustifications] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    justificationService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las Justificaciones.", response.data);
        setJustifications(response.data);
      })
      .catch((error) => {
        console.log("Error al mostrar listado de todas las Justificaciones.", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Imprimiendo id", id);
    const confirmDelete = window.confirm("¿Está seguro que desea borrar esta Justificación?");
    if (confirmDelete) {
      justificationService
        .remove(id)
        .then((response) => {
          console.log("Justificación eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log("Error al eliminar la Justificación", error);
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Imprimiendo id", id);
    navigate(`/justification/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/justification/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
        >
          Ingresar Justificación
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut Empleado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Motivo</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Documento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {justifications.map((justification) => (
            <TableRow key={justification.id}>
              <TableCell align="left">{justification.rutEmployee}</TableCell>
              <TableCell align="left">{justification.date}</TableCell>
              <TableCell align="left">{justification.motivation}</TableCell>
              <TableCell align="left">{justification.document || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(justification.id)}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(justification.id)}
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

export default JustificationList;
