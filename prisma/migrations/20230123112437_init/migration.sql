-- CreateTable
CREATE TABLE "uploaduser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoFileName" VARCHAR(255),

    CONSTRAINT "uploaduser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uploaduser_username_key" ON "uploaduser"("username");
