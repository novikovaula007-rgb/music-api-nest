import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {Album} from "./album.schema";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({required: true})
    title: string;
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: "Album"
    })
    album: Album | Types.ObjectId;
    @Prop({required: true})
    duration: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);