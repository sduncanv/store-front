import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const LoginUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': username,
                    'password': password,
                }
            )
        };

        fetch('http://localhost:3000/dev/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setDataLogin(data)
            });
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function handleClickButton() {
        
        LoginUser();

        const isAuthenticated = context.dataLogin.statusCode;
        if (isAuthenticated == 200) {
            navigate("/");
        } else {
            navigate("/singup");
        }

    }

    return (
        <Layout>
            <div className='login-main'>
                <h1 className='login-title'>Iniciar sesión</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelLogin'>
                        Username
                    </FormLabel>
                    <Input
                        type='text'
                        name='username'
                        placeholder=' Ingresa un nombre de usuario'
                        className='InputLogin'
                        onChange={handleUsernameChange}
                    />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelLogin'>
                        Password
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={show ? 'text' : 'password'}
                            className='InputLogin'
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
                    {/* <h3 className='login-pass-question'>
                        <a href="">¿Olvidaste tu contraseña?</a>
                    </h3> */}
                </FormControl>

                <FormControl className='FormControl FormControl-Cel'>
                    <Button
                        className='ButtonControlLogin'
                        type='submit'
                        onClick={handleClickButton}
                    >
                        Iniciar sesión
                    </Button>
                    <h3 className='login-singup-question'>
                        ¿No tienes una cuenta aún? <a href="/singup">Crea una cuenta</a>
                    </h3>
                </FormControl>

            </div>
        </Layout>
    )
}

export default Login