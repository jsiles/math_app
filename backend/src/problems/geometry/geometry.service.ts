import { Injectable } from '@nestjs/common';

@Injectable()
export class GeometryService {
  getProblems() {
    return [{ id: 1, question: 'Calculate the area of a circle with radius 2', answer: '12.57' }];
  }
}
