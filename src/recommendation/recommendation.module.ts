import { Module } from '@nestjs/common';
import { RecommendationController } from './http';
import { RecommendationService } from './domain';
import { RatingsModule, RatingsService } from '../ratings';

@Module({
  imports: [RatingsModule],
  controllers: [RecommendationController],
  providers: [RecommendationService, RatingsService],
})
export class RecommendationModule {}
