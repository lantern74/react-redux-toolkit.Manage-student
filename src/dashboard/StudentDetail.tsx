import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStudentsQuery } from "../redux/studentApi";
import { Typography } from "@mui/material";

import Sidebar from "./detail/Sidebar";
import DetailHeader from "./detail/DetailHeader";
import DetailCard from "./detail/DetailCard";

import detailId from '../../public/image/detailId.svg';
import detailEmail from '../../public/image/detailEmail.svg';
import detailName from '../../public/image/detailName.svg';

import { IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function StudentDetail() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    const { id } = useParams<{ id: string }>();
    const { data: students = [] } = useGetStudentsQuery();

    const student = students.find((s) => s.id === Number(id));

    if (!student) {
        return <Typography variant="h6">Student not found</Typography>;
    }

    return (
        <div className='dashboard-content'>
            {/* Sidebar (desktop only) */}
            {!isMobile && <Sidebar />}

            {/* Mobile menu button */}
            {isMobile && (
                <>
                <IconButton
                    onClick={() => setDrawerOpen(true)}
                    sx={{ position: "absolute", top: 10, left: 10 }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <Sidebar />
                </Drawer>
                </>
            )}

            <div style={{width:'100%'}}>
                <DetailHeader />
                <div className="detail-card">
                    <DetailCard
                        title="ID"
                        value={student.id}
                        icon={detailId}
                        bgColor1="#f0f9ff"
                        bgColor2="#f0f9ff"
                    />
                    <DetailCard
                        title="EMAIL"
                        value={student.email}
                        icon={detailEmail}
                        bgColor1="#fef6fb"
                        bgColor2="#fef6fb"
                    />
                    <DetailCard
                        title="USERNAME"
                        value={student.name}
                        icon={detailName}
                        bgColor1="#feaf00"
                        bgColor2="#f8d442"
                    />
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
