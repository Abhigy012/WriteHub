import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { postsAPI } from "../services/api.js";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                setLoading(true);
                try {
                    const postData = await postsAPI.getPost(id);
                    setPost(postData);
                } catch (error) {
                    console.error("Error fetching post:", error);
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            } else {
                navigate('/');
            }
        };

        fetchPost();
    }, [id, navigate])

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex items-center justify-center min-h-96">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost