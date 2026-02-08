import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ScriptsService } from './scripts.service';

@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.scriptsService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.scriptsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.scriptsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptsService.remove(id);
  }

  @Post(':id/lock')
  lock(@Param('id') id: string, @Body('userId') userId: string) {
    return this.scriptsService.lock(id, userId);
  }

  @Post(':id/unlock')
  unlock(@Param('id') id: string) {
    return this.scriptsService.unlock(id);
  }
}
