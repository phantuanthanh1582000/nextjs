import { NextRequest, NextResponse } from 'next/server';
import { getStudents, createStudent } from '@/services/studentService';

export async function GET() {
  try {
    const students = await getStudents();

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.classId) {
      return NextResponse.json({ error: 'Name, Email, classId are required' }, { status: 400 });
    }

    const student = await createStudent(data);
    return NextResponse.json({ message: 'Student created', data: student});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
