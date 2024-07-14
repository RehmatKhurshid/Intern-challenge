import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
    MDBCardFooter,
    MDBCardHeader,
    MDBInput
} from 'mdb-react-ui-kit';

const UserDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentTexts, setCommentTexts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('/api/user/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
        if (!commentText.trim()) {
            toast.warning('Please write a comment');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Assuming your token is stored in localStorage
            const response = await axios.post('/api/createComment', {
                postId,
                content: commentText
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });

            // Update the local state to include the new comment
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
        <MDBContainer className="mt-5" style={{ marginTop: '80px' }}>
            <MDBRow style={{ paddingTop: '40px' }}>
                {posts.map((post) => (
                    <MDBCol key={post._id} md="4" className="mb-4">
                        <MDBCard className="h-100">
                            <MDBCardHeader style={{ backgroundColor: '#C0C0C0' }}>
                                <MDBIcon icon="user" className="me-2" />
                                {post.author?.firstName} {post.author?.lastName}
                            </MDBCardHeader>
                            <MDBCardBody>
                                <h5>Content:</h5> {post.content}
                                {post.comment && post.comment.length > 0 && (
                                    <div>
                                        <h5>Comments:</h5>
                                        {post.comment.map((comment) => (
                                            <MDBCard key={comment._id} className="mb-3" style={{ backgroundColor: '#E5E4E2' }}>
                                                <MDBCardBody>
                                                    <MDBIcon icon="user" className="me-2" />
                                                    {comment.author.firstName} {comment.author.lastName}
                                                    <div className="mt-2">Comment: {comment.content}</div>
                                                </MDBCardBody>
                                                <MDBCardFooter className="text-muted">
                                                    Posted on: {(comment.createdAt).toLocaleString()}
                                                </MDBCardFooter>
                                            </MDBCard>
                                        ))}
                                    </div>
                                )}
                                <MDBInput
                                    type="textarea"
                                    label="Add a comment"
                                    value={commentTexts[post._id] || ''} // Use specific comment text for the post
                                    onChange={(e) => handleCommentTextChange(post._id, e.target.value)}
                                />
                                <MDBBtn
                                    color="primary"
                                    className="mt-2"
                                    onClick={() => handleCommentSubmit(post._id)}
                                >
                                    Add Comment
                                </MDBBtn>
                            </MDBCardBody>
                            <MDBCardFooter className="text-muted">
                                Posted on: {(post.createdAt).toLocaleString()}
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
    );
};

export default UserDashboard;
