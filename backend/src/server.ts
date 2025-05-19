import express from 'express';
import cors from 'cors';
import { jerseyList } from './data';
import dotenv from 'dotenv';
import { DbConnect } from './configs/database.config';

dotenv.config();
DbConnect();

const app = express();
const port = 3000;

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
})

app.get("/api/jersey", (req, res) => {
    res.send(jerseyList);
})

app.get("/api/jersey/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const jersey = jerseyList.filter(jersey => jersey.team.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(jersey);
})

app.get("/api/jersey/:jerseyId", (req, res) => {
    const jerseyId = req.params.jerseyId;
    const jersey = jerseyList.find(jersey => jersey.id == jerseyId);
    res.send(jersey);
})