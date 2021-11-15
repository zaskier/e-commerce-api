import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  getUsersData(): {name: string} {
    return {name:'Server is active'};
  }
}
