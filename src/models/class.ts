import mongoose, {Schema, Document} from "mongoose"; 

export interface IClass extends Document {
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  code: {type: String, required: true},
}, {
  timestamps: true  
});

const ClassModel = mongoose.models.Class ||mongoose.model<IClass>("Class", ClassSchema);

export default ClassModel;