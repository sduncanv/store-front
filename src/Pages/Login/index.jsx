import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
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

    const [usernameLocal, setUsernameLocal] = useState('');
    const [passwordLocal, setPasswordLocal] = useState('');
    const [showEye, setShowEye] = useState(false);
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

        // const URL = 'https://10h1dcdbp7.execute-api.us-east-1.amazonaws.com/dev/login';
        const URL = 'http://localhost:3020/dev/login';

        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setLoginApiResponse(data);

                if (data.statusCode == 200) {
                    navigate('/');
                } else {
                    setIsErrorInLogin(true);
                };
            });
    };

    const handleUsernameChange = (event) => {
        setUsernameLocal(event.target.value);
        context.setGlobalUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordLocal(event.target.value);
    };

    const handleClickEye = () => setShowEye(!showEye)

    function handleLoginButton() {
        LoginUser();
    }

    return (
        <Layout>
            <div className='login-main'>
                <h1 className='login-title'>Iniciar sesión</h1>

                <FormControl
                    className='FormControl'
                    // isRequired
                >
                    <FormLabel className='FormLabelLogin'>Usuario</FormLabel>
                    <Input
                        type='text'
                        name='username'
                        placeholder=' Ingresa tu nombre de usuario.'
                        className='InputLogin'
                        onChange={handleUsernameChange}
                    />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelLogin'>Contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={showEye ? 'text' : 'password'}
                            className='InputLogin'
                            placeholder='Ingresa tu contraseña.'
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement className='InputRightElement'>
                            <Button h='1.75rem' size='sm' onClick={handleClickEye}>
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
                        type='submit'
                        className='ButtonControlLogin'
                        onClick={handleLoginButton}
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