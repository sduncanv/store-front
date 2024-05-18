import React, { useState, useContext } from 'react';
import { FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import './Singup.css'

function PasswordInput() {

    const context = useContext(StoreContext)

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
        <InputGroup size='md'>
            <Input className='Input' pr='4.5rem'
            type={show ? 'text' : 'password'} placeholder='Enter password'
            onChange={(event) => context.setPassword(event.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

function Singup() {

    const context = useContext(StoreContext)

    const CreateUser = () => {

        // console.log('username: ', context.username)
        // console.log('password: ', context.password)
        // console.log('email: ', context.email)
        // console.log('name: ', context.name)
        // console.log('firstLastname: ', context.firstLastname)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.username,
                    'password': context.password,
                    'email': context.email,
                    'name': context.name,
                    'first_lastname': context.firstLastname
                }
            )
        };

        // console.log('Requeeeeeest')

        fetch('http://localhost:3000/dev/user', requestOptions)
            .then(response => response.json())
            .then(data => context.setDataSingup(data));

        // print('dataSingup: ', context.dataSingup)

        return context.dataSingup
    }

    return (
        <Layout>
            <div className='singup-main'>
                <h1 className='singup-title'>Registrarse</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Nombres: </FormLabel>
                    <Input placeholder='Enter your name.' className='Input'
                    onChange={(event) => context.setName(event.target.value)}
                    type='text' name='name' />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Primer apellido: </FormLabel>
                    <Input placeholder='Enter your first lastname.' className='Input'
                    onChange={(event) => context.setFirstLastname(event.target.value)}
                    type='text' name='first_lastname' />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Email: </FormLabel>
                    <Input placeholder='Enter your email.' className='Input'
                    onChange={(event) => context.setEmail(event.target.value)}
                    type='email' name='email' />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Username: </FormLabel>
                    <Input placeholder='Enter your username.' className='Input'
                    onChange={(event) => context.setUsername(event.target.value)}
                    type='text' name='username' />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabel'>Contraseña: </FormLabel>
                    <PasswordInput />
                </FormControl>

                <FormControl className='FormControl'>
                    <Button className='ButtonControl' onClick={() => CreateUser()} type='submit'>Registrarse</Button>
                </FormControl>
            </div>
        </Layout>
    )
}
  
export default Singup