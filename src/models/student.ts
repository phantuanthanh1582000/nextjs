import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  classId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  classId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: true  
});

const StudentModel = mongoose.models.Student ||mongoose.model<IStudent>("Student", StudentSchema);

export default StudentModel;
