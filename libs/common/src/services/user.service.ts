import { Injectable } from "@nestjs/common";
import { User } from "../model";
import { LogService } from "./log.service";

@Injectable()
export class UserService {
  constructor(private logger: LogService) {
    this.logger.setContext("UserService");
  }

  create(user: User) {
    this.logger.log("This action adds a new user");
    return user;
  }

  findAll() {
    this.logger.log("This action returns all users");
    return [];
  }

  findOne(id: number) {
    this.logger.log(`This action returns a #${id} user`);
    return null;
  }

  update(id: number, user: User) {
    this.logger.log(`This action updates a #${id} user`);
    return null;
  }

  remove(id: number) {
    this.logger.warn(`This action removes a #${id} user`);
    return null;
  }
}
