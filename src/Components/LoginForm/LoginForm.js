import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import "./LoginForm.css";

class LoginForm extends Component{
  stete={
    userName:'',
    pass:''
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.pass.length > 0;
  }

  setUsername(name){
    this.setState({userName:name});
  }
  setPassword(pass){
    this.setState({pass:pass});
  }

  handleSubmit(event) {
      
    event.preventDefault();

    let headers = new Headers();
    headers.set( 'Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin',"*");
    fetch(new Request("http://localhost:8083/authenticate"),
      {
        headers:headers,
         method: 'POST', // or 'PUT'
         //mode:"no-cors",
         body: JSON.stringify({username:this.state.userName,password:this.state.pass}) // data can be `string` or {object}!

      }
         )
    .then((res)=>res.json())
    .then(data=>{
     
      
      console.log('Token is :::: '+data.token);
      localStorage.setItem("jwtToken","Bearer "+data.token);
      this.props.history.push("/desktop");

      //this.setState({
        // startMenuOption:data['start-menu-list'],
        // contextMenuOption:data['context-menu-list'],
        // desktopItems:data['desktop-items'],
        // desktopItemViews:data['desktop-item-views']
     // });
    }).catch(err =>{
      localStorage.removeItem("jwtToken");
      this.props.history.push("/");
    });
  }
  render(){
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="text"
             // value={this.state.userName == null?this.state.userName:''}
              onChange={e => this.setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              //value={this.state.pass?this.state.pass:''}
              onChange={e => this.setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" 
          //disabled={!this.validateForm()} 
          type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }

  
}
export default withRouter(LoginForm);
