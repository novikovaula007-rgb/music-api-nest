import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;
  @Prop({
    required: true,
    ref: 'Artist',
    type: Types.ObjectId,
  })
  artist: Artist | Types.ObjectId;
  @Prop({ required: true })
  release_year: number;
  @Prop({ default: null })
  description: string;
  @Prop({ default: null })
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
