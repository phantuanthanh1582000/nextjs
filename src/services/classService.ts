import dbConnect from "@/lib/mongodb";
import ClassModel, { IClass } from "@/models/class";

export async function getClasses(): Promise<IClass[]> {
  await dbConnect();
  const Classes = await ClassModel.find();
  return Classes;
}

export async function createClass(data: { name: string; code: string }): Promise<IClass> {
  await dbConnect();

  const newClass = new ClassModel({
    name: data.name,
    code: data.code,
  });

  await newClass.save();
  return newClass;
}
