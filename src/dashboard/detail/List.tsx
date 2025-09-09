import React, { useState } from "react";
import { Button, Avatar } from "@mui/material";
import AddStudent from "../AddStudent";
import DeleteStudent from "../DeleteStudent";
import { useGetStudentsQuery } from "../../redux/studentApi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
interface Student {
  id: number;
  name: string;
  email: string;
}

function List() {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [search, setSearch] = useState("");

    const { data: students = [], isLoading } = useGetStudentsQuery();

    const filteredStudents = students.filter((s) =>
        [s.name, s.email].some((field) =>
            field?.toLowerCase().includes(search.toLowerCase())
        )
    );

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteOpen = (student: Student) => {
        setSelectedStudent(student);
        setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
        setSelectedStudent(null);
        setDeleteOpen(false);
    };

    const handleRowClick = (studentId: number) => {
        navigate(`/students/${studentId}`);
    };

    return (
        <>
            <Header search={search} onSearchChange={setSearch} />
            <div className="list-content">
                <div className="list-header">
                    <div className="dashboard-logo-text">Students List</div>
                    <Button
                    variant="contained"
                    sx={{ width: "180px", background: "#feaf00", boxShadow: "none" }}
                    onClick={handleOpen}
                    >
                    ADD NEW STUDENT
                    </Button>
                </div>
                <div className="list-line"></div>
                <div className="list-table">
                    {isLoading ? (
                    <p>Loading...</p>
                    ) : (
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Enroll Number</th>
                            <th>Date of Admission</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} onClick={() => handleRowClick(student.id)} style={{ cursor: "pointer" }}>
                            <td>
                                <Avatar
                                src="image/profile.jpg"
                                alt="Profile"
                                sx={{
                                    width: 60,
                                    height: 60,
                                    objectFit: "cover",
                                    marginLeft: "12px",
                                    borderRadius: "8px",
                                }}
                                />
                            </td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>7305477760</td>
                            <td>1234567305477760</td>
                            <td>08-Dec, 2021</td>
                            <td className="crud">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handleDeleteOpen(student);
                                    }}
                                >
                                    <img src="image/edit.svg" alt="edit" />
                                </Button>
                            </td>
                            <td className="crud">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteOpen(student);
                                    }}
                                >
                                    <img src="image/delete.svg" alt="delete" />
                                </Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                </div>

                <AddStudent open={open} handleClose={handleClose} />

                {selectedStudent && (
                    <DeleteStudent
                    open={deleteOpen}
                    handleClose={handleDeleteClose}
                    student={selectedStudent}
                    />
                )}
            </div>
        </>
        
    );
}

export default List;
