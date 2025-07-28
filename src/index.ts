import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router); 

app.listen(6969, () => {
  console.log('Server listening on port 6969');
});
