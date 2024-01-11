import { Global, Module } from '@nestjs/common';
import { RatingsController } from './http';
import { RatingsService } from './domain';
import { RatingDto } from './http/ratings.controller';

const RatingArray: RatingDto[] = [];
@Global()
@Module({
  controllers: [RatingsController],
  providers: [
    RatingsService,
    {
      provide: 'SHARED_ARRAY',
      useValue: RatingArray,
    },
  ],
  exports: [RatingsService, 'SHARED_ARRAY'],
})
export class RatingsModule {}
