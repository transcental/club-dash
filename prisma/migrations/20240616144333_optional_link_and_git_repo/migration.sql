-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "gitRepo" TEXT,
ALTER COLUMN "link" DROP NOT NULL;
