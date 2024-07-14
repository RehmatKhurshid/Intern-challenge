import React, { useEffect, useState, useContext } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'

export default function App() {
    const {user, logout} = useContext(AuthContext)
    const [openNavColor, setOpenNavColor] = useState(false);

    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/userDashboard');
    };
    const handleCreatePost = () => {
        navigate('/createPost');
    };
    const handleprofie = () => {
        navigate('/profile');
    };

    const handleSignIn = () => {
        navigate('/register');
    }

    const handleSignOut = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const handleHome = () => {
        navigate('/');
    }
    return (
        <>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#ADD8E6' } } fixed='top'>
                <MDBContainer fluid>
                    <MDBNavbarBrand >
                        <Link to='/' > Vunder kids </Link>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavColor(!openNavColor)}
                        className='ms-auto'
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <div>
                        <MDBCollapse open={openNavColor} navbar className='ms-auto'>
                            <MDBNavbarNav className='ms-lg-0 me-auto'>
                                <MDBNavbarItem className='active'>
                                    <MDBBtn color='primary' className='m-1' onClick={handleHome}>
                                        Home
                                        {/* <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Home</Link> */}
                                    </MDBBtn>
                                </MDBNavbarItem>

                                {user ? (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBBtn color='secondary' className='m-1' onClick={handleprofie}>View Profile</MDBBtn>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBBtn color='success' className='m-1' onClick={handleCreatePost}>Create Post</MDBBtn>
                                        </MDBNavbarItem>
                                        
                                        <MDBNavbarItem>
                                            <MDBBtn color='info' className='m-1' onClick={handleDashboard}>Dashboard</MDBBtn>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBBtn color='danger' className='m-1' onClick={handleLogout}>Logout</MDBBtn>
                                        </MDBNavbarItem>
                                    </>

                                ) : (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBBtn color='success' className='m-1' onClick={handleSignIn}>Sign Up
                                                {/* <Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link> */}
                                            </MDBBtn>
                                        </MDBNavbarItem>

                                        <MDBNavbarItem>
                                            <MDBBtn color='info' className='m-1' onClick={handleSignOut}>Sign In
                                                {/* <Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>Sign In</Link> */}
                                            </MDBBtn>
                                        </MDBNavbarItem>
                                    </>
                                )}
                                {/* <MDBNavbarItem>
                                    <MDBBtn color='warning' className='m-1'>
                                        <Link to='#' style={{ color: 'white', textDecoration: 'none' }}>About</Link>
                                    </MDBBtn>
                                </MDBNavbarItem> */}

                            </MDBNavbarNav>
                        </MDBCollapse>
                    </div>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}


