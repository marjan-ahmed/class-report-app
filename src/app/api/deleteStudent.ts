// pages/api/deleteStudent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the Student interface to specify the structure of a student object
interface Student {
    id: number;
    fullName: string;
    grade: string;
    contactNumber: string;
    address: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id }: { id: number } = req.body;

        // Define the path to your JSON file
        const filePath = path.join(process.cwd(), 'data', 'students.json');

        // Read the existing data
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading data' });
            }

            // Parse the data into an array of students
            const studentsData: Student[] = JSON.parse(data);

            // Filter out the student to be deleted
            const newStudentsData = studentsData.filter((student: Student) => student.id !== id);

            // Write the updated data back to the file
            fs.writeFile(filePath, JSON.stringify(newStudentsData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving data' });
                }

                return res.status(200).json({ message: 'Student deleted successfully.' });
            });
        });
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
