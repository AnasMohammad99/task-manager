import jwt from "jsonwebtoken";
import database from "../prisma.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"

const getTasks = async (req,res)=>{
    try {
        const Tasks = await database.tasks.findMany({})
        res.status(200).json({Tasks})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error);
    }
}
//--------------add new task----------------------
const addTask = async (req,res)=>{
    try {
        const errors = validationResult(req.body)
        if (errors.isEmpty()) {
            const newTask = await database.tasks.create({
                data:{
                    userId:+req.user.userId,
                    title:req.body.title,
                    description:req.body.description,
                    date:new Date(req.body.date),
                    status:"WORKING"
                }
            })
          return res.status(200).json({newTask,msg:"task added"})
        }

        res.status(422).json({errors: errors.array()})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//--------------update task-----------------------
const updateTask = async (req,res)=>{
    try {
        const errors = validationResult(req.body)
        if (errors.isEmpty()) {
            const updatedTask = await database.tasks.update({
                where:{
                    id:+req.params.taskId,
                    userId:+req.user.userId
                },
                data:{
                    title:req.body.title,
                    description:req.body.description,
                    date:new Date(req.body.date),
                    status:req.body.status
                }
            })
          return res.status(200).json({updatedTask,msg:"task updated"})
        }

        res.status(422).json({errors: errors.array()})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//--------------delete task-----------------------
const deleteTask = async (req,res)=>{
    try {
            const deletedTask = await database.tasks.delete({
                where:{
                    id:+req.params.taskId,
                    userId:+req.user.userId
                },
            })
        return res.status(200).json({deletedTask,msg:"task deleted"})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
    }
export {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}