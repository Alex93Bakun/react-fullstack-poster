import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {AuthContext} from './helpers/authContext';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

import './App.css';
import axios from 'axios';

const App = () => {
    const [authState, setAuthState] = useState({
        username: '',
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get('http://localhost:3001/auth/auth', {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({...authState, status: false});
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthState({username: '', id: 0, status: false});
    };

    return (
        <div className="App">
            <AuthContext.Provider value={{authState, setAuthState}}>
                <Router>
                    <div className="navbar">
                        <Link to="/">Home</Link>
                        <Link to="/create-post">Create A Post</Link>
                        {!authState.status ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/registration">Registration</Link>
                            </>
                        ) : (
                            <button onClick={logout}>Logout</button>
                        )}

                        <h1>{authState.username}</h1>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route
                            exact
                            path="/create-post"
                            component={CreatePost}
                        />
                        <Route exact path="/post/:id" component={Post}/>
                        <Route exact path="/login" component={Login}/>
                        <Route
                            exact
                            path="/registration"
                            component={Registration}
                        />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
