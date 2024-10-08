import { Request, Response } from 'express';
import { User, Thought } from "../models/index.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        const thoughtObj = {
            thoughts
        }
        res.json(thoughtObj);

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thoughtId = req.params.id;
        const thoughts = await Thought.findById(thoughtId);

        if (!thoughts) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        return res.json({ thoughts });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        const userId = req.body.id;
        const user = await User.findOneAndUpdate({_id:userId}, { $push: { thoughts: newThought._id } }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "Thought not found" })
        }
        return res.json({ newThought, user });

    } catch (err) {
        return res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thoughtId = req.params._id;
        const updateData = req.body;
        const thoughts = await Thought.findByIdAndUpdate(thoughtId, updateData, { new: true });

        if (!thoughts) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json({ thoughts })

    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thoughtId = req.params._id;
        const thoughts = await User.findOneAndDelete({ _id: thoughtId });

        if (!thoughts) {
            return res.status(404).json({ message: 'Thought successfully deleted' });
        }
        return res.json({ message: 'Thought successfully deleted' });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { response: req.body } }, { runValidators: true, new: true });

        if (!thoughts) {
            return res.status(404).json({ message: 'No thought with this ID exists' })
        }

        res.json(thoughts);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, { $pull: { responses: { responseId: req.params.responseId } } }, { runValidators: true, new: true }
        )

        if (!thoughts) {
            return res.status(404).json({ message: 'No thought with this id exists' });
        }

        res.json(thoughts);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}