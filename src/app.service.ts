import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  name: string;
  getHello(): string {
    return `Hello ${this.name}!`;
  }
}
