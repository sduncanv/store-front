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
import {
    validateEmail, validateUsername, validatePassword, validatePhoneNumber,
    allElementsTrue
} from '../../Utils/index'
import { getDate } from '../../Utils/index'


function Singup() {

    const context = useContext(StoreContext)

    if (context.inLogin) {
        return <Navigate to='/' />
    }

    const [emailLocal, setEmailLocal] = useState('')
    const [usernameLocal, setUsernameLocal] = useState('')
    const [passwordLocal, setPasswordLocal] = useState('')
    const [phoneNumberLocal, setPhoneNumberLocal] = useState('')

    const [validatedEmail, setValidatedEmail] = useState({})
    const [validatedUsername, setValidatedUsername] = useState({})
    const [validatedPassword, setValidatedPassword] = useState({})
    const [validatedPhoneNumber, setValidatedPhoneNumber] = useState({})

    const handleEmailChange = (event) => {
        setEmailLocal(event.target.value)
        setValidatedEmail(validateEmail(event.target.value))
    }

    const handleUsernameChange = (event) => {
        setUsernameLocal(event.target.value)
        setValidatedUsername(validateUsername(event.target.value))
        context.setUsernameToAuth(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordLocal(event.target.value)
        setValidatedPassword(validatePassword(event.target.value))
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumberLocal(event.target.value)
        setValidatedPhoneNumber(validatePhoneNumber(event.target.value))
    }

    const [showEye, setShowEye] = useState(false)
    const handleClick = () => setShowEye(!showEye)

    const [isErrorInSignUp, setIsErrorInSignUp] = useState(false)
    const [isCreated, setIsCreated] = useState(false)

    const [newImageProduct, setnewImageProduct] = useState('')
    console.log('newImageProduct ----> ', newImageProduct)

    const handleFileChange = (event) => {

        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {

                const fullBase64 = reader.result
                const pureBase64 = fullBase64.split(',')[1]

                setnewImageProduct(pureBase64)
            }
            reader.readAsDataURL(file)
        }
    }

    const CreateUser = () => {

        const requestData = {
            'email': emailLocal,
            'username': usernameLocal,
            'password': passwordLocal,
            'phone_number': `+57${phoneNumberLocal}`,
            
        }
        
        if (newImageProduct != '') {

            const date = getDate()
            const filename = `user_${usernameLocal}-date_${date.formattedDate}`

            requestData.file = {
                'filename': filename,
                'image': newImageProduct,
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
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

    const resultValidationBotton = allElementsTrue([
        validatedUsername.isValid,
        validatedEmail.isValid,
        validatedPassword.isValid,
        validatedPhoneNumber.isValid,
    ])

    console.log('resultValidationBotton', resultValidationBotton)

    return (
        <Layout>
            <div className='singup-main'>
                <h1 className='singup-title'>Crear cuenta</h1>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup' >Correo electrónico</FormLabel>
                    <Input
                        type='email' name='email' className='InputSingup'
                        placeholder='Escribe tu correo electrónico.'
                        onChange={handleEmailChange}
                    />
                    {
                        !validatedEmail.isValid ? (
                            <span className='error-signup'>{validatedEmail.error}</span>
                        ) : (null)
                    }
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Usuario</FormLabel>
                    <Input
                        type='text' name='username'
                        className='InputSingup' placeholder='Escribe tu usuario.'
                        onChange={handleUsernameChange}
                    />
                    {
                        !validatedUsername.isValid ? (
                            <span className='error-signup'>{validatedUsername.error}</span>
                        ) : (null)
                    }
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={showEye ? 'text' : 'password'}
                            className='InputSingup' placeholder='Ingresa una contraseña.'
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
                        !validatedPassword.isValid ? (
                            <span className='error-signup'>{validatedPassword.error}</span>
                        ) : (null)
                    }
                </FormControl>

                <FormControl isRequired className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Número de teléfono</FormLabel>
                    <Input
                        type='number' name='phone_number'
                        className='InputSingup' placeholder='Escribe tu número de teléfono.'
                        onChange={handlePhoneNumberChange}
                        onKeyDown={(e) => {
                            if (['e', 'E', '+', '-'].includes(e.key)) {
                              e.preventDefault();
                            }
                        }}
                    />
                    {
                        !validatedPhoneNumber.isValid ? (
                            <span className='error-signup'>{validatedPhoneNumber.error}</span>
                        ) : (null)
                    }
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelSingup' >Imagen</FormLabel>
                    <input
                        onChange={handleFileChange}
                        type="file" name="image" id="image"  accept="image/*"
                    ></input>
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
                                loadingText='Primero llena todos los campos'
                                // isDisabled={resultValidationBotton}
                                isLoading={!resultValidationBotton}
                                colorScheme={!resultValidationBotton ? 'teal' : 'gray'}
                                variant={!resultValidationBotton ? 'solid' : 'outline'}
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