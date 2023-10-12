import dotenv from "dotenv";

dotenv.config();

export const config: {
  db: {
    username: string;
    password: string;
    host: string;
    database: string;
    port: number;
  };
  server: {
    port: number;
  };
} = {
  db: {
    username:process.env.MYSQL_DATABASE_USER_NAME ||"root",
    password: process.env.MYSQL_ROOT_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    database: process.env.MYSQL_DATABASE || "",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  },
  server: {
    port: process.env.NODE_SERVER_PORT
      ? parseInt(process.env.NODE_SERVER_PORT)
      : 3000,
  },
};
