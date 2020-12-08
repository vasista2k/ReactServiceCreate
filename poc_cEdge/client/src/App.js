import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
    render(){
        return(
            <div class="container mt-4">
                <div class="jumbotron">
                    <h1 class="display-4">Welcome to cEdge Project</h1>
                    <p class="lead">This is a simple cEdge POC project</p>
                </div>
            </div>
        )
    }
}

export default App;