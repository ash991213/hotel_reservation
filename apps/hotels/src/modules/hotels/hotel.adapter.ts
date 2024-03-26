import { Hotel } from '@libs/entity/models/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotels/hotel.dto';

export abstract class IHotelService {
    /**
     * 모든 호텔 정보를 반환합니다.
     * @returns 호텔 객체를 담은 배열
     */
    abstract getHotels(): Promise<Hotel[]>;

    /**
     * 호텔의 상세 정보를 반환합니다.
     * @param id 호텔 ID
     * @returns 호텔 객체
     */
    abstract getHotelById(id: number): Promise<Hotel>;

    /**
     * 신규 호텔을 추가합니다.
     * @param hotelData 신규 호텔 정보
     * @returns 추가된 호텔 객체
     */
    abstract createHotel(hotelData: CreateHotelDto): Promise<Hotel>;

    /**
     * 호텔 정보를 갱신합니다.
     * @param id 호텔 ID
     * @param updateData 갱신할 호텔 정보
     * @returns 갱신된 호텔 객체
     */
    abstract updateHotel(id: number, updateData: UpdateHotelDto): Promise<Hotel>;

    /**
     * 호텔 정보를 삭제합니다.
     * @param id 호텔 ID
     * @returns 삭제 성공 여부
     */
    abstract removeHotel(id: number): Promise<boolean>;
}
