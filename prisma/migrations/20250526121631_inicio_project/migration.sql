-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "commercialName" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "cellPhoneNumber" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminated" BOOLEAN NOT NULL DEFAULT false,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminated" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cellPhoneNumber" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "eliminated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "resetKey" TEXT,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    "employeeId" INTEGER,

    CONSTRAINT "AccountUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountUserCredential" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "accountUserId" TEXT NOT NULL,

    CONSTRAINT "AccountUserCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogsUpdateemployee" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "modificationDate" TIMESTAMP(3) NOT NULL,
    "modifiedColumn" TEXT NOT NULL,
    "previousData" TEXT,
    "newData" TEXT,

    CONSTRAINT "LogsUpdateemployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogsUpdateDepartment" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "modificationDate" TIMESTAMP(3) NOT NULL,
    "modifiedColumn" TEXT NOT NULL,
    "previousData" TEXT,
    "newData" TEXT,

    CONSTRAINT "LogsUpdateDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogsDepartmentChangeByEmployee" (
    "id" SERIAL NOT NULL,
    "modificationDate" TIMESTAMP(3) NOT NULL,
    "previousDepartmentId" INTEGER NOT NULL,
    "newDepartmentId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "LogsDepartmentChangeByEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_nit_key" ON "Company"("nit");

-- CreateIndex
CREATE INDEX "Department_companyId_idx" ON "Department"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_identificationNumber_key" ON "Employee"("identificationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_companyId_key" ON "Employee"("email", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUser_email_key" ON "AccountUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUser_employeeId_key" ON "AccountUser"("employeeId");

-- CreateIndex
CREATE INDEX "AccountUser_companyId_idx" ON "AccountUser"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUserCredential_accountUserId_key" ON "AccountUserCredential"("accountUserId");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUser" ADD CONSTRAINT "AccountUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUser" ADD CONSTRAINT "AccountUser_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUserCredential" ADD CONSTRAINT "AccountUserCredential_accountUserId_fkey" FOREIGN KEY ("accountUserId") REFERENCES "AccountUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogsUpdateemployee" ADD CONSTRAINT "LogsUpdateemployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogsUpdateDepartment" ADD CONSTRAINT "LogsUpdateDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogsDepartmentChangeByEmployee" ADD CONSTRAINT "LogsDepartmentChangeByEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
