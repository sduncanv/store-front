import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Input, Button, InputGroup, InputRightElement,
    FormControl, FormLabel
} from '@chakra-ui/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import AlertForm from '../../Components/Auth';
import './Singup.css'

function PasswordInput() {

    const context = useContext(StoreContext)

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
        <InputGroup size='md'>
            <Input
                className='InputSingup'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(event) => context.setPassword(event.target.value)}
            />
            <InputRightElement className='InputRightElement'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {
                        show ?
                        <EyeIcon className='EyeSlashIcon'></EyeIcon>
                        // 'Hide'
                        :
                        <EyeSlashIcon className='EyeSlashIcon'></EyeSlashIcon>
                        // 'Show'
                    }
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

function Singup() {

    const context = useContext(StoreContext)

    const CreateUser = () => {

        // context.setViewAuth(true)

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

        console.log('Requeeeeeest singup')  
        context.setAuthenticated(true)
        context.setIsOpen(true)

        // fetch('http://localhost:3000/dev/user', requestOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //         context.setDataSingup(data)
        //     });

    }

    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''

    return (
        <Layout>
            {
                context.authenticated ?
                    // <Auth />
                    <AlertForm />
                :
                    <div className='singup-main'>
                        <h1 className='singup-title'>Crear cuenta</h1>

                        <FormControl className='FormControl' isRequired>
                            <FormLabel className='FormLabelSingup' >Nombres</FormLabel>
                            <Input placeholder='Enter your name.' className='InputSingup'
                            onChange={(event) => context.setName(event.target.value)}
                            type='text' name='name' />
                        </FormControl>

                        <FormControl className='FormControl' isRequired>
                            <FormLabel className='FormLabelSingup' >Primer apellido</FormLabel>
                            <Input placeholder='Enter your first lastname.' className='InputSingup'
                            onChange={(event) => context.setFirstLastname(event.target.value)}
                            type='text' name='first_lastname' />
                        </FormControl>

                        <FormControl className='FormControl' isRequired isInvalid={isError}>
                            <FormLabel className='FormLabelSingup' >Email</FormLabel>
                            <Input
                            type='email'
                            name='email'
                            className='InputSingup'
                            placeholder='Enter your email.'
                            value={input}
                            onChange={handleInputChange}
                            // onChange={(event) => context.setEmail(event.target.value)}
                            />
                            {/* {
                                !isError ? (
                                    <FormHelperText>Ingresa tu correo.</FormHelperText>
                                    ) : (
                                        <FormErrorMessage>El correo es obligatorio.</FormErrorMessage>
                                    )
                                } */}
                        </FormControl>

                        <FormControl className='FormControl' isRequired>
                            <FormLabel className='FormLabelSingup' >Username</FormLabel>
                            <Input
                                placeholder='Enter your username.'
                                className='InputSingup'
                                onChange={(event) => context.setUsername(event.target.value)}
                                type='text'
                                name='username'
                            />
                        </FormControl>

                        <FormControl className='FormControl'>
                            <FormLabel className='FormLabelSingup'>Contraseña</FormLabel>
                            <PasswordInput />
                        </FormControl>

                        <FormControl className='FormControl FormControl-Cel-Singup'>
                            <Button
                                className='ButtonControlSingup'
                                type='submit'
                                onClick={() => {CreateUser();}}
                            >Crear cuenta</Button>
                            <h3 className='singup-login-question'>
                                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                            </h3>
                            {/* <Link
                            to='/authenticate-user'>
                            </Link> */}
                        </FormControl>
                    </div>
            }
        </Layout>
    )
}

export default Singup