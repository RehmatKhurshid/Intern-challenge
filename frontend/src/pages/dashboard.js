import React, { useState, useEffect, useContext } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardFooter,
    MDBCardHeader,
    MDBIcon,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentTexts, setCommentTexts] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/post');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleCommentTextChange = (postId, value) => {
        setCommentTexts({
            ...commentTexts,
            [postId]: value
        });
    };

    const handleCommentSubmit = async (postId) => {
        const commentText = commentTexts[postId];
        if (!commentText || commentText.trim() === '') {
            toast.warning('Please write a comment');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/createComment', {
                postId,
                content: commentText
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });

            const updatedPosts = posts.map(post =>
                post._id === postId ? { ...post, comment: [...post.comment, response.data] } : post
            );

            setPosts(updatedPosts);
            setCommentTexts({
                ...commentTexts,
                [postId]: ''
            });
            toast.success('Comment added successfully');
        } catch (err) {
            console.error('Error adding comment:', err);
            toast.error('Failed to add comment');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    return (
        <MDBContainer className="mt-5">
            <MDBRow className="gx-4 gy-4" style={{ paddingTop: '40px' }}>
                {posts.map((post) => (
                    <MDBCol key={post._id} md="4" className="mb-4">
                        <MDBCard className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
                            <MDBCardHeader className="d-flex align-items-center bg-light-grey py-2 px-3" style={{ backgroundColor: '#C0C0C0' }}>
                                <MDBIcon icon="user" className="me-2" />
                                <strong>{post.author?.firstName} {post.author?.lastName}</strong>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle className="mb-3">
                                    <strong>{post.title}</strong>
                                </MDBCardTitle>
                                <p className="card-text">{post.content}</p>
                                {post.comment && post.comment.length > 0 && (
                                    <div className="mt-4">
                                        <h5 className="mb-3">Comments:</h5>
                                        {post.comment.map((comment) => (
                                            <div key={comment._id} className="bg-comments rounded p-2 mb-2" style={{ backgroundColor: '#E5E4E2' }}>
                                                <MDBIcon icon="user" className="me-2" />
                                                <strong>{comment.author.firstName} {comment.author.lastName}</strong>
                                                <p className="mb-0">{comment.content}</p>
                                                <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {user && (
                                    <div className="mt-4">
                                        <MDBInput
                                            type="textarea"
                                            label="Add a comment"
                                            value={commentTexts[post._id] || ''}
                                            onChange={(e) => handleCommentTextChange(post._id, e.target.value)}
                                        />
                                        <MDBBtn
                                            color="primary"
                                            className="mt-2"
                                            onClick={() => handleCommentSubmit(post._id)}
                                        >
                                            Add Comment
                                        </MDBBtn>
                                    </div>
                                )}
                            </MDBCardBody>
                            <MDBCardFooter className="text-muted py-2 px-3">
                                <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
    );
};

export default Dashboard;
