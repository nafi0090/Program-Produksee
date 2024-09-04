-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "deposito_type" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposito_Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "yearly_return" INTEGER NOT NULL,

    CONSTRAINT "Deposito_Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_deposito_type_key" ON "Account"("deposito_type");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_deposito_type_fkey" FOREIGN KEY ("deposito_type") REFERENCES "Deposito_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
