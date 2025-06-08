import dbConnect from "@/lib/mongodb";
import Student, { IStudent } from "@/models/student";
import { IClass } from "@/models/class";

export async function getStudents(): Promise<(IStudent & {classId: IClass})[]> {
  await dbConnect();
  const students = await Student.find().populate("classId", "name");
  return students;
}

export async function createStudent(data: { name: string; email: string; classId: string }): Promise<(IStudent & {classId: IClass})> {
  await dbConnect();

  const student = new Student({
    classId: data.classId,
    name: data.name,
    email: data.email,
  });

  await student.save();

  const populatedStudent = await student.populate("classId", "name");

  return populatedStudent;
}
