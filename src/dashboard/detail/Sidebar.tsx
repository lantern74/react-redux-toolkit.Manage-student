import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

import profile from '../../../public/image/profile.jpg';
import university from '../../../public/image/university.svg';
import logout from '../../../public/image/logout.svg';

function Sidebar() {
    const navigate = useNavigate();

    const removeToken = () => {
        localStorage.removeItem('authToken'); 
        navigate('/signin'); 
    };

    return (
        <div className='sidebar-content'>
            <div className='dashboard-logo'>
                    <div className='dashboard-logo-bar'></div>
                    <div className='dashboard-logo-text'>CRUD OPERATIONS</div>
            </div>
            <div className='sidebar-profile'>
                <Avatar 
                    src={profile}
                    alt="Profile"
                    sx={{
                        width: 100,   // Set the width of the circle
                        height: 100,  // Set the height of the circle (same as width for perfect circle)
                        objectFit: 'cover', 
                        margin: 'auto'
                    }}
                />
                <Typography sx={{fontWeight: '700', fontSize: '17px', marginTop: '20px'}}>Karthi Madesh</Typography> 
                <Typography sx={{fontSize: '14px', color: '#feaf00', marginTop: '8px'}}>Admin</Typography> 
            </div>
            <div className='sidebar-navlink'>
                <Button variant="contained" className='sign-in-button' sx={{color: 'black', textAlign:'center', gap:"10px", textTransform: 'none'}}>
                    <div>
                        <Avatar 
                            src={university}
                            alt="university"
                            sx={{
                                width: '20px',
                                height: '14px',
                                margin: 'auto'
                            }}
                        />
                    </div>
                    <Typography variant="body2">Students</Typography>
                </Button>
                <Button onClick={removeToken} className='sidebar-logout' sx={{textTransform: 'none'}}>
                    <Typography variant="body2" sx={{ color: 'black' }}>Logout</Typography>
                    <img src={logout} alt="logout" />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar;