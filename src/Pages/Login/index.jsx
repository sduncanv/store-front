import { useState, useContext } from 'react'
import { useNavigate, NavLink, Navigate } from 'react-router-dom'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import {
    FormControl, FormLabel, Input, Button, InputGroup, InputRightElement
} from '@chakra-ui/react'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'
import './Login.css'

function Login() {

    const context = useContext(StoreContext)
    const navigate = useNavigate();

    if (context.inLogin) {
        return <Navigate to='/' />
    };

    const [usernameLocal, setUsernameLocal] = useState('');
    const [passwordLocal, setPasswordLocal] = useState('');
    const [isErrorInLogin, setIsErrorInLogin] = useState(false);

    const LoginUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': usernameLocal,
                    'password': passwordLocal,
                }
            )
        };

        const URL = 'http://localhost:3003/dev/login';
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {

                if (data.statusCode == 200) {
                    setIsErrorInLogin(false)
                    context.setMessageFromSignup(false)
                    GetUserData(usernameLocal)
                } else {
                    setIsErrorInLogin(true)
                };
            });
    };

    const GetUserData = (username) => {

        const URL = `http://localhost:3003/dev/user?username=${username}`
        fetch(URL)
            .then(response => response.json())
            .then(data => {

                if (data.statusCode == 200) {

                    setIsErrorInLogin(false)
                    context.setResponseGetUser(data.data[0])

                    if (data.statusCode == 200) {
                        context.setInLogin(true)
                        navigate('/')
                    } else {
                        setIsErrorInLogin(true)
                    }

                } else {
                    setIsErrorInLogin(true)
                };
            });
    }

    const handleUsernameChange = (event) => {
        setUsernameLocal(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordLocal(event.target.value);
    };

    const [showEye, setShowEye] = useState(false);
    const handleClickEye = () => setShowEye(!showEye)

    return (
        <Layout>
            <div className='login-main'>
                <h1 className='login-title'>Iniciar sesión</h1>

                {
                    context.setMessageFromSignup == false ? (
                        <FormControl className='FormControl' >
                            <FormLabel className='FormLabelLogin'>
                                Tu usuario fue creado, inicia sesión con tus credenciales:
                            </FormLabel>
                        </FormControl>
                    ) : ( null)
                }

                <FormControl className='FormControl' >
                    <FormLabel className='FormLabelLogin'>Usuario</FormLabel>
                    <Input
                        type='text' name='username' placeholder=' Ingresa tu nombre de usuario.'
                        className='InputLogin' onChange={handleUsernameChange}
                    />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelLogin'>Contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={showEye ? 'text' : 'password'}
                            className='InputLogin' placeholder='Ingresa tu contraseña.'
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement className='InputRightElement'>
                            <Button h='1.75rem' size='sm' 
                            onClick={handleClickEye}>
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

                {
                    isErrorInLogin ? (
                        <FormControl className='FormControl'>
                            <FormLabel className='FormLabelLogin'>
                                Credenciales incorrectas
                            </FormLabel>
                        </FormControl>
                    ) : (null)
                }

                <FormControl className='FormControl FormControl-Cel'>
                    <Button
                        type='submit' className='ButtonControlLogin'
                        onClick={() => {LoginUser();}}
                    >
                        Iniciar sesión
                    </Button>
                    <h3 className='login-singup-question'>
                        ¿No tienes una cuenta aún? <NavLink to='/singup'>Crea una cuenta</NavLink>
                    </h3>
                </FormControl>

            </div>
        </Layout>
    )
}

export default Login