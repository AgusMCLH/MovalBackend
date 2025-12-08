import dotenv from 'dotenv';
dotenv.config({ path: ['./envs/mongo.env', './envs/appCredential.env'] });

const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  SECRET: process.env.SECRET || 'secretkey',
  movalPass: process.env.MOVAL_PASS || 'adminpass',
};

console.log('Configuration loaded:', config);

export default config;
