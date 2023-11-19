-- CreateEnum
CREATE TYPE "Category" AS ENUM ('INCOMES', 'EXPENSES');

-- CreateTable
CREATE TABLE "Budget" (
    "key" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("key")
);
