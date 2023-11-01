import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parentsController } from 'src/controller/parents.controller';
import { parentsEntity } from 'src/entity/parents.entity';
import { parentsService } from 'src/service/parents.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([parentsEntity])
    ],
    controllers:[parentsController],
    providers:[parentsService]
})
export class parentsModule {}