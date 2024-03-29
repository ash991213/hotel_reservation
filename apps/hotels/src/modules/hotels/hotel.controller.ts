import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ResImpl } from '@libs/utils/common/res/res.implement';
import { SUCCESS } from '@libs/utils/common/const/error.const';

import { IHotelService } from '@apps/hotels/src/modules/hotels/hotel.adapter';

import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotels/hotel.dto';

@Controller({ version: '1', path: 'api/hotels' })
export class HotelController {
    constructor(private readonly hotelService: IHotelService) {}

    @Get('/')
    public async getHotels(): Promise<ResImpl> {
        const hotel = await this.hotelService.getHotels();
        return new ResImpl({ ...SUCCESS, data: hotel });
    }

    @Get('/:id')
    public async getHotelById(@Param('id') id: number): Promise<ResImpl> {
        const hotel = await this.hotelService.getHotelById(id);
        return new ResImpl({ ...SUCCESS, data: hotel });
    }

    @Post('/')
    public async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<ResImpl> {
        const hotel = await this.hotelService.createHotel(createHotelDto);
        return new ResImpl({ ...SUCCESS, data: hotel });
    }

    @Put('/:id')
    public async updateHotel(@Param('id') id: number, @Body() updateHotelDto: UpdateHotelDto): Promise<ResImpl> {
        const hotel = await this.hotelService.updateHotel(id, updateHotelDto);
        return new ResImpl({ ...SUCCESS, data: hotel });
    }

    @Delete('/:id')
    public async removeHotel(@Param('id') id: number): Promise<ResImpl> {
        await this.hotelService.removeHotel(id);
        return new ResImpl({ ...SUCCESS });
    }
}
