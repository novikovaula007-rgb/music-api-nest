import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

  @Get()
  async findAll(@Query('album') albumId?: string) {
    const filter = albumId ? { album: albumId } : {};
    return this.trackModel.find(filter);
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = new this.trackModel({
      title: createTrackDto.title,
      duration: createTrackDto.duration,
      album: createTrackDto.album,
    });

    return track.save();
  }

  @Delete()
  @UseGuards(TokenAuthGuard)
  async deleteOne(@Param('id') id: string) {
    return this.trackModel.findByIdAndDelete(id);
  }
}
