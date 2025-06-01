import { Router } from "express";
import { JerseyModel } from "../models/jersey.model";
import { jerseyList } from "../data";

const router = Router();

router.get("/initDb", async (req, res) => {
    const jerseyCount = await JerseyModel.countDocuments();
    if(jerseyCount > 0){
        res.send("Initialization already done");
        return;
    }

    await JerseyModel.create(jerseyList);
    res.send("Initialization done");
})

router.get("/", async (req, res) => {
    const jersey = await JerseyModel.find();
    res.send(jersey);
})

router.get("/search/:searchTerm", async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const jersey = await JerseyModel.find({team: searchRegex});
    res.send(jersey);
})

router.get("/:jerseyId", async (req, res) => {
    const jersey = await JerseyModel.findById(req.params.jerseyId);
    res.send(jersey);
})

export default router;