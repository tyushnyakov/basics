import React, { useState, useEffect } from 'react';
import './Contacts.css';
import ContactsItem from './ContactsItem';
import AddContact from './AddContact';
import {useForm} from 'react-hook-form';

function Contacts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [searchData, setSearchData] = useState({});

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/tyushnyakov/contacts/contacts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setContacts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        if (searchData.name)
        setContacts(contacts.filter((item) => (item.name + " " + item.surname) === searchData.name))
    }, [searchData, contacts])

    const {register, handleSubmit} = useForm();
    const onSubmit = (data, e) => {
        setSearchData(data);
        e.target.reset();
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Загрузка...</div>
    } else {
        return (
            <div className="wrapper">
                <div className="header">
                    <h2>КОНТАКТЫ</h2>
                    <div className="search">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="search-wrapper">
                                <input type="search" name="name" ref={register}></input>
                                <imput type="submit" value="Поиск"/>
                                Поиск
                            </div>
                        </form>    
                    </div>
                </div>
                <AddContact />
                <ul>
                    {contacts.map((contact) => 
                        <li><ContactsItem key={contact.id} contact={contact} /></li>)
                    }
                </ul>                
            </div>
        );
    }
}

export default Contacts;