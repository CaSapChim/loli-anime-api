import { Request, Response } from "express";
import loliImageModel from "../models/loliSchema";

const getRandomLoli = async () => {
    const lolies = await loliImageModel.find();
    const random = Math.floor(Math.random() * lolies.length);
    return lolies[random];
}

export const getLoli = async (req: Request, res: Response) => {
    try {
        const author = req.query.author; 
        let limit: number = Number(req.query.limit);
        
        if (!author) {
            const rs = await getRandomLoli();
            res.status(200).json(rs);
            return;
        }

        if (limit) {
            const lolies = (await loliImageModel.find({ author: author })).slice(0, limit);
            if (lolies.length == 0)
                return res.status(404).json({ message: "Author not found" });
            res.status(200).json(lolies);
            return;
        } else {
            const lolies = await loliImageModel.find({ author: author });
            if (lolies.length == 0)
                return res.status(404).json({ message: "Author not found" });
            res.status(200).json(lolies);
            return;
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interal Server Error" });
    }
}

export const createNewLoli = async (req: Request, res: Response) => {
    try {
        const { link, author, source } = req.body;
        const newLoli = new loliImageModel({
            link: link,
            author: author,
            source: source
        });
        await newLoli.save();
        res.status(201).json({ message: "Added successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Bad Request" });
    }
}

export const updateLoli = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { link, author } = req.body;
        const toUpdateLoli = await loliImageModel.findByIdAndUpdate(id, { link: link, author: author });
        await toUpdateLoli?.save();
        res.status(200).json({message: "Updated successfully"});
    } catch (err) { 
        console.log(err);
        res.status(400).json({ error: "Bad Request" });
    }
}

export const deleteLoli = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await loliImageModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Bad Request" });
    }
}