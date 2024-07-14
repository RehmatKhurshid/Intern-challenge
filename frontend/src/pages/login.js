import React, { useContext, useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {AuthContext} from '../context/AuthContext'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const redirectToDashboard = () => {
        navigate('/userDashboard');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            toast.success('Logging successfully')
            redirectToDashboard();
        } catch (error) {
            toast.error('Error in logging in')
        }
    };

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <MDBCard style={{ maxWidth: '600px', width: '100%' }}>
                <MDBCardBody>
                    <h2 className="text-center mb-4">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' name='email' onChange={(e) => setEmail(e.target.value)} required />
                        <div className="mb-4 position-relative">
                            <MDBInput
                                type={showPassword ? 'text' : 'password'}
                                id='form3Example4'
                                label='Password'
                                name='password'
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                            <MDBIcon
                                icon={showPassword ? 'eye-slash' : 'eye'}
                                onClick={toggleShowPassword}
                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <MDBBtn type='submit' className='mb-4' block>
                            Sign In
                        </MDBBtn>
                        <div className='text-center'>
                            <p>
                                Not a member? <Link to='/register'>Register</Link>
                            </p>
                            <p>or sign up with:</p>
                            <MDBBtn floating color="secondary" className='mx-1'>
                                <MDBIcon fab icon='facebook-f' />
                            </MDBBtn>
                            <MDBBtn floating color="secondary" className='mx-1'>
                                <MDBIcon fab icon='google' />
                            </MDBBtn>
                            <MDBBtn floating color="secondary" className='mx-1'>
                                <MDBIcon fab icon='twitter' />
                            </MDBBtn>
                            <MDBBtn floating color="secondary" className='mx-1'>
                                <MDBIcon fab icon='github' />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;












