import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CoffeeType, RatingsService } from '../domain';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}
  @Get() //http://localhost:3000/ratings
  mostRecentRatingOfCoffeeType(): RatingDto {
    // return {
    //   coffeeType: 'Kenyan, drip',
    //   starRating: '4/5',
    // };
    return this.ratingsService.mostRecentRatingOfCoffeeType();
  }

  @Post() //http://localhost:3000/ratings
  @HttpCode(HttpStatus.CREATED)
  rateCoffeeType(@Body() ratingDto: RatingDto) {
    this.ratingsService.rateCoffeeType(ratingDto);
  }

  @Get('coffee-types') //http://localhost:3000/ratings/coffee-types
  coffeeTypes(): CoffeeType[] {
    // return ['some rated coffee type', 'another rathed coffee type'];
    return this.ratingsService.coffeeTypes();
  }
}

export type RatingDto = {
  coffeeType: string;
  starRating: string;
};
