import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { CommonService } from "./common.service";
import { User } from "./model";
import { LogService } from "./services";
import { UserService } from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CommonService, LogService, UserService],
  exports: [CommonService, LogService, UserService, TypeOrmModule],
})
export class CommonModule {}
