import database from "../prisma.js";

const getBankCustomers = async (req,res)=>{
    try {
        const users = await database.customer_data.findMany({})
        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error);
    }
}
//-------------------------------------------------
const addCustomer = async (req,res)=>{
    try {
        const user = await database.customer_data.create({
            data:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                monthly_salary:+req.body.monthly_salary,
                phone_number:req.body.phone_number,
                approved_limit:+req.body.approved_limit,
                age:+req.body.age

            }
        })
        console.log(user);
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message);
    }
}
//------------------------------------------
const checkEligibility = async (req,res)=>{
    try {
        res.status(200).json({message:"works"})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message);
    }
}
//--------------------------------------------
const createLoan = async (req,res)=>{
    try {
        const newLoan = await database.loan_data.create({
            data:{
                customer_id:+req.body.customer_id,
                loan_amount:+req.body.loan_amount,
                interest_rate:+req.body.interest_rate,
                tenure:+req.body.tenure,
                monthly_payment:+req.body.monthly_payment,
                EMIs_paid_Time:+req.body.EMIs_paid_Time,
                start_date:new Date().toISOString(),
                end_date:new Date().toISOString(),
            }
        })
        res.status(200).json({newLoan})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
const getLoanById = async (req,res) => {
    try {
        const loan = await database.loan_data.findFirst({
            where:{
                loan_id:+req.params.loan_id
            },
            select:{
                loan_id:true,
                customer_data:{
                    select:{
                        first_name:true,
                        last_name:true,
                        age:true,
                        phone_number:true,
                    }
                },
                loan_amount:true,
                interest_rate:true,
                monthly_payment:true,
                tenure:true,
            }
        })
        res.status(200).json({loan})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
//--------------------------------------------
const payLoanIdByCustomerId = async (req,res) => {
    try {
        res.status(200).json({message:"works"})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message);
    }
}
const getLoanByIdByCustomerId = async (req,res) =>{
    try {
        const loan = await database.loan_data.findFirst({
            where:{
                loan_id:+req.params.loan_id,
                customer_id:+req.params.customer_id
            },
            select:{
                loan_id:true,
                customer_data:{
                    select:{
                        first_name:true,
                        last_name:true,
                        age:true,
                        phone_number:true,
                    }
                },
                loan_amount:true,
                interest_rate:true,
                monthly_payment:true,
                tenure:true,
                EMIs_paid_Time:true
            }
        })
        res.status(200).json({loan})
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log(error.message); 
    }
}
export {
    getBankCustomers,
    addCustomer,
    checkEligibility,
    createLoan,
    getLoanById,
    payLoanIdByCustomerId,
    getLoanByIdByCustomerId
}