import React, { useState, useContext } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import {
    Input, Button, InputGroup, InputRightElement, FormControl, FormLabel
} from '@chakra-ui/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import AuthenticateUser from '../../Components/AuthenticateUser'
import './Singup.css'

function Singup() {

    const context = useContext(StoreContext)

    if (context.inLogin) {
        return <Navigate to='/' />
    }

    const [emailLocal, setEmailLocal] = useState('')
    const [usernameLocal, setUsernameLocal] = useState('')
    const [passwordLocal, setPasswordLocal] = useState('')
    const [phoneNumberLocal, setPhoneNumberLocal] = useState('')

    const handleUsernameChange = (event) => {
        setUsernameLocal(event.target.value)
        context.setUsernameToAuth(event.target.value)
    }

    const [showEye, setShowEye] = useState(false)
    const handleClick = () => setShowEye(!showEye)

    const [isErrorInSignUp, setIsErrorInSignUp] = useState(false)
    const [isCreated, setIsCreated] = useState(false)

    const CreateUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'email': emailLocal,
                    'username': usernameLocal,
                    'password': passwordLocal,
                    'phone_number': `+57${phoneNumberLocal}`, // Pendiente
                }
            )
        }

        const URL = 'http://localhost:3003/dev/user'
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statusCode == 200) {
                    setIsCreated(true)
                    setIsErrorInSignUp(false)
                } else {
                    setIsErrorInSignUp(true)
                }
            })
    }


    return (
        <Layout>
            <div className='singup-main'>
                <h1 className='singup-title'>Crear cuenta</h1>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup' >Correo electrónico</FormLabel>
                    <Input
                        type='email' name='email' className='InputSingup'
                        placeholder='Escribe tu correo electrónico.'
                        onChange={(event) => setEmailLocal(event.target.value)}
                    />
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Usuario</FormLabel>
                    <Input
                        type='text' name='username'
                        className='InputSingup' placeholder='Escribe tu usuario.'
                        onChange={handleUsernameChange}
                    />
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={showEye ? 'text' : 'password'}
                            className='InputSingup' placeholder='Ingresa una contraseña.'
                            onChange={(event) => setPasswordLocal(event.target.value)}
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
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Número de teléfono</FormLabel>
                    <Input
                        type='number' name='phone_number'
                        className='InputSingup' placeholder='Escribe tu número de teléfono.'
                        onChange={(event) => setPhoneNumberLocal(event.target.value)}
                    />
                </FormControl>

                {
                    isErrorInSignUp ? (
                        <FormControl className='FormControl'>
                            <FormLabel className='FormLabelLogin'>
                                Error al crear el usuario. Intentalo de nuevo.
                            </FormLabel>
                        </FormControl>
                    ) : (null)
                }

                {
                    !isCreated ? (
                        <FormControl className='FormControl FormControl-Cel-Singup'>
                            <Button
                                type='submit' className='ButtonControlSingup'
                                onClick={() => {CreateUser()}}
                                loadingText='LLena todos los campos'
                                // isLoading={!resultValidationBotton}
                                // colorScheme={!resultValidationBotton ? 'teal' : 'gray'}
                                // variant={!resultValidationBotton ? 'solid' : 'outline'}
                            >
                                Crear cuenta
                            </Button>
                            <h3 className='singup-login-question'>
                                ¿Ya tienes una cuenta? <NavLink to='/login'>Inicia sesión</NavLink>
                            </h3>
                        </FormControl>
                    ) : (null)
                }
                {
                    isCreated ? (
                        <AuthenticateUser/>
                    ) : (null)
                }
            </div>
        </Layout>
    )
}

export default Singup