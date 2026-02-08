import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string, @Query('type') type?: string) {
    return this.assetsService.findByProject(projectId, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.assetsService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}
