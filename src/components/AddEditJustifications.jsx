import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import justificationService from "../services/justification.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";


const AddEditJustifications = () => {
  const [rutEmployee, setRutEmployee] = useState("");
  const [motivation, setMotivation] = useState("");
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const [titleForm, setTitleForm] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const saveJustification = (e) => {
    e.preventDefault();
    const justification = { rutEmployee, date, motivation, document, id };

    if (id) {
      justificationService
        .update(justification)
        .then((response) => {
          console.log("Justificación actualizada.", response.data);
          navigate("/justification/list");
        })
        .catch((error) => {
          console.log("Error al actualizar la Justificación.", error);
        });
    } else {
      justificationService
        .create(justification)
        .then((response) => {
          console.log("Justificación creada.", response.data);
          navigate("/justification/list");
        })
        .catch((error) => {
          console.log("Error al crear la Justificación.", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleForm("Editar Justificación");
      justificationService
        .get(id)
        .then((response) => {
          setRutEmployee(response.data.rutEmployee);
          setDate(response.data.date);
          setMotivation(response.data.motivation);
          setDocument(response.data.document);
        })
        .catch((error) => {
          console.log("Error al cargar la Justificación.", error);
        });
    } else {
      setTitleForm("Nueva Justificación");
    }
  }, [id]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" component="form">
      <h3>{titleForm}</h3>
      <form onSubmit={saveJustification}>
        <FormControl fullWidth>
          <TextField
            id="rutEmployee"
            label="Rut"
            value={rutEmployee}
            onChange={(e) => setRutEmployee(e.target.value)}
            variant="standard"
            helperText="Ej. 16.072.711-k"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="date"
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="motivation"
            label="Motivación"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            variant="standard"
            helperText="Motivo de la justificación"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="document"
            label="Documento"
            value={document || ""}
            onChange={(e) => setDocument(e.target.value)}
            variant="standard"
            helperText="Documento adjunto (opcional)"
          />
        </FormControl>
        <Button
          variant="contained"
          color="info"
          onClick={(e) => saveJustification(e)}
          style={{ marginLeft: "0.5rem" }}
          startIcon={<SaveIcon />}
        >
          Grabar
        </Button>
      </form>
      <Link to="/justification/list">Volver a la lista</Link>
    </Box>
  );
};

export default AddEditJustifications;
