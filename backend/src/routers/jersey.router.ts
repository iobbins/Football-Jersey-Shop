import { Router } from "express";
import { JerseyModel } from "../models/jersey.model";

const router = Router();

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