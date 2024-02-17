import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./connectToDB";
import loliRoute from "./routes/loliRoutes";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

connectDB().catch(err => console.log(err));
const port: number = 3300;

app.use("/api/v1", loliRoute);


app.listen(port, () => {
  console.log("Server đang chạy ở port", port);
});