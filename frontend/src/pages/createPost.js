import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.post('/api/post', { content }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Post created sucessfully');
            navigate('/userDashboard');

        } catch (error) {
            toast.error('error creating post');
        }
    };

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <MDBCard style={{ maxWidth: '400px', width: '90%' ,height: '40%'}}>
                <MDBCardBody>
                    <h2 className="text-center mb-4">Create a New Post</h2>
                    <form onSubmit={handleSubmit}>
                        <MDBInput
                            type='textarea'
                            label='Content'
                            id='content'
                            name='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)} required
                        />
                        <MDBBtn type='submit' className='mt-4' block>
                            Create Post
                        </MDBBtn>
                    </form>

                </MDBCardBody>
            </MDBCard>

        </MDBContainer>


    );
};

export default CreatePostForm;
