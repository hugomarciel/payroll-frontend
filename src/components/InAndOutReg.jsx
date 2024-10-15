import React, { useState } from "react";
import InAndOutRegService from "../services/inandoutreg.service"; // Asegúrate de que la ruta sea correcta

const InAndOutReg = () => {
    const [filePath, setFilePath] = useState("");
    const [message, setMessage] = useState("");

    const handleFilePathUpload = async (e) => {
        e.preventDefault();
        try {
            await InAndOutRegService.uploadFilePath(filePath);
            setMessage("Ruta enviada exitosamente.");
        } catch (error) {
            console.error("Error al enviar la ruta del archivo:", error);
            setMessage("Error al enviar la ruta del archivo.");
        }
    };

    return (
        <div>
            <h2>Subir Ruta de Archivo</h2>
            <form onSubmit={handleFilePathUpload}>
                <input
                    type="text"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    placeholder="Ruta del archivo"
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InAndOutReg;
