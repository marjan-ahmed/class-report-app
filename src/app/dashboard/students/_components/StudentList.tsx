"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Student {
  id: string;
  fullName: string;
  grade: string;
  contactNumber: string;
  address: string;
}

interface StudentListProps {
  studentList?: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ studentList }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const studentsCollection = collection(db, 'addStudents');

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await getDocs(studentsCollection);
        const studentsList = data.docs.map((doc) => ({
          ...(doc.data() as Student),
          id: doc.id
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };

    getStudents();
  }, []);

  const customBtns = (params: any) => {
    return <Button><Trash /></Button>;
  };

  const colDefs: ColDef<Student>[] = [
    { field: "id", headerName: "ID", filter: true },
    { field: "fullName", headerName: "Full Name", filter: true },
    { field: "grade", headerName: "Grade", filter: true },
    { field: "contactNumber", headerName: "Contact Number", filter: true },
    { field: "address", headerName: "Address", filter: true },
    { 
      headerName: "Actions", 
      cellRenderer: customBtns 
    }
  ];

  const [rowData, setRowData] = useState<Student[]>([]);

  useEffect(() => {
    if (studentList) {
      setRowData(studentList);
    } else {
      setRowData(students);
    }
  }, [studentList, students]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact 
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
};

export default StudentList;
