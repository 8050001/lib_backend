import CommentModel from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const doc = new CommentModel({
      comment: req.body.comment,
      count: req.body.count,
      user: req.userId,
    });

    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create comments",
    });
  }
};
