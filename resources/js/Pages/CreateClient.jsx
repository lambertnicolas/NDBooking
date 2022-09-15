import React from 'react';
import axios from 'axios';


const url = "https://api.ndbooking.software/api/client"

const CreateClient = () => {

    const [post, setPost] = React.useState<any>([]);

    React.useEffect(() => {
        axios.get(url)
        .then((response) => {
            setPost(response.data);
        });
    }, []);

    function createPost() {
        axios.post(url, {
                name: "Jackson",
                phone: "479959952",
                email: "m.jackson@gmail.com"
            })
            .then((response) => {
                setPost(response.data)
            })
    }
    //if (!post) return "No post!"

    return (
        <div>
            <button onClick={createPost} >Create post</button>
        </div>
    );
};

export default CreateClient;