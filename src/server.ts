import application from "./app";
import { connectDatabase } from "./configs/dataSource.config";
import { config } from "./configs/index.config";
import { logger } from "./configs/logger.config";

application.listen(config.server.port, () => {
  logger.info(`Nodejs Server is running on port ${config.server.port}`);
  connectDatabase();
});
