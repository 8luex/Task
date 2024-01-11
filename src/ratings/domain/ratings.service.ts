import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RatingDto } from '../http/ratings.controller';
@Injectable()
export class RatingsService {
  constructor(@Inject('SHARED_ARRAY') private readonly sharedArray: RatingDto[]) {}

  RatingArray: RatingDto[] = [];

  rateCoffeeType(ratingDto: RatingDto) {
    const { starRating } = ratingDto;
    const regex = /^[1-5]\/5$/;
    if (!regex.test(starRating)) {
      throw new BadRequestException('400 Bad Request');
    }
    this.RatingArray.push(ratingDto);
    this.sharedArray.push(ratingDto);
  }

  mostRecentRatingOfCoffeeType() {
    try {
      if (this.RatingArray.length === 0) {
        throw new BadRequestException({
          coffeeType: 'coffeeType',
          starRating: 'not rated yet coffee type taken from query param',
        });
      }
      const mostRecentRating = this.RatingArray[this.RatingArray.length - 1];
      return mostRecentRating;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  coffeeTypes() {
    try {
      return this.RatingArray.map((rating) => rating.coffeeType);
    } catch (error) {
      throw new BadRequestException('400 Bad Request');
    }
  }

  coffeeTypeRecommendation() {
    console.log(this.sharedArray);

    try {
      if (this.sharedArray.length === 0) {
        return { message: 'NO_RECOMMENDATIONS_AVAILABLE' };
      }
      let recommendedArray = this.sharedArray.filter(
        (item) => item.coffeeType !== this.sharedArray[this.sharedArray.length - 1].coffeeType,
      );
      const no = recommendedArray.filter(
        (rating) => rating.starRating !== '5/5' && rating.starRating !== '4/5',
      );
      recommendedArray = recommendedArray.filter(
        (item) => !no.some((rating) => rating.coffeeType === item.coffeeType),
      );
      if (recommendedArray.length === 0) {
        return { message: 'NO_RECOMMENDATIONS_AVAILABLE' };
      } else {
        console.log(recommendedArray, 'BLuie');

        console.log(recommendedArray[0].coffeeType);

        return { coffeeType: recommendedArray[0].coffeeType };
      }
    } catch (error) {
      throw new BadRequestException('400 Bad Request');
    }
  }
}
