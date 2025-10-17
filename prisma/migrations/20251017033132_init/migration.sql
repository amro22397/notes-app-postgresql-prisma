-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "hashedPassword" TEXT,
    "lockedPassword" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "resetLockPasswordToken" TEXT,
    "resetLockPasswordExpires" TIMESTAMP(3),
    "isVerified" BOOLEAN DEFAULT false,
    "verifyToken" TEXT,
    "verifyTokenExpires" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "noteName" TEXT,
    "noteContent" TEXT,
    "dateCreation" TIMESTAMP(3),
    "isPinned" BOOLEAN DEFAULT false,
    "isLocked" BOOLEAN DEFAULT false,
    "emailRef" TEXT,
    "lockedPassword" TEXT,
    "categories" TEXT[],

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
