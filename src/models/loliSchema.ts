import mongoose from "mongoose";

interface LoliImage {
    link: string;
    author: string;
    source: string;
  }
  
const loliImageSchema = new mongoose.Schema<LoliImage>({
    link: {type: String, required: true},
    author: {type: String, required: true},
    source: {type: String, required: true},
})   

const loliImageModel = mongoose.model<LoliImage>("loliImage", loliImageSchema);

export default loliImageModel;