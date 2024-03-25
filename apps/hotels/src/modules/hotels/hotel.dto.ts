import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class CreateHotelDto {
    @Expose({ name: 'name' })
    @IsString()
    @MaxLength(50)
    name: string;

    @Expose({ name: 'address' })
    @IsString()
    @MaxLength(150)
    address: string;

    @Expose({ name: 'location' })
    @IsString()
    @MaxLength(150)
    location: string;
}

export class UpdateHotelDto {
    @Expose({ name: 'name' })
    @IsString()
    @MaxLength(50)
    name: string;

    @Expose({ name: 'address' })
    @IsString()
    @MaxLength(150)
    address: string;

    @Expose({ name: 'location' })
    @IsString()
    @MaxLength(150)
    location: string;
}
