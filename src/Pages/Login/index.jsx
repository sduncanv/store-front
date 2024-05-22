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
                <h1 className='login-title'>Iniciar Sessión</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel'>Username: </FormLabel>
                    <Input
                    placeholder='Enter your username.' className='Input'
                    onChange={(event) => context.setUsername(event.target.value)}
                    type='text' name='username' />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabel'>Password:</FormLabel>
                    <Input 
                    placeholder='Enter your password.'
                    className='Input' onChange={(event) => context.setPassword(event.target.value)}
                    type='text' name='password' />
                </FormControl>

                <FormControl className='FormControl'>
                    <Button
                    className='ButtonControl'
                    type='submit'
                    onClick={() => LoginUser()}>Iniciar</Button>
                </FormControl>

                <h3>¿No tienes una cuenta? <a href="/singup">Crea una cuenta</a></h3>
            </div>
        </Layout>
    )
}

export default Login