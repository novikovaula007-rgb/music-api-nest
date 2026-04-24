import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Artist, ArtistSchema} from "./schemas/artist.schema";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/music-api-js-30-ulyana'),
        MongooseModule.forFeature([
            {name: Artist.name, schema: ArtistSchema},
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
