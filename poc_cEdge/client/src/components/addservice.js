import React from 'react'
import '../App.css';
import Axios from 'axios';
import FileUpload from './upload';


class addService extends React.Component {

    constructor(){
        super();
        this.state = {
            toggle:true
        }
    }

    state = {
        port: '',
        serviceCrt: '',
        serviceKey: '',
        //appbin: '',
        serviceName: '',
        saveGet: '',
        saveSet: '',
        // Initially, no file is selected 
        selectedFile: null
    };

    handleportChange = event => {this.setState({ port: event.target.value })}
    handleserviceCrtChange = event => {this.setState({ serviceCrt: event.target.value })}
    handleserviceKeyChange = event => {this.setState({ serviceKey: event.target.value })}
    //handleappbinChange = event => {this.setState({ appbin: event.target.value })}
    handleserviceNameChange = event => {this.setState({ serviceName: event.target.value })}
    handlesaveGetChange = event => {this.setState({ saveGet: event.target.value })}
    handlesaveSetChange = event => {this.setState({ saveSet: event.target.value })}


    handleSubmit = event => {
    event.preventDefault();

    Axios.post('http://localhost:3033/newService',
        { port: this.state.port, serviceCrt: this.state.serviceCrt, serviceKey: this.state.serviceKey, serviceName: this.state.serviceName, saveGet: this.state.saveGet,  saveSet: this.state.saveSet  },)
        .then(res => {
            console.log(res);
            console.log(res.data);

            if (res.data==="success"){
            alert(this.state.serviceName + " service added");
            }
            else {
                alert("Cannot add service !!! " + res.data);
            }
            
        })
    }

/*    
    // On file select (from the pop up) 
    onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
    }; 
    
    // On file upload (click the upload button) 
    onFileUpload = () => { 
        console.log(this.state.selectedFile.name); 
        // Create an object of formData 
        const formData = new FormData(); 

        // Update the formData object 
        formData.append( 
            "myFile", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
        ); 
    
        // Details of the uploaded file 
        console.log(formData); 
        console.log(formData.getAll('myFile'));
        var options = { content: formData };
        console.log("vas:"+ options);

        // Request made to the backend api 
        // Send formData object 
        Axios.post("http://localhost:3033/uploadfile", options)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        
    }; 
*/
    render() {
        
        return(
        
    
        <div>
        
        
            <div class="container mt-4">
                <div class="jumbotron">
                    <h2 class="lead">Add Services</h2>
                </div>
            <form onSubmit={this.handleSubmit}>
            <div class="row">
                <div class="form-group "><label >Port to be opened</label></div>
                <div class="form-group "><input type="number" name="this.state.port" onChange={this.handleportChange}></input>
                </div>
            </div>

            <div class="row">
                <div>
                <button onClick={()=>{this.setState({toggle:!this.state.toggle})}} >Add Certificates</button>
                    {
                    this.state.toggle ? <div>
                        <br></br>
                            <div class="row">
                                <div class="form-group "> <label >Add cert file</label></div>
                                <div class="form-group "><input type="text" name="this.state.serviceCrt" onChange={this.handleserviceCrtChange}/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group "><label>Add key file</label></div>
                                <div class="form-group "> <input type="text" name="this.state.serviceKey" onChange={this.handleserviceKeyChange}></input>
                                </div>
                            </div>
                    </div> : null
                    }
                    
                </div>
            </div>
            <br></br>

            <div class="row">
                <div class="form-group "><label >Service Name</label></div>
                <div class="form-group ">
                    <input type="text" name="this.state.serviceName" onChange={this.handleserviceNameChange}></input>
                </div>
            </div>

            <div class="row">
                <div class="form-group "><label >GET</label></div>
                <div class="form-group ">
                    <input type="text" name="this.state.saveGet" onChange={this.handlesaveGetChange}></input>
                </div>
            </div>
            <div class="row">
                <div class="form-group "><label>SET</label></div>
                <div class="form-group ">
                    <input type="text" name="this.state.saveSet" onChange={this.handlesaveSetChange}></input>
                </div>
            </div>

            <br></br>
            
            <div>
                <button  class="btn btn-primary" type="submit" >Add Service</button>
            </div>
        </form>
        </div>
        
        <div row>
            <FileUpload />
        </div >
            
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                crossorigin="anonymous"></script>
        </div>
        )
    }
    }



    //class addService extends React.Component {
       // render() {

  //);
export default addService;
