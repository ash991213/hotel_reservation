import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Hotel } from './hotel.entity';
import { HotelRepository } from './hotel.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel, HotelRepository])],
    exports: [TypeOrmModule],
    providers: [],
    controllers: [],
})
export class HotelTypeormModule {}
