import React from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios';
import { Redirect } from 'react-router'


class Login extends React.Component {

   state = {
      email: '',
      password: '',
      redirectURL: '/Login',
      redirect: false
   };

   handleemailChange = event => {this.setState({ email: event.target.value })}
   handlepasswordChange = event => {this.setState({ password: event.target.value })}
   handleredirectURLChange = event => {this.setState({ redirectURL: event.target.value })}

   handleSubmit = event => {
   event.preventDefault();

   Axios.post('http://localhost:3033/login',
         { email: this.state.email, password: this.state.password },)
         .then(() => this.setState({ redirect: true }))

   }

   
   
   render() {

      const { redirect } = this.state;

      if (redirect) {
         return <Redirect to='/Dashboard'/>;
      }

      return (
         
         <div>
            <div class="container mt-4">
                  <div class="jumbotron">
                     <h2 class="lead">Login</h2>
                  </div>
               <form onSubmit={this.handleSubmit}>
                     <div class="row">
                           <div class="form-group"><label for="email">Email address</label></div>
                           <div class="form-group"><input type="email" class="form-control" name="this.state.email" onChange={this.handleemailChange}/></div>
                     </div>
                     <div class="row">
                           <div class="form-group"><label for="password">Password</label></div>
                           <div class="form-group"><input type="password" class="form-control" name="this.state.password" onChange={this.handlepasswordChange}/></div>
                     </div>
                     <div class="row">
                     <button type="submit" class="btn btn-primary">Login</button>
                     </div>
               </form>
            
               
            </div>

            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                  crossorigin="anonymous"></script>
               <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
                  integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                  crossorigin="anonymous"></script>   
         </div>

      )
   }
}

export default Login;