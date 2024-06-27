import React, { useState, useContext } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import {
    Input, Button, InputGroup, InputRightElement, FormControl, FormLabel
} from '@chakra-ui/react'
import AlertForm from '../../Components/AlertForm'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import {
    validateString, validateEmail, validateUsername, validatePassword,
    allElementsTrue
} from '../../Utils/index'
import './Singup.css'

function Singup() {

    const context = useContext(StoreContext);

    if (context.userData) {
        return <Navigate to='/' />
    };

    const [nameLocal, setNameLocal] = useState('')
    const [resultNameLocal, setResultNameLocal] = useState({})

    const [firstLastnameLocal, setFirstLastnameLocal] = useState('')
    const [resultFirstLastnameLocal, setResultFirstLastnameLocal] = useState({})

    const [emailLocal, setEmailLocal] = useState('')
    const [resultEmailLocal, setResultEmailLocal] = useState({})

    const [usernameLocal, setUsernameLocal] = useState('')
    const [resultUsernameLocal, setResultUsernameLocal] = useState({})
    
    const [passwordLocal, setPasswordLocal] = useState('')
    const [resultPasswordLocal, setResultPasswordLocal] = useState({})

    const handleNameChange = (event) => {
        setNameLocal(event.target.value);
        setResultNameLocal(validateString(nameLocal));
    };

    const handleFirstLastnameChange = (event) => {
        setFirstLastnameLocal(event.target.value);
        setResultFirstLastnameLocal(validateString(firstLastnameLocal));
    };

    const handleEmailChange = (event) => {
        setEmailLocal(event.target.value);
        setResultEmailLocal(validateEmail(emailLocal));
    };

    const handleUsernameChange = (event) => {
        setUsernameLocal(event.target.value);
        context.setGlobalUsername(event.target.value);
        setResultUsernameLocal(validateUsername(usernameLocal));
    };

    const [showEye, setShowEye] = useState(false)
    const handleClick = () => setShowEye(!showEye)

    const handlePasswordChange = (event) => {
        setPasswordLocal(event.target.value);
        setResultPasswordLocal(validatePassword(passwordLocal));
    };

    const resultValidationBotton = allElementsTrue([
        resultNameLocal.isValid,
        resultFirstLastnameLocal.isValid,
        resultEmailLocal.isValid,
        resultUsernameLocal.isValid,
        resultPasswordLocal.isValid
    ])

    const CreateUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.globalUsername,
                    'password': passwordLocal,
                    'email': emailLocal,
                    'name': nameLocal,
                    'first_lastname': firstLastnameLocal
                }
            )
        };

        context.setAuthenticated(true)
        context.setIsOpenAlertForm(true)

        // const URL = 'https://10h1dcdbp7.execute-api.us-east-1.amazonaws.com/dev/user';
        const URL = 'http://localhost:3020/dev/user';
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setSingupApiResponse(data)
            });
    }

    return (
        <Layout>
            {
                context.authenticated ?
                    <AlertForm />
                :
                    <div className='singup-main'>
                        <h1 className='singup-title'>Crear cuenta</h1>

                        <FormControl
                            isRequired className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup'>Nombre</FormLabel>
                            <Input
                                type='text'
                                name='name'
                                placeholder=' Escribe tu nombre.'
                                className='InputSingup'
                                onChange={handleNameChange}
                            />
                            {
                                !resultNameLocal.isValid ? (
                                    <span>{resultNameLocal.error}</span>
                                ) : (null)
                            }
                        </FormControl>

                        <FormControl
                            isRequired className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup'>Primer apellido</FormLabel>
                            <Input
                                type='text'
                                name='first_lastname'
                                placeholder='Escribe tu primer apellido.'
                                className='InputSingup'
                                onChange={handleFirstLastnameChange}
                            />
                            {
                                !resultFirstLastnameLocal.isValid ? (
                                    <span>{resultFirstLastnameLocal.error}</span>
                                ) : (null)
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
                                placeholder='Escribe tu correo electrónico.'
                                onChange={handleEmailChange}
                            />
                            {
                                !resultEmailLocal.isValid ? (
                                    <p>{resultEmailLocal.error}</p>
                                ) : (null)
                            }
                        </FormControl>

                        <FormControl
                            isRequired className='FormControl'
                        >
                            <FormLabel className='FormLabelSingup'>Usuario</FormLabel>
                            <Input
                                type='text'
                                name='username'
                                className='InputSingup'
                                placeholder='Escribe un usuario.'
                                onChange={handleUsernameChange}
                            />
                            {
                                !resultUsernameLocal.isValid ? (
                                    <p>{resultUsernameLocal.error}</p>
                                ) : (null)
                            }
                        </FormControl>

                        <FormControl className='FormControl'>
                            <FormLabel className='FormLabelSingup'>Contraseña</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    type={showEye ? 'text' : 'password'}
                                    className='InputSingup'
                                    placeholder='Enter password'
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement className='InputRightElement'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {
                                            showEye ?
                                                <EyeIcon className='EyeSlashIcon'></EyeIcon>
                                            :
                                                <EyeSlashIcon className='EyeSlashIcon'></EyeSlashIcon>
                                        }
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {
                                !resultPasswordLocal.isValid ? (
                                    <p>{resultPasswordLocal.error}</p>
                                ) : (null)
                            }
                        </FormControl>

                        <FormControl className='FormControl FormControl-Cel-Singup'>
                            <Button
                                type='submit'
                                className='ButtonControlSingup'
                                onClick={() => {CreateUser();}}
                                isLoading={!resultValidationBotton}
                                loadingText='LLena todos los campos'
                                colorScheme={!resultValidationBotton ? 'teal' : 'gray'}
                                variant={!resultValidationBotton ? 'solid' : 'outline'}
                            >
                                Crear cuenta
                            </Button>
                            <h3 className='singup-login-question'>
                                ¿Ya tienes una cuenta? <NavLink to='/login'>Inicia sesión</NavLink>
                            </h3>
                        </FormControl>
                    </div>
            }
        </Layout>
    )
}

export default Singup;