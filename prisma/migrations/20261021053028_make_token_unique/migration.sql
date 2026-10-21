/*
  Warnings:

  - A unique constraint covering the columns `[activation_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_activation_token_key" ON "users"("activation_token");
