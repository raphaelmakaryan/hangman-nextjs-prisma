-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");
