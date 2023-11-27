import jwt from "jsonwebtoken";
import database from "../prisma.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import { mailTransporter } from "../config/nodemailer-config.js";


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
                id:+req.user.userId
            },
            data:{
                username:req.body.username,
                // email:req.body.email,
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
        console.log(error.message);
    }
}
//----------------delete user--------------------
const deleteUser = async (req,res)=>{
    try {
            await database.tokens.deleteMany({
                where:{
                    userId:+req.user.userId
                }
            })
            await database.tasks.deleteMany({
                where:{
                    userId:+req.user.userId
                }
            })
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
//--------------------reset password routes-------------------------
const verifyEmail = async (req,res)=>{
    try {
        const user = await database.users.findFirst({
            where:{
                email:req.body.email
            }
        });
        if(!user){
            res.status(401).json({error:"no user with this email"})
        }
        const fourDigits = Math.floor(Math.random() * 9000) + 1000;

        const secret = process.env.JWT_SECRET;
        const token = await jwt.sign({code:fourDigits},secret,{expiresIn:60*15})
        await database.users.update({
            where:{
                email:user.email
            },
            data:{
                emailVerifiaction:token
            }
        });
        try {
            await mailTransporter.sendMail({
                to:user.email,
                from: process.env.HOST_EMAIL,
                subject:'verify code',
                text:`Verification Code Is : ${fourDigits}`,
            })
        } catch (error) {
            console.error(error);
            res.status(401).json({error:error.message})
        }
        res.status(401).json({message: 'verification code sent successfully'})
    } catch (error) {
        console.error(error);
        res.status(401).json({error:error.message})
    }
}
const resetPassword = async (req,res)=>{
    try {
        const user = await database.users.findFirst({
            where:{
                email:req.body.email
            }
        })
        const secret = process.env.JWT_SECRET;
        const payload = await jwt.verify(user.emailVerifiaction,  secret )
        if (payload.code !== +req.params.token) {
            console.error(error);
           return res.status(401).json({error:"error code"})
          }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const updatedUser = await database.users.update({
            where: { email: req.body.email },
            data: {
              password: hashedPassword,
              emailVerifiaction:null
            },
          });
          return res.status(200).json({updatedUser,msg:"user updated"})
    } catch (error) {
        console.error(error);
        res.status(401).json({error:error.message})
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
    logoutUser,
    verifyEmail,
    resetPassword
}