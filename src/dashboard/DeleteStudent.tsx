import { Dialog, DialogContent, Button, Typography } from "@mui/material";
import { useDeleteStudentMutation } from "../redux/studentApi";
interface DeleteStudentProps {
    open: boolean;
    handleClose: () => void;
    student: { id: number; name: string; email: string };
}

function DeleteStudent({ open, handleClose, student }: DeleteStudentProps) {
    const [deleteStudent, { isLoading }] = useDeleteStudentMutation();

    const handleDelete = async () => {
        try {
            await deleteStudent(student.id).unwrap();
            console.log("Deleted student:", student.id);
            handleClose();
        } catch (error) {
            console.error("Failed to delete student", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <div className="dialog">
                    <div className="sign-in-logo">
                        <div className="sign-in-logo-bar"></div>
                        <div className="sign-in-logo-text">Delete Student</div>
                    </div>

                    <div style={{textAlign:'center'}}>
                        <Typography variant="body2" sx={{ marginTop: 3 }}>
                            Are you sure you want to delete
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 7 }}>
                            <strong>{student.email}</strong> student?
                        </Typography>
                    </div>

                    <div style={{ display: "flex", justifyContent:'space-between'}}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isLoading}
                            sx={{ background: "#fff", boxShadow: "none", border:'none', color: '#feaf00' }}
                        >
                        Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            disabled={isLoading}
                            sx={{ background: "#feaf00", boxShadow: "none", border:'none', color: '#fff' }}
                        >
                        {isLoading ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteStudent;
