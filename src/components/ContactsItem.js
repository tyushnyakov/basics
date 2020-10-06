import React, { useState } from 'react';
import './ContactsItem.css';
import {useForm} from 'react-hook-form';

function ContactsItem(props) {

    const [isUpdatable, setIsUpdatable] = useState(false);

    function deleteItem() {
        fetch("https://my-json-server.typicode.com/tyushnyakov/contacts/contacts/" + props.contact.id, {
            method: "DELETE",
        });
    }

    const {register, handleSubmit} = useForm();
    const onSubmit = (data, e) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            };
        fetch("https://my-json-server.typicode.com/tyushnyakov/contacts/contacts/"
         + props.id, requestOptions)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => setIsUpdatable(false));
            e.target.reset();
    }

    if (isUpdatable) {
        return (
            <div className="contact-wrapper" > 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="contacts-item">
                        <p>{props.contact.id}</p>
                        <input type="text" placeholder={props.contact.name} name="name" ref={register}></input>    
                        <input type="text" placeholder={props.contact.surname} name="surname" ref={register}></input>    
                        <input type="email" placeholder={props.contact.email} name="email" ref={register}></input>    
                        <input type="submit" value="Обновить контакт" />   
                    </div>
                </form>   
            </div>
        );
    } else {
        return (
            <div className="contact-wrapper">
                <div className="contacts-item">
                    <p>{props.contact.id}</p>
                    <p>{props.contact.name} {props.contact.surname}</p>
                    <p>{props.contact.email}</p>
                    <div>
                        <button onClick={deleteItem}>Удалить</button >
                        <button onClick={() => setIsUpdatable(true)}>Редактировать</button >
                    </div>        
                </div>  
            </div>
        );  
    }
}

export default ContactsItem;