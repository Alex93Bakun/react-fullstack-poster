import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/posts').then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((item) => {
                return (
                    <div
                        className="post"
                        key={item.id}
                        onClick={() => history.push(`/post/${item.id}`)}
                    >
                        <div className="title">{item.title}</div>
                        <div className="body">{item.postText}</div>
                        <div className="footer">{item.username}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
