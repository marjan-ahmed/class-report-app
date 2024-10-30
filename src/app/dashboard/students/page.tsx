import React from 'react'; // This import is correct.
import AddNewStudent from './_components/AddNewStudent';
import StudentList from './_components/StudentList';

const Students= () => {
  return (
    <div className='p-14'>
      <AddNewStudent />
      <div className='mt-15'></div>
      <StudentList />
     
    </div>
  );
};

export default Students;