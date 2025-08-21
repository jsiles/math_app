import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('update')
  @HttpCode(200)
  async updateData(@Body() body: any) {
    return this.syncService.updateData(body);
  }

  @Get('status')
  @HttpCode(200)
  async getSyncStatus() {
    return this.syncService.getSyncStatus();
  }
}
