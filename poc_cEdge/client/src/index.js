import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
//import { BrowserRouter } from "react-router-dom";

import Login from './components/login'
import Register from './components/register'
import addService from './components/addservice'
import Dashboard from './components/dashboard'
import Notfound from './components/notfound'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



const routing = ( 
    <Router>
        <div>
            <nav>
                <h4>cEdge</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li ><Link to={"/login"} className="nav-link">Login</Link></li>
                    <li ><Link to={"/register"} className="nav-link">Register</Link></li>
                    {/*
                    <li ><Link to={"/addservice"} className="nav-link">Add a Service</Link></li>
                    <li ><Link to={"/dashboard"} className="nav-link">Dashoard</Link></li>
                    */}
                </ul>
            </nav> 

            <div className="container mt-3">
                
                <Switch>
                    <Route exact path = "/" component = {App}/>
                    <Route  path="/login" component={Login} />
                    <Route  path="/register" component={Register} />
                    <Route  path="/addservice" component={addService} />
                    <Route  path="/dashboard" component={Dashboard} />
                    <Route component={Notfound} />
                </Switch>
            </div>
    
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                crossorigin="anonymous"></script>
    
        </div>
        </Router>
    )
    ReactDOM.render(routing, document.getElementById('root'))

//ReactDOM.render(
 // <React.StrictMode>
  //  <App/>
  //</React.StrictMode>,
  //document.getElementById('root')
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
