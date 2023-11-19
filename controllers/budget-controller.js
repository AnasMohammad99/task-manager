import database from "../prisma.js";

const getBudgets = async (req,res)=>{
    try {
        const allRecords = await database.budget.findMany({})
        res.status(200).json({allRecords})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error);
    }
}
//-------------------------------------------------
const addRecord = async (req,res)=>{
    try {
        const newRecord = await database.budget.create({
            data:{
                amount:+req.body.amount,
                category:req.body.category,
                date:new Date(req.body.date),
                description:req.body.description,
            }
        })
        console.log(newRecord);
        res.status(200).json({newRecord})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message);
    }
}
//--------------------------------------------
const getRecordById = async (req,res) => {
    try {
        const record = await database.budget.findFirst({
            where:{
                key:+req.params.id
            },
        })
        res.status(200).json({record})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
//--------------------------------------------
const updateRecordById = async (req,res) => {
    try {
        const updatedRecord = await database.budget.update({
            where:{
                key:+req.params.id
            },
            data:{
                amount:+req.body.amount,
                category:req.body.category,
                date:new Date(req.body.date),
                description:req.body.description,
            }
        })
        res.status(200).json({updatedRecord})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
//------------------------------------------
const deleteRecordById = async (req,res) => {
    try {
        const record = await database.budget.delete({
            where:{
                key:+req.params.id
            },
        })
        res.status(200).json({record})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
export {
    getBudgets,
    addRecord,
    getRecordById,
    updateRecordById,
    deleteRecordById
}