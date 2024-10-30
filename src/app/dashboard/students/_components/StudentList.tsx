'use client'
import { useEffect, useState } from 'react';
import studentsData from '../../../../../data/students.json';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    fullName: string;
    grade: string;
    contactNumber: string;
    address: string;
}

const StudentList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(studentsData); // Specify the type here

    // Filter students based on the search term
    const filterStudents = () => {
        const results = studentsData.filter((record: Student) =>
            record.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(results);
    };

    // Handle search button click
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission
        filterStudents();
    };

    // Handle student deletion
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/deleteStudent', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send the student ID to delete
            });

            if (response.ok) {
                // Update the state to remove the deleted student
                const updatedStudents = filteredStudents.filter(student => student.id !== id);
                setFilteredStudents(updatedStudents); // Update the state with the filtered students
            } else {
                console.error('Failed to delete student');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div>
            <h2 className='font-bold text-2xl flex justify-between items-center'>Student List</h2>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-lg w-full sm:w-1/2 mr-2"
                />
                <Button
                    type="submit"
                >
                    Search
                </Button>
            </form>

            <div className='my-5 overflow-x-auto'>
                {filteredStudents.length > 0 ? (
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Full Name</th>
                                <th className="border border-gray-300 p-2">Grade</th>
                                <th className="border border-gray-300 p-2">Contact</th>
                                <th className="border border-gray-300 p-2">Address</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((record: Student) => (
                                <tr key={record.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{record.id}</td>
                                    <td className="border border-gray-300 p-2">{record.fullName.toUpperCase()}</td>
                                    <td className="border border-gray-300 p-2">{record.grade}</td>
                                    <td className="border border-gray-300 p-2">{record.contactNumber}</td>
                                    <td className="border border-gray-300 p-2">{record.address}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button 
                                            onClick={() => handleDelete(record.id)} 
                                            className="text-red-500 hover:text-red-700"
                                            aria-label="Delete student"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-red-500 mt-4">No students found matching "{searchTerm}".</div>
                )}
            </div>
        </div>
    );
}

export default StudentList;
