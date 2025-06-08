import { NextRequest, NextResponse } from 'next/server';
import { getClasses, createClass } from '@/services/classService';

export async function GET() {
  try {
    const classes = await getClasses();

    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.code) {
      return NextResponse.json({ error: 'Name, Code are required' }, { status: 400 });
    }

    const newClass = await createClass(data);
    return NextResponse.json({ message: 'Class created', data: newClass});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
