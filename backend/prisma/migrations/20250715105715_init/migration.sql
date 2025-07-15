-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_original_key" ON "urls"("original");

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortened_key" ON "urls"("shortened");
