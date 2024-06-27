import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FormControl, FormLabel, Input, Button, ChakraProvider, AlertDialog,
    AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { StoreContext } from '../../Context'
import './Auth.css'


function AlertForm() {

    const context = useContext(StoreContext);
    const navigate = useNavigate();
    const cancelRef = React.useRef();

    const AuthUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.globalUsername,
                    'code': context.codeAuthEmail,
                }
            )
        };

        // const URL = 'https://10h1dcdbp7.execute-api.us-east-1.amazonaws.com/dev/authenticate_user';
        const URL = 'http://localhost:3020/dev/authenticate_user';
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setResultApiCodeAuth(data)

                if (data.statusCode == 200) {
                    navigate('/');
                }
            });
    }

    const handleClickButtonAuth = () => {
        context.setIsOpenAlertForm(false)
    }

    return (
        <ChakraProvider>
            <AlertDialog
                alignItems='center'
                isOpen={context.isOpenAlertForm}
                leastDestructiveRef={cancelRef}
                onClose={context.isOpenAlertForm}
            >
                <AlertDialogOverlay />
                {
                    context.resultApiCodeAuth.statusCode != 200 && context.resultApiCodeAuth.statusCode != 0 ? (

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <h1 className='auth-title'>Autenticar cuenta</h1>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <div className='auth-main'>
                                    Tu cuenta no fue autenticada con exito.
                                </div>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <FormControl className='FormControlAuth FormControl-Cel-Auth'>
                                <Link to='/'>
                                    <Button ref={cancelRef} onClick={handleClickButtonAuth}>
                                        Ir a inicio
                                    </Button>
                                </Link>
                                </FormControl>
                            </AlertDialogFooter>
                        </AlertDialogContent>

                    ) : (

                        <AlertDialogContent marginTop={'300px'}>
                            <AlertDialogHeader>
                                <h1 className='auth-title'>Autenticar cuenta</h1>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <div className='auth-main'>
                                    <FormControl className='FormControlAuth' isRequired>
                                        <FormLabel className='FormLabelAuth' >Código</FormLabel>
                                        <Input
                                            placeholder='Ingresa el código.'
                                            className='InputAuth'
                                            onChange={(event) => context.setCodeAuthEmail(event.target.value)}
                                            type='text'
                                            name='code'
                                        />
                                    </FormControl>
                                </div>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <FormControl className='FormControlAuth FormControl-Cel-Auth'>
                                    <Button
                                        type='submit'
                                        className='ButtonControlAuth'
                                        ref={cancelRef}
                                        onClick={() => {AuthUser();}}
                                    >Autenticar cuenta</Button>
                                </FormControl>
                            </AlertDialogFooter>
                        </AlertDialogContent>

                    )
                }
            </AlertDialog>
        </ChakraProvider>
    )
}

export default AlertForm