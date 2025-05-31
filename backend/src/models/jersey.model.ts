import { Schema, model} from "mongoose";

export interface Jersey {
    id:number;
    team:string;
    year:string;
    type:string;
    size:string[];
    favorite:boolean;
    image:string;
    price:number;
}

export const JerseySchema = new Schema<Jersey>(
    {
        
        team: {type:String, required: true},
        year: {type:String, required: true},
        type: {type:String, required: true},
        size: {type: [String], required: true},
        favorite: {type:Boolean, default: false},
        image: {type:String, required: true},
        price: {type:Number, required: true},

    }
);

export const JerseyModel =  model<Jersey>('jersey', JerseySchema);