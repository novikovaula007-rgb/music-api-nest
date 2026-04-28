import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { musicStorage } from '../utils/file-upload.utils';
import { CreateAlbumDto } from './create-album.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('albums')
export class AlbumsController {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  @Get()
  async findAll(@Query('artist') artistId?: string) {
    const filter = artistId ? { artist: artistId } : {};
    return this.albumModel.find(filter).populate('artist');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumModel.findById(id).populate('artist');
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: musicStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      title: createAlbumDto.title,
      description: createAlbumDto.description,
      image: file ? file.filename : null,
      release_year: createAlbumDto.release_year,
      artist: createAlbumDto.artist,
    });

    return album.save();
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  async deleteOne(@Param('id') id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
