import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Artist, ArtistDocument} from "../schemas/artist.schema";
import {Model} from "mongoose";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateArtistDto} from "./create-artist.dto";
import {musicStorage} from "../utils/file-upload.utils";

@Controller('artists')
export class ArtistsController {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>
    ) {
    }

    @Get()
    async getAll() {
        return this.artistModel.find();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.artistModel.findById(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('photo', {storage: musicStorage})
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() artistData: CreateArtistDto,
    ) {
        console.log(file)
        const artist = new this.artistModel({
            name: artistData.name,
            description: artistData.description,
            photo: file ? file.filename : null,
        });

        return artist.save();
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        return this.artistModel.findByIdAndDelete(id);
    }
}
