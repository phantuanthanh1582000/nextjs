// services/studentService.ts
import dbConnect from "@/lib/mongodb";
import Student, { IStudent } from "@/models/student";

export async function getStudents(): Promise<IStudent[]> {
  await dbConnect();
  const students = await Student.find();
  return students;
}

export async function createStudent(data: { name: string; email: string; classId: string }): Promise<IStudent> {
  await dbConnect();

  const student = new Student({
    classId: data.classId,
    name: data.name,
    email: data.email,
  });

  await student.save();
  return student;
}
