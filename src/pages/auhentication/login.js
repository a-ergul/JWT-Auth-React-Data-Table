import React, {useState, Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {useHistory, Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import axiox from "axios";
import "./login.css";
import {Modal} from './components/Modal';

import Navbar from "./components/Navbar";

//texts const

const titleForm= "Giriş Yapınız";
const titleButton= "Giriş Yap";
const usernameLabel= "Email Adresi";
const passwordLabel= "Şifre";

//style const
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *" : {
        margin: theme.spacing(3),
        width: "50ch",
        },
         },
    multilineColor:{
      color:'white'
  },
  
}));

const LoginPage = () => {
    
    //modal const
    const[show, setShow] = useState(false);
    const closeModalHandler =() => setShow(false);
    
    const classes = useStyles();
    
    //const set login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    let history = useHistory();

    const login = (e) => {
        e.preventDefault();
        axiox.post("http://localhost:2000/api/login", {
            email,
            password
        }).then((response) => {
            console.log("response", response)
            localStorage.setItem("login", JSON.stringify({
                userLogin: true,
                token: response.data.access_token,
            }));
            setError("");
            setEmail("");
            setPassword("");
            history.push("schools");
        })
        .catch((error) => setError(error.response.data.message));
        
    };

   return (
      
        <div style={{}}>
            <Navbar/>
        <div className="form-wrapper">
       <div className='loginform'>
             <h2 className="title" >{titleForm}</h2>
            {error && <p style={{color: "#ff6e63"}}>{error}</p>}
            <form className={classes.root}  noValidate autoComplete="off" onSubmit={login}>
                <TextField 
                className="usernameInput" 
                color= "primary"
                id="username" 
                label={usernameLabel}
                multiline          
                InputProps = {{
                    classes: {
                    input: classes.multilineColor
                     }
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)

                 }
                type="text"
                />
                <br />
                <TextField 
                id="password" 
                label={passwordLabel}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                />
                <br />
                <Button
                style={{width: "140px"}}
                variant="contained" 
                color="inherit"
                type="submit" 
                >
                    {titleButton}
                </Button>
                </form>
                </div>
            </div>
        <Modal show={show} close={closeModalHandler}/>
        { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null}
                <button onClick={() => setShow(true)}className="btn-openModal">Hey! Buradayım</button>
        </div>
    )
}

export default LoginPage;

//https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/