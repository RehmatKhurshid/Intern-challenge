import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                toast.error('Error fetching user profile');
            }
        };
        fetchUserProfile();
    }, []);

    if (!user) {
        return (
            <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div>Loading...</div>
            </MDBContainer>
        );
    }

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <MDBCard style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <MDBCardBody>
                    <MDBCardTitle className="text-center mb-4">User Profile</MDBCardTitle>
                    <div className="text-center mb-4">
                        <MDBIcon icon="user-circle" size="5x" className="text-muted" />
                    </div>
                    <MDBCardText>
                        <strong>Name:</strong> {user?.firstName} {user?.lastName}
                    </MDBCardText>
                    <MDBCardText>
                        <strong>Email:</strong> {user?.email}
                    </MDBCardText>
                    <MDBCardText>
                        <strong>Score:</strong> {user?.score}
                    </MDBCardText>
                    <MDBCardText className="mt-3">
                        <em>"For adding a post, you will get 10 points. For commenting on someone's post, you will get 5 points."</em>
                    </MDBCardText>
                    <div className="d-flex justify-content-center mt-4">
                        <MDBBtn className='m-1' style={{ backgroundColor: '#3b5998' }}>
                            <MDBIcon fab icon="facebook-f" />
                        </MDBBtn>
                        <MDBBtn className='m-1' style={{ backgroundColor: '#ac2bac' }}>
                            <MDBIcon fab icon="instagram" />
                        </MDBBtn>
                        <MDBBtn className='m-1' style={{ backgroundColor: '#0082ca' }}>
                            <MDBIcon fab icon="linkedin-in" />
                        </MDBBtn>
                        <MDBBtn className='m-1' style={{ backgroundColor: '#333333' }}>
                            <MDBIcon fab icon="github" />
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Profile;
