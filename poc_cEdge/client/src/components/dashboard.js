import React from 'react'
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


//import { fetch as fetchPolyfill } from 'whatwg-fetch'
//global.fetch = fetchPolyfill
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;



class Dashboard extends React.Component {

    
    state = {
        data: [],
        loading: true,
        error: false,
        dataCloud: [], 
        loadingCloud: true,
        errorCloud: false,
        dataCloudAvailable: [], 
        dataServiceAvailable: [], 
        service: [],
        cloud: '',
        serviceCloud: [],
    };

    // for adding service adn cloud 
    /*handleserviceChange = event => {
        let target = event.target
        let name = target.name
        let value = Array.from(target.selectedOptions, option => option.value);
        this.setState({ [name]: value });
    }
    */
    handleserviceChange = event => {this.setState({ service: event.target.value })}
    handlecloudChange = event => {this.setState({ cloud: event.target.value })}

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.cloud);
        console.log(this.state.service);

        axios.post('http://localhost:3033/serviceCloud',
            { service: this.state.service, cloud: this.state.cloud },)
                .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data==="success"){
                    alert(this.state.service + " on "+this.state.cloud+" got added");
                    }
                    else {
                        alert("Cannot add service !!! " + res.data);
                    }
            })
    }

    //all get APIs during loadig the page
    componentDidMount() {

        axios.get('http://localhost:3033/servicesRunning')        
        .then(res => {
            const data = res.data.length; // get the data array instead of object
                this.setState({ data, loading: false });
                })
                .catch(err => { // log request error and prevent access to undefined state
                    this.setState({ loading: false, error: true });
                    console.error(err); 
            })

        fetch('http://localhost:3033/servicesCloudRunning')
        
        .then(res => res.json())
            .then(result => {
                this.setState({
                  //  isServiceLoaded: true,
                    serviceCloud: result,
                    //data: result.length,
                    //loading: false
                });
                console.log(this.state.serviceCloud);
                console.log(this.state.serviceCloud.length)
        })

        axios.get('http://localhost:3033/cloudRunning')
            .then(res => {
               // console.log("vasi2 data: "+res.data);
                const dataCloud = res.data.length; // get the data array instead of object
                this.setState({ dataCloud, loadingCloud: false });
               // console.log(dataCloud);
            })
            .catch(err => { // log request error and prevent access to undefined state
                this.setState({ loadingCloud: false, errorCloud: true });
                console.error(err); 
        })

        fetch('http://localhost:3033/servicesAvailable')
            .then(res => res.json())
            .then(result => {
                this.setState({
                  //  isServiceLoaded: true,
                    dataServiceAvailable: result
                });
                console.log(this.state.dataServiceAvailable);
            });
        

            fetch('http://localhost:3033/cloudAvailable')
            .then(res => res.json())
            .then(result => {
                this.setState({
                  //  isServiceLoaded: true,
                    dataCloudAvailable: result
                });
                console.log(this.state.dataCloudAvailable);
            });
        
        /*

        axios.get('http://localhost:3033/cloudAvailable')
            .then(res => {
                const dataCloudAvailable = res.data; // get the data array instead of object
                this.setState({ dataCloudAvailable, loadingCloudAvailable: false });
                console.log(dataCloudAvailable);
            })
            .catch(err => { // log request error and prevent access to undefined state
                this.setState({ loadingCloudAvailable: false, errorCloudAvailable: true });
                console.error(err); 
        })
        */
    }

    
    
    render() {
        


        if (this.state.loading) {
            return(
                <div>
                    <p> Loading running services data ... </p>
                </div>
            )
        }

        if (this.state.loadingCloud) {
            return(
                <div>
                    <p> Loading running cloud data ... </p>
                </div>
            )
        }

        //        if (this.state.error || !this.state.data[0]) { // if request failed or data is empty don't try to access it either
        if (this.state.error) { // if request failed or data is empty don't try to access it either
            return(
                <div>
                    <p> An error occured for ... </p>
                </div>
            )
        }

        const serviceCloud = this.state.serviceCloud;
        const tableCloumn = {
        width: '150px'
        };

        const  dataServiceAvailable  = this.state.dataServiceAvailable;
        /*//console.log("vas"+dataServiceAvailable);
        //const listServices = dataServiceAvailable.map((d) => <div class="row"><select class="form-control" name="service" multiple={true} onChange={this.handleserviceChange}  value={this.state.service} >
          //      <ul class="list-group"><li class="list-bullet" key={d.anyId}>{d.serviceName}</li></ul></select></div>);
        */
        //const listServices = dataServiceAvailable.map((d) => <div class="row"><ul class="list-group"><li class="list-bullet" key={d.anyId1}>{d.serviceName}</li></ul></div>);
        let listServices = dataServiceAvailable.length > 0
                && dataServiceAvailable.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.serviceName}</option>
                )
                }, this);

        //const  dataCloudAvailable  = this.state.dataCloudAvailable;
        //const listCloud = dataCloudAvailable.map((d) => <div class="row"><ul class="list-group"><li class="list-bullet" key={d.anyId2}>{d.cloudName}</li></ul></div>);
        const dataCloudAvailable = this.state.dataCloudAvailable;
        let listCloud = dataCloudAvailable.length > 0
                && dataCloudAvailable.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.cloudName}</option>
                )
                }, this);

        
        //const serviceCloudLIST = serviceCloud.map(home => <div>{home.service}</div>);
       // const serviceCloudLIST = serviceCloud.map((d) => <table><tbody><tr>
         //   <td style={tableCloumn}><ul class="list-group"><li class="list-bullet" key={d.anyId3}>{d.service}</li></ul>
          //  </td><td style={tableCloumn}><ul class="list-group"><li class="list-bullet" key={d.anyId4}>{d.cloud}</li></ul></td></tr></tbody></table>);


       // const isServiceLoaded = this.state.isServiceLoaded;
        /* if (!isServiceLoaded) {
        return <div>Loading available service ... </div>;
    } else {
        */
        return (

        <div>
            <div class="container mt-4">
                <div class="jumbotron">
                    <h1 class="lead">Dashboard</h1>
                </div>
            <form action="">
                <div class="flex-container">
                    <div class="flex-child left">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Services already running</h4>
                                <span class="badge badge-primary">{this.state.data}</span>
                        </div>
                    </div>
                    <div class="flex-child left">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Cloud on running</h4>
                                <span class="badge badge-primary">{this.state.dataCloud}</span>
                        </div>
                    </div>
                </div>
                {// services running in each cloud
                }
                <div class="flex-container">
                    <div class="flex-child left">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Services in each Cloud running</h4>
                                <br></br>
                                <div>
                                <table><tbody><tr><th style={tableCloumn}>Service</th><th class="tableCloumn">Cloud</th></tr>
                                </tbody></table>
                                
                                    {serviceCloud.map((d) => <table><tbody><tr>
                                        <td style={tableCloumn}><ul class="list-group"><li class="list-bullet" key={d.anyId3}>{d.service}</li></ul>
                                        </td><td style={tableCloumn}><ul class="list-group"><li class="list-bullet" key={d.anyId4}>{d.cloud}</li></ul></td></tr></tbody></table>)
                                    }
                                </div>
                        
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={this.handleSubmit}>
                <div class="flex-container">
                    <div class="flex-child">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Select Application service</h4>
                                <div >
                                    
                                    <select class="form-control" name="this.state.service" onChange={this.handleserviceChange}>
                                        {listServices}
                                    </select>
                                </div>
                        </div>
                    </div>                    

                    <div class="flex-child">
                    <div class=".flex-column">
                        <h4 class="duallistheader">Select cloud service</h4>
                            <div >
                                
                                <select class="form-control" name="this.state.cloud" onChange={this.handlecloudChange}>
                                    {listCloud}
                                </select>
                            </div>
                    </div>
                    </div>                    
                {
                    /*                        
                    <div class="flex-child">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Services available</h4>
                            <div >
                                {listServices}
                            </div>
                            </div>
                        </div>
                        
                        
                        <div class="flex-child">
                        <div class=".flex-column">
                            <h4 class="duallistheader"> Selected Services </h4>
                                <div >
                                    <select class="form-control" name="service" multiple={true} onChange={this.handleserviceChange}  value={this.state.service} >
                                        <option>PING</option>
                                        <option>VPN</option>
                                        <option>IPv6</option>
                                    </select>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div>
                        <a href="/addService" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Add
                            Service</a>
                    </div>
                    <div class="flex-container">
                        <div class="flex-child">
                        <div class=".flex-column">
                            <h4 class="duallistheader">Cloud services available</h4>
                            <div >
                                {listCloud}
                            </div>
                            </div>
                        </div>
                        
                        
                    
                    */
                }  
                </div>                 
                <div class="flex-container">
                    <div> 
                            <button type="submit" class="btn btn-primary btn-sm">Save</button>
                    </div>
                    <div>
                    <a href="/addService" class="btnright">Add Service</a>
                    </div>
                </div>
        
        </form>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                    crossorigin="anonymous"></script>
            </div>
        </div>
        )
    //}
}
}
    export default Dashboard;