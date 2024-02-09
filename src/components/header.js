import React from "react";
import "../styles/filter.css";
import Modal from 'react-modal';
import {withRouter} from "react-router-dom"
import App from "../App";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

class Header extends React.Component {
    constructor(){
        super();
        this.state={
            backgroundColor:"",
            display:"none",
            logInModalIsOpen:false,
            SignupModalIsOpen:false,
            isLoggedIn:false,
            loggedInUser:undefined,
            username : undefined
        }
    }

        componentDidMount(){
            const path=this.props.history.location.pathname;
            this.setAttributes(path);
            let username = sessionStorage.getItem("username");
            if(username) this.setState({isLoggedIn:true});
            console.log(username);
            this.setState({username : username});
            
           
    }
    setAttributes=(path)=>{
        let bg, display;
        if(path == "/"){
            bg='black';
            display="none"
        }
        else{   
            bg="#ec4d4d";
            display="inline-block";
       
        }
        this.setState({backgroundColor:bg,display:display});
       
    }
    handleLogin=()=>{
        this.setState({logInModalIsOpen:true}); 
        if(sessionStorage.getItem("username"))
            this.handleCancel();
       
    }
    handleSignup=()=>{
        this.setState({SignupModalIsOpen:true})
    }
    handleSignupCancel=()=>{
        this.setState({SignupModalIsOpen:false}) 
    }
    handleCancel=()=>{
        this.setState({logInModalIsOpen:false}) 
        window.location.reload();
    }
    handleLogout=()=>{
        this.setState({isLoggedIn:false, username:undefined})
        sessionStorage.clear();
    
    }
    handleHomepage=()=>{
        this.props.history.push("/")
        window.location.reload();
    }
    


  render() {
    
    const {backgroundColor,display,logInModalIsOpen,SignupModalIsOpen,isLoggedIn,username} = this.state;
    return (
    <div> 

        <div className="head" style={{backgroundColor:backgroundColor}}>
        <div className="logoF" style={{display:display}} onClick={this.handleHomepage}> ei</div>
       { isLoggedIn ?
     
        <div className="buttons">
                <div className="button1" >{username}</div>
            <div className="button2" onClick={this.handleLogout}> Log out</div>
            </div> 
            :
            <div className="buttons">
            <div className="button1" onClick={this.handleLogin}> Login</div>
            <div className="button2" onClick={this.handleSignup}> Create an acount</div>
        
        </div>}
  
         </div>
         <Modal
           isOpen={logInModalIsOpen}
           style={customStyles}
           >
           <div className="signinmodal">
           <h2>Log In</h2> 
            <br />
            <input type="text" placeholder="Email"/>
            <br />
            <input type="text" placeholder="Password"/>
            <br />
            <div>
                <button style={{backgroundColor:"blue",color:"white",marginRight:70}} >Login</button>
                <button onClick={this.handleCancel}>cancel</button>
            </div>
            <br />
            <div>
               <button style={{backgroundColor:"transparent"}} >Continue with facebook</button>
               <br  />
               {/* <button style={{backgroundColor:"transparent"}} >Continue with google</button> */}
                <App/>
            </div>
           </div>
         </Modal>
         <Modal
           isOpen={SignupModalIsOpen}
           style={customStyles}
           >
           <div>
           <div className="account-container">
      <h2>Create an Account</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
            {/* <h2>Sign Up</h2> 
            <br  />
            Name: <input className="signUpmodal" type="text" />
            <br />
            Last Name: <input className="signUpmodal" type="text" />
            <br />
            Contact No: <input className="signUpmodal" type="text" />
            <br />
            Email: <input className="signUpmodal" type="text" />
            <br />
            Password: <input className="signUpmodal" type="text" /> */}
            <div>
                <button style={{backgroundColor:"blue",color:"white",marginRight:70}} >Sign Up</button>
                <button onClick={this.handleSignupCancel}>cancel</button>
            </div>
            <br />
          
           </div>
         </Modal>
    </div>
    )
  }
}
export default withRouter (Header);
