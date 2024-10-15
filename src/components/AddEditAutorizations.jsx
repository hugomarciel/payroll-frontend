import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import autorizationService from "../services/autorization.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const AddEditAutorizations = () => {
  const [rutEmployee, setRutEmployee] = useState(""); // Cambiado a rutEmployee
  const [autorizedHours, setAutorizedHours] = useState("");
  const [document, setDocument] = useState(null); // Añadido campo document
  const { id } = useParams();
  const [titleAutorizationsForm, setTitleAutorizationsForm] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const saveAutorizations = (e) => {
    e.preventDefault();

    const autorization = { rutEmployee, date, reason, autorizedHours, document, id }; // Ajustado para incluir document y rutEmployee
    if (id) {
      // Update data for Authorization
      autorizationService
        .update(autorization)
        .then((response) => {
          console.log("Autorización ha sido actualizada.", response.data);
          navigate("/autorization/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos de Autorización.",
            error
          );
        });
    } else {
      // Create New Authorization
      autorizationService
        .create(autorization)
        .then((response) => {
          console.log("Autorización ha sido ingresada.", response.data);
          navigate("/autorization/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nueva Autorización.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleAutorizationsForm("Editar Autorización");
      autorizationService
        .get(id)
        .then((autorization) => {
          setRutEmployee(autorization.data.rutEmployee); // Usar rutEmployee
          setDate(autorization.data.date);
          setReason(autorization.data.reason);
          setAutorizedHours(autorization.data.authorizedHours);
          setDocument(autorization.data.document); // Añadir document
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleAutorizationsForm("Nueva Autorización");
    }
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3>{titleAutorizationsForm}</h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="rutEmployee"
            label="Rut"
            value={rutEmployee}
            variant="standard"
            onChange={(e) => setRutEmployee(e.target.value)}
            helperText="Ej. 12.587.698-8"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            variant="standard"
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="reason"
            label="Reason"
            value={reason}
            variant="standard"
            onChange={(e) => setReason(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="autorizedHours"
            label="Authorized Hours"
            type="number"
            value={autorizedHours}
            variant="standard"
            onChange={(e) => setAutorizedHours(e.target.value)}
            helperText="Número de Horas Autorizadas"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="document"
            label="Document"
            value={document || ""}
            variant="standard"
            onChange={(e) => setDocument(e.target.value)}
            helperText="Adjuntar documento (opcional)"
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => saveAutorizations(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/autorization/list">Back to List</Link>
    </Box>
  );
};

export default AddEditAutorizations;
