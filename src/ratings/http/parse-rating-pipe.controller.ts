import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { RatingDto } from './ratings.controller';
import { Rating } from '../domain';

export class ParseRatingPipe implements PipeTransform<RatingDto, Rating> {
  transform(ratingDto: RatingDto, metadata: ArgumentMetadata): Rating {
    return {
      coffeeType: 'Kenyan, drip',
      stars: {
        given: 4,
        max: 5,
      },
    };
  }
}
