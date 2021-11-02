import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

import './App.css';

const App = () => {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/create-post">Create A Post</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-post" component={CreatePost} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/registration"
                        component={Registration}
                    />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
