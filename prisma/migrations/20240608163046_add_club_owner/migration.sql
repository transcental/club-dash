/*
  Warnings:

  - You are about to drop the `_ClubToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClubToUser" DROP CONSTRAINT "_ClubToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToUser" DROP CONSTRAINT "_ClubToUser_B_fkey";

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClubToUser";

-- CreateTable
CREATE TABLE "_Memberships" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Memberships_AB_unique" ON "_Memberships"("A", "B");

-- CreateIndex
CREATE INDEX "_Memberships_B_index" ON "_Memberships"("B");

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Memberships" ADD CONSTRAINT "_Memberships_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Memberships" ADD CONSTRAINT "_Memberships_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
