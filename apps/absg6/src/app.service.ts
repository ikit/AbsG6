import { LogService } from "@app/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private logger: LogService) {
    this.logger.setContext("AppService");
  }

  getHello(): string {
    this.logger.log("Doing something...");
    this.logger.error("Doing something...", { id: "1", payload: 3 });
    this.logger.warn("Doing something...");
    this.logger.debug("Doing something...");
    this.logger.verbose("Doing something...");
    return "Hello World!";
  }
}
