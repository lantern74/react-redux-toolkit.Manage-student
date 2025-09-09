import { useState } from "react";
import Sidebar from "./detail/Sidebar";
import List from "./detail/List";
import { IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function Dashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <div className="dashboard-content" style={{ display: "flex" }}>
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

            {/* Main content */}
            <div style={{ width: "100%" }}>
                <List />
            </div>
        </div>
    );
}

export default Dashboard;
