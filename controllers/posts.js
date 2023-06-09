import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).send(JSON.stringify(postMessages));
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    console.log(post);

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post found of this Id.");

    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        {
            new: true,
        }
    );

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .send("No post found of this Id in the Database.");
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted Succesfully!" });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .send("No post found of this Id in the database.");
    }

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
    );

    res.json(updatedPost);
};
