import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DbConnect } from './configs/database.config';
import jerseyRouter from './routers/jersey.router';
import userRouter from './routers/user.router';

dotenv.config();
DbConnect();

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
})

app.use("/api/jersey", jerseyRouter);
app.use("/api/users", userRouter);