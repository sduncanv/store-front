import React, { useState, useContext } from 'react';
import {
    Input, Button, InputGroup, InputRightElement,
    FormControl, FormLabel
} from '@chakra-ui/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout'
import AlertForm from '../../Components/Auth';
import { StoreContext } from '../../Context'
import {
    validateString, validateEmail, validateUsername, validatePassword,
    allElementsTrue
} from '../../Utils/index'
import './Singup.css'

function Singup() {

    const context = useContext(StoreContext)

    const [name, setName] = useState('')
    const [resultName, setResultName] = useState({})

    const [firstLastname, setFirstLastname] = useState('')
    const [resultFirstLastname, setResultFirstLastname] = useState({})

    const [email, setEmail] = useState('')
    const [resultEmail, setResultEmail] = useState({})

    const [username, setUsername] = useState('')
    const [resultUsername, setResultUsername] = useState({})
    
    const [password, setPassword] = useState('')
    const [resultPassword, setResultPassword] = useState({})

    const CreateUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.globalUsername,
                    'password': password,
                    'email': email,
                    'name': name,
                    'first_lastname': firstLastname
                }
            )
        };

        context.setAuthenticated(true)
        context.setIsOpen(true)

        fetch('http://localhost:3000/dev/user', requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setDataSingup(data)
                console.log('res user 1: ', data)
            });

    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        setResultName(validateString(name));
    };

    const handleFirstLastnameChange = (event) => {
        setFirstLastname(event.target.value);
        setResultFirstLastname(validateString(firstLastname));
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setResultEmail(validateEmail(email));
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        context.setGlobalUsername(event.target.value);
        setResultUsername(validateUsername(username));
    };

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setResultPassword(validatePassword(password));
    };

    const resultValidationBotton = allElementsTrue([
        resultName.isValid,
        resultFirstLastname.isValid,
        resultEmail.isValid,
        resultUsername.isValid,
        resultPassword.isValid
    ])

    return (
        <Layout>
            {
                context.authenticated ?
                    <AlertForm />
                :
                    <div className='singup-main'>
                        <h1 className='singup-title'>Crear cuenta</h1>

                        <FormControl
                            isRequired
                            className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup'>
                                Nombres
                            </FormLabel>
                            <Input
                                type='text'
                                name='name'
                                placeholder='Enter your name.'
                                className='InputSingup'
                                onChange={handleNameChange}
                            />
                            {
                                !resultName.isValid ? (
                                    <span>{resultName.error}</span>
                                ) : (
                                    <span></span>
                                )
                            }
                        </FormControl>

                        <FormControl
                            isRequired
                            className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup' >
                                Primer apellido
                            </FormLabel>
                            <Input
                                type='text'
                                name='first_lastname'
                                placeholder='Enter your first lastname.'
                                className='InputSingup'
                                onChange={handleFirstLastnameChange}
                            />
                            {
                                !resultFirstLastname.isValid ? (
                                    <span>{resultFirstLastname.error}</span>
                                ) : (
                                    <span></span>
                                )
                            }
                        </FormControl>

                        <FormControl
                            isRequired
                            className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup' >Email</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                className='InputSingup'
                                placeholder='Enter your email.'
                                onChange={handleEmailChange}
                            />
                            {
                                !resultEmail.isValid ? (
                                    <p>{resultEmail.error}</p>
                                ) : (
                                    <span></span>
                                )
                            }
                        </FormControl>

                        <FormControl
                            isRequired
                            className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup' >
                                Username
                            </FormLabel>
                            <Input
                                type='text'
                                name='username'
                                className='InputSingup'
                                placeholder='Enter your username.'
                                onChange={handleUsernameChange}
                            />
                            {
                                !resultUsername.isValid ? (
                                    <p>{resultUsername.error}</p>
                                ) : (
                                    <span></span>
                                )
                            }
                        </FormControl>

                        <FormControl className='FormControl'>
                            <FormLabel className='FormLabelSingup'>
                                Contraseña
                            </FormLabel>
                            {/* <PasswordInput /> */}
                            <InputGroup size='md'>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    className='InputSingup'
                                    placeholder='Enter password'
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement className='InputRightElement'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {
                                            show ?
                                                <EyeIcon className='EyeSlashIcon'></EyeIcon>
                                            :
                                                <EyeSlashIcon className='EyeSlashIcon'></EyeSlashIcon>
                                        }
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {
                                !resultPassword.isValid ? (
                                    <p>{resultPassword.error}</p>
                                ) : (
                                    <span></span>
                                )
                            }
                        </FormControl>

                        <FormControl className='FormControl FormControl-Cel-Singup'>
                            <Button
                                className='ButtonControlSingup'
                                type='submit'
                                onClick={() => {CreateUser();}}
                                isLoading={!resultValidationBotton}
                                loadingText='Submitting'
                                colorScheme={!resultValidationBotton ? 'teal' : 'gray'}
                                variant={!resultValidationBotton ? 'solid' : 'outline'}
                            >
                                Crear cuenta
                            </Button>
                            <h3 className='singup-login-question'>
                                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                            </h3>
                        </FormControl>
                    </div>
            }
        </Layout>
    )
}

export default Singup