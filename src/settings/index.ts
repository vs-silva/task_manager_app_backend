import {config} from 'dotenv';
config();

export default {
   SERVER_PORT: process.env.SERVER_PORT || 3000
} as const;
