import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`));