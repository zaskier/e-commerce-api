import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsersData(): { name: string } {
    return { name: 'Server is active' };
  }
}
