// /app/api/addStudent/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const newStudent = await req.json();

    newStudent.fullName = newStudent.fullName.toUpperCase();

    // Specify the path to your JSON file
    const filePath = path.join(process.cwd(), 'data', 'students.json');

    // Read the current students from the file
    const data = fs.readFileSync(filePath, 'utf8');
    const students = JSON.parse(data);

    // Generate a new ID for the student
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const studentWithId = { ...newStudent, id: newId }; // Include the new ID

    // Add the new student to the list
    students.push(studentWithId);

    // Write the updated list back to the file
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    // Return a success response
    return NextResponse.json({ message: 'Student added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving student:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

