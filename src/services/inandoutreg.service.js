import httpClient from "../http-common";

const uploadFilePath = (filePath) => {
    return httpClient.post("/api/v1/inandout/import", filePath, {
        params: { rutaArchivo: filePath }, // Envía el String directamente como parámetro
    });
};

export default { uploadFilePath };
