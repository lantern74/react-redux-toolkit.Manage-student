import { TextField, Dialog, InputLabel, DialogContent, Button } from "@mui/material";
import { useState } from "react";
import { useAddStudentMutation } from "../redux/studentApi";

interface AddStudentProps {
  open: boolean;
  handleClose: () => void;
}

function AddStudent({ open, handleClose }: AddStudentProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [addStudent, { isLoading }] = useAddStudentMutation();

    const handleSave = async () => {
        if (!name || !email) return;

        await addStudent({
            id: Date.now(),
            name,
            email,
        });

        setName("");
        setEmail("");
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <div className="dialog">
                    <div className="sign-in-logo">
                        <div className="sign-in-logo-bar"></div>
                        <div className="sign-in-logo-text">Create a new Student</div>
                    </div>

                    <div className="sign-in-input marginTop">
                        <InputLabel>Email</InputLabel>
                        <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        size="small"
                        />
                    </div>

                    <div className="sign-in-input marginTop">
                        <InputLabel>Password</InputLabel>
                        <TextField
                        type="password"
                        fullWidth
                        size="small"
                        />
                    </div>

                    <div className="sign-in-input marginTop">
                        <InputLabel>Username</InputLabel>
                        <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        size="small"
                        />
                    </div>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="sign-in-button"
                    >
                        {isLoading ? "Saving..." : "SAVE"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddStudent;
