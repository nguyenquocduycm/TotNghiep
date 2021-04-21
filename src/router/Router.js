import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from "../Component/Login/Login";
import Signup from "../Component/Login/Signup";
import Student from "../Component/Mainpage/Student/Student";
import Message from "../Component/Mainpage/Student/Message/Message";
import Profile from '../Component/Mainpage/Student/Setting/EditProfile/Profile';


class RouterMD extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/home">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul> */}

                    <Switch>
                        <Route path="/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/home">
                            <Student />
                        </Route>
                        <Route path="/message">
                            <Message />
                        </Route>
                        <Route path="/" render={() => {
                            return localStorage.getItem("token") ? <Student />:<Login />
                        }}>
                            {/* <Login /> */}
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterMD;