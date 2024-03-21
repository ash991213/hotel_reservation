import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { HotelRepository } from '@libs/entity/hotel/hotel.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel, HotelRepository])],
    exports: [TypeOrmModule],
    providers: [],
    controllers: [],
})
export class HotelTypeormModule {}
