-- CreateTable
CREATE TABLE "Clicks" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" TEXT NOT NULL,

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clicks" ADD CONSTRAINT "Clicks_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
