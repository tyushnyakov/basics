import React from 'react';
import './AddContact.css';
import {useForm} from 'react-hook-form';

function AddContact() {

    const {register, handleSubmit} = useForm();
    const onSubmit = (data, e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            };
        fetch("https://my-json-server.typicode.com/tyushnyakov/contacts/contacts", requestOptions)
            .then(res => console.log(res))
            .catch(err => console.log(err));
            e.target.reset();    
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="add-wrapper">
                    <input type="text" placeholder="Имя" name="name" ref={register}></input>
                    <input type="text" placeholder="Фамилия" name="surname" ref={register}></input>
                    <input type="email" placeholder="e-mail" name="email" ref={register}></input>
                    <input type="submit" value="Добавить контакт" />   
                </div>
                
            </form>   
        </div>
    );
}

export default AddContact;