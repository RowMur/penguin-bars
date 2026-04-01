-- CreateTable
CREATE TABLE "PenguinBar" (
    "id" TEXT NOT NULL,
    "joke" TEXT NOT NULL,
    "fact" TEXT NOT NULL,
    "design" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenguinBar_pkey" PRIMARY KEY ("id")
);
