import { startServer } from './server.js';

const initStart = async () => {
  try {
   
    startServer();
  } catch (error) {
    console.error('Failed to initialize MongoDB connection:', error);
  }
};

initStart();