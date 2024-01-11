import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CoffeeType, RatingsService } from '../../ratings';
import { RatingDto } from 'src/ratings/http/ratings.controller';

@Injectable()
export class RecommendationService {
  constructor(private readonly ratingsService: RatingsService) {}

  // getRatings(): RatingDto[] {
  //   if (!this.ratingsService) {
  //     throw new Error('RatingsService is not initialized.');
  //   }
  //   return this.ratingsService.RatingArray;
  // }

  calculateCoffeeTypeRecommendation(): CoffeeType | null | any {
    try {
      return this.ratingsService.coffeeTypeRecommendation();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
