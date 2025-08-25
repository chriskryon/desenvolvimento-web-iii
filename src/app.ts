
import express from 'express';
import carRoutes from './routes/carRoutes';
import { PrismaClient } from '../generated/prisma';

const app = express();
app.use(express.json());

app.use('/api/carros', carRoutes);

app.get('/', (_req, res) => res.send('API Prisma Carros'));

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
    process.exit(1);
  }
}

startServer();
