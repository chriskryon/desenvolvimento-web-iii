-- CreateTable
CREATE TABLE "public"."Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Carro" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pessoa_por_carro" (
    "pessoaId" INTEGER NOT NULL,
    "carroId" INTEGER NOT NULL,
    "dataCompra" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoa_por_carro_pkey" PRIMARY KEY ("pessoaId","carroId")
);

-- AddForeignKey
ALTER TABLE "public"."pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."Pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "public"."Carro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
