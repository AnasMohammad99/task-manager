import jwt from "jsonwebtoken";
import database from "../prisma.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"

const getUsers = async (req,res)=>{
    try {
        const Users = await database.users.findMany({})
        res.status(200).json({Users})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error);
    }
}
//--------------get all user tasks----------------
const getUserTasks = async (req,res)=>{
    try {
        const tasks = await database.tasks.findMany({
            where:{
                userId:req.user.userId
            }
        })
        res.status(200).json({tasks})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error);
    }
    // console.log(req.user);
}
//--------------add new user----------------------
const addUser = async (req,res)=>{
    try {
        const errors = validationResult(req.body)
        if (errors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await database.users.create({
                data:{
                    username:req.body.username,
                    email:req.body.email,
                    password:hashedPassword
                },
                select:{
                    username:true,
                    email:true
                }
            })
          return res.status(200).json({newUser,msg:"user added"})
        }

        res.status(422).json({errors: errors.array()})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//----------------login--------------------------
const loginUser = async (req,res)=>{
    try {
        const newToken = await database.tokens.create({
            data:{
                userId:+req.user.id,
                expiresAt:new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        })
        const access_token = jwt.sign(
            { user: { userId: req.user.id, tokenId: newToken.id} },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );

        res.status(200).json({msg:"logged in", access_token}) 
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//---------------logout--------------------------
const logoutUser = async (req,res)=>{
    try {
    await database.tokens.delete({
        where:{
            id:+req.user.tokenId
        }
    })  
        res.status(200).json({ message: 'loged out successfully'})
    } catch (err) {
      res.status(401).json({error:err.message});
    }
    // console.log(req.user.tokenId);
  }
//-----------------update user-------------------
const updateUser = async (req,res)=>{
    try {
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await database.users.update({
            where:{
                id:req.user.id
            },
            data:{
                username:req.body.username,
                email:req.body.email,
                // password:hashedPassword
            },
            select:{
                email:true,
                username:true
            }
        })
        return res.status(200).json({updatedUser,msg:"user updated"})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//----------------delete user--------------------
const deleteUser = async (req,res)=>{
    try {
            const deletedUser = await database.users.delete({
                where:{
                    id:+req.user.userId
                },
            })
        return res.status(200).json({deletedUser,msg:"user deleted"})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
//-----------------------------------------------
const validateToken = async (id) => {
    try {
      const token = await database.tokens.findUnique({
        where: {
          id,
        },
      });
      return token;
    } catch (err) {
      return err;
    }
  }
export {
    getUsers,
    addUser,
    validateToken,
    loginUser,
    getUserTasks,
    updateUser,
    deleteUser,
    logoutUser
}