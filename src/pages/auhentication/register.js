import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom"
import Button from "@material-ui/core/Button";
import axiox from "axios";
import "./register.css";
import Navbar from "./components/Navbar";


//texts cons

const title = "Kayıt Olunuz";
const usernameForm = "Email Adresi";
const passwordForm = "Şifre";


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

const RegisterPage = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useHistory();

    const register = (e) => {
        e.preventDefault();
        axiox.post("http://localhost:2000/api/register", {
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
            <div className='registerform'>
            <h2 className="title">{title}</h2>
            {error && <p style={{color: "#ff6e63"}}>{error}</p>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={register}>
                <TextField 
                id="username" 
                label={usernameForm} 
                value={email}
                multiline
                 InputProps = {{
                  classes: {
                    input: classes.multilineColor
                  }
                }}
                onChange={(e) => setEmail(e.target.value) }
                type="text"
                />
                <br />
                <TextField 
                id="password" 
                label={passwordForm}
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
                    Kayıt Ol
                    </Button>
                </form>
                </div></div>
                </div>
    )
}

export default RegisterPage;
