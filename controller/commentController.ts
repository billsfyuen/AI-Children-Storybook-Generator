import { CommentService } from "../service/commentService";
import { Request, Response } from "express";
// import { form } from "../utils/formidable";

export class CommentController {
    constructor(private service: CommentService) { }

    getAllComment = async (req: Request, res: Response) => {
        try {
            const storybookId = req.query.id
            // console.log(req.query)
            const comments = await this.service.getAllComment(
                storybookId as string,
            );

            res.status(200).json({ data: comments })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    createComment = async (req: Request, res: Response) => {
        try {
            const { newComment } = req.body
            let userId = null
            if (req.session.userId) {
                userId = req.session.userId
            }
            let storybookId = req.query.id

            const comment = await this.service.createComment(newComment, storybookId as string, userId);
            // res.status(200).json({ message: "create comment success"})
            res.status(200).json({ "message": "Success" })


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    updateComment = async (req: Request, res: Response) => {
        try {
            
            const { content, commentId } = req.body;
            await this.service.updateComment(content, commentId);
            res.status(200).json({ message: 'Comment updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    deleteComment = async (req: Request, res: Response) => {
        try {
            const { commentId } = req.body
            await this.service.deleteComment(commentId)
            res.status(200).json({ message: "delete success" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    getCommentByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.session.userId
            const data = await this.service.getCommentByUserId(userId as string)
            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}