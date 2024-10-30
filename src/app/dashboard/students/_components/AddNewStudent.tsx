"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Import toast
import { LoaderIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const AddNewStudent = () => {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9-E");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEffect, setResetEffect] = useState(false);

  const resetForm = () => {
    setFullName("");
    setGrade("9-E");
    setContactNumber("");
    setAddress("");
    setOpen(false);
    setResetEffect(true); // Trigger reset effect
  };

  const handleSave = async () => {
    const newStudent = {
      id: uuidv4(), // Generate a unique ID
      fullName,
      grade,
      contactNumber,
      address,
    };

    setLoading(true); // Set loading to true before the fetch

    try {
      const response = await fetch('/api/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        resetForm(); // Reset form fields and close dialog
        toast.success("Student added successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        console.error('Error adding student:', errorData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the fetch
    }

    // Reset the effect after a short delay
    if (resetEffect) {
      setTimeout(() => {
        setResetEffect(false);
      }, 1000); // Duration of the reset effect
    }
  };

  return (
    <div>
      <Button className="flex ml-auto" onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <div className="py-2">
                <label>Full Name</label>
                <Input 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Ex. Henry Kelvin'
                  className={resetEffect ? "highlight" : ""}
                />
              </div>
              <div className="flex flex-col">
                <label>Select Grade and Section</label>
                <select 
                  className={`p-3 border rounded-lg ${resetEffect ? "highlight" : ""}`}
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value={'9-E'}>9-E</option>
                  <option value={'9-F'}>9-F</option>
                </select>
              </div>
              <div className="py-2">
                <label>Contact Number</label>
                <Input 
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder='Ex. 03067203802'
                  className={resetEffect ? "highlight" : ""}
                />
              </div>
              <div className="py-2">
                <label>Address</label>
                <Input 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Ex. D 32, D-Block, Raja street'
                  className={resetEffect ? "highlight" : ""}
                />
              </div>
              <div className="flex gap-3 items-center justify-end mt-5">
                <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? <LoaderIcon className="animate-spin" /> : 'Save'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .highlight {
          animation: highlight-animation 1s ease;
        }
        
        @keyframes highlight-animation {
          0% { background-color: #fffbcc; }
          50% { background-color: #fff; }
          100% { background-color: #fff; }
        }
      `}</style>
    </div>
  );
};

export default AddNewStudent;
