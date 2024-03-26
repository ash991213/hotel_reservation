import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';

import { Hotel } from '@libs/entity/models/hotel/hotel.entity';

import { ICacheService } from '@libs/modules/cache/adapter';

@EventSubscriber()
export class HotelSubscribers implements EntitySubscriberInterface<Hotel> {
    constructor(
        private connection: Connection,
        private readonly cacheService: ICacheService,
    ) {
        this.connection.subscribers.push(this);
    }

    public listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
        return Hotel;
    }

    async afterInsert(event: InsertEvent<Hotel>): Promise<void> {
        try {
            await this.cacheService.set(`hotel:${event.entity.hotel_id}`, JSON.stringify(event.entity));
        } catch (error) {
            console.error(error);
        }
    }

    async afterUpdate(event: UpdateEvent<Hotel>): Promise<void> {
        try {
            await this.cacheService.set(`hotel:${event.entity.hotel_id}`, JSON.stringify(event.entity));
        } catch (error) {
            console.error(error);
        }
    }

    async afterRemove(event: RemoveEvent<Hotel>): Promise<void> {
        try {
            await this.cacheService.del(`hotel:${event.entityId}`);
        } catch (error) {
            console.error(error);
        }
    }
}
