import { useState, useEffect } from "react";
import { TextField, Dialog, InputLabel, DialogContent, Button } from "@mui/material";
import { useUpdateStudentMutation } from "../redux/studentApi";

interface EditStudentProps {
    open: boolean;
    handleClose: () => void;
    student: Student | null;
}

interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  enrollNumber?: string;
  dateOfAdmission?: string;
}

function EditStudent({ open, handleClose, student }: EditStudentProps) {
    const [formData, setFormData] = useState<Student | null>(student);
    const [updateStudent, { isLoading }] = useUpdateStudentMutation();

    useEffect(() => {
        setFormData(student); // reset form when a new student is selected
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!formData) return;
        try {
            await updateStudent(formData).unwrap();
            handleClose();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    if (!formData) return null;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <div className="dialog">
                    <div className="sign-in-logo">
                        <div className="sign-in-logo-bar"></div>
                        <div className="sign-in-logo-text">Edit a Student</div>
                    </div>

                    <div className="sign-in-input marginTop">
                        <InputLabel>Email</InputLabel>
                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                    </div>

                    <div className="sign-in-input marginTop">
                        <InputLabel>Username</InputLabel>
                        <TextField
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                    </div>

                    <Button
                        variant="contained"
                        className="sign-in-button"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "SAVE"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditStudent;
