import { Controller, Get } from '@nestjs/common';
import { RecommendationService } from '../domain';
import { CoffeeType, RatingsService } from '../../ratings';

@Controller('recommendation')
export class RecommendationController {
  constructor(
    private recommendationService: RecommendationService,
    private ratingsService: RatingsService,
  ) {}
  @Get() //http://localhost:3000/recommendation
  mostRecentRatingOfCoffeeType(): CoffeeType | null | any {
    return this.recommendationService.calculateCoffeeTypeRecommendation();
    // return this.ratingsService.coffeeTypeRecommendation();
  }
}
