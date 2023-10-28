-- CreateTable
CREATE TABLE "contestant" (
    "played" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "contestandid" SERIAL NOT NULL,
    "tournamentid" INTEGER NOT NULL,

    CONSTRAINT "contestant_pkey" PRIMARY KEY ("contestandid")
);

-- CreateTable
CREATE TABLE "result" (
    "resultid" SERIAL NOT NULL,
    "round" INTEGER NOT NULL,
    "winner" INTEGER NOT NULL,
    "tournamentid" INTEGER NOT NULL,
    "contestandid" INTEGER NOT NULL,
    "isawaycontestandid" INTEGER NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("resultid")
);

-- CreateTable
CREATE TABLE "tournament" (
    "winpoints" DOUBLE PRECISION NOT NULL,
    "drawpoints" DOUBLE PRECISION NOT NULL,
    "losspoints" DOUBLE PRECISION NOT NULL,
    "tournamentid" SERIAL NOT NULL,
    "link" VARCHAR(300) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "owner" VARCHAR(100) NOT NULL,

    CONSTRAINT "tournament_pkey" PRIMARY KEY ("tournamentid")
);

-- AddForeignKey
ALTER TABLE "contestant" ADD CONSTRAINT "contestant_tournamentid_fkey" FOREIGN KEY ("tournamentid") REFERENCES "tournament"("tournamentid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_contestandid_fkey" FOREIGN KEY ("contestandid") REFERENCES "contestant"("contestandid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_isawaycontestandid_fkey" FOREIGN KEY ("isawaycontestandid") REFERENCES "contestant"("contestandid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_tournamentid_fkey" FOREIGN KEY ("tournamentid") REFERENCES "tournament"("tournamentid") ON DELETE NO ACTION ON UPDATE NO ACTION;
