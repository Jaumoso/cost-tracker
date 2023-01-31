import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { OperationSchema } from './schemas/operation.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }]),
    ],
    controllers: [OperationController],
    providers: [OperationService, JwtStrategy],
    exports: [OperationService],
})
export class OperationModule {}