import { useContext } from 'react'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import './Login.css'

function Login() {

    const context = useContext(StoreContext)

    const LoginUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.username,
                    'password': context.password,
                }
            )
        };

        // console.log('Aquiiiiii')

        fetch('http://localhost:3000/dev/user', requestOptions)
            .then(response => response.json())
            .then(data => context.setPrueba(data));

    }

    return (
        <Layout>
            <div className='login-main'>
                <h1 className='login-title'>Iniciar sesión</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelLogin'>Username</FormLabel>
                    <Input
                        type='text'
                        name='username'
                        placeholder=' Ingresa un nombre de usuario'
                        className='InputLogin'
                        onChange={(event) => context.setUsername(event.target.value)}
                    />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelLogin'>Password</FormLabel>
                    <Input 
                        type='text'
                        name='password'
                        placeholder=' Ingresa una contraseña'
                        className='InputLogin'
                        onChange={(event) => context.setPassword(event.target.value)}
                    />
                    <h3 className='login-pass-question'>
                        <a href="">¿Olvidaste tu contraseña?</a>
                    </h3>
                </FormControl>

                <FormControl className='FormControl FormControl-Cel'>
                    <Button
                    className='ButtonControlLogin'
                    type='submit'
                    onClick={() => LoginUser()}>Iniciar sesión</Button>
                    <h3 className='login-singup-question'>
                        ¿No tienes una cuenta aún? <a href="/singup">Crea una cuenta</a>
                    </h3>
                </FormControl>

            </div>
        </Layout>
    )
}

export default Login