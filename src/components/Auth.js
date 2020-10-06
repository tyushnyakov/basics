import React, { useState, useEffect } from 'react';
import './Auth.css';
import {useForm} from 'react-hook-form';
import {Redirect} from "react-router-dom";

function Auth() {

    const [users, setUsers] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/tyushnyakov/contacts/users")
            .then(res => res.json())
            .then(result => setUsers(result))
    }, []) 

    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        users.forEach((elem) => {
            if (elem.login === data.login && elem.password === data.password) {
                setIsLogged(true);    
            } else {
            alert("Неверный логин или пароль");
            }
        })
    }  

    if (isLogged) {
      return (<Redirect to="/contacts" />);    
    } 
    return (
        <div className="auth">
          <h1>ВХОД В ЛИЧНЫЙ КАБИНЕТ</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            Login: <input type="text" name="login" ref={register}></input>
            Password: <input type="password" name="password" ref={register}></input>
            <input type="submit" value="ВОЙТИ"/>
          </form>
        </div> 
    );
}

export default Auth;