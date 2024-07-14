import React, { useState, useEffect, useContext } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext'

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useContext(AuthContext)

    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(firstName, lastName, email, password);

            toast.success('Signup successful');

            navigate('/login');

        } catch (error) {
            toast.error('Signup failed');
        }
    };

    return (
        <>
            <MDBContainer className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '100vh' }}>
                <MDBCard style={{ maxWidth: '600px', width: '100%' }}>
                    <MDBCardBody>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBRow className='mb-4'>
                                <MDBCol>
                                    <MDBInput id='form3Example1' label='First name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput id='form3Example2' label='Last name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </MDBCol>
                            </MDBRow>
                            <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div className="mb-4 position-relative">
                                <MDBInput
                                    type={showPassword ? 'text' : 'password'}
                                    id='form3Example4'
                                    label='Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <MDBIcon
                                    icon={showPassword ? 'eye-slash' : 'eye'}
                                    onClick={toggleShowPassword}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <MDBBtn type='submit' value='SignUp' className='mb-4' block>
                                Sign Up
                            </MDBBtn>
                            <div className='text-center'>
                                <p>
                                    Already signed up? <Link to='/login'>Login</Link>
                                </p>
                            </div>
                            <div className='text-center'>
                                <p>sign up with:</p>
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


        </>
    );
};

export default SignUp;
