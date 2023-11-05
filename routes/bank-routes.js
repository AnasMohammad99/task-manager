import express from "express";
import { addCustomer, getBankCustomers, checkEligibility, createLoan, getLoanById, payLoanIdByCustomerId, getLoanByIdByCustomerId } from "../controllers/bank-controller.js";

const router = express.Router();

  router.get('/', getBankCustomers);
  router.post('/register',addCustomer);
  router.post('/check-eligibility',checkEligibility);
  router.post('/create-loan',createLoan);
  router.get('/view-loan/:loan_id', getLoanById);
  router.post('/make-payment/:customer_id/:loan_id',payLoanIdByCustomerId)
  router.get('/view-statement/:customer_id/:loan_id', getLoanByIdByCustomerId);



export default router