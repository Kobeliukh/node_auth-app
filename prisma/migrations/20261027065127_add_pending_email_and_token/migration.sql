/*
  Warnings:

  - A unique constraint covering the columns `[pending_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pending_email_confirmation_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pending_email" TEXT,
ADD COLUMN     "pending_email_confirmation_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_pending_email_key" ON "users"("pending_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_pending_email_confirmation_token_key" ON "users"("pending_email_confirmation_token");
