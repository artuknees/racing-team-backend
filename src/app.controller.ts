import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  newEndpoint() {
    return {
      message: 'this is a test response'
    };
  }

  @Get('/enginesTest')
  getAtlasEngines() {
    return this.appService.getAtlasEngines();
  }
}
