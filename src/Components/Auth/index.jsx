import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context'
import {
    FormControl, FormLabel, Input, Button,
    ChakraProvider,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import './Auth.css'


function AlertForm() {

    const context = useContext(StoreContext)

    const onClose = () => context.setIsOpen(false)
    const cancelRef = React.useRef()

    const AuthUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.globalUsername,
                    'code': context.codeAuth,
                }
            )
        };

        fetch('http://localhost:3000/dev/authenticate_user', requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setApiCodeAuth(data)

                context.setAuthStatus(data.statusCode)
            });
    }

    return (
        <ChakraProvider>
            <AlertDialog
                alignItems='center'
                isOpen={context.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                {
                    context.authStatus === 200 ? (

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <h1 className='auth-title'>Autenticar cuenta</h1>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <div className='auth-main'>
                                    Tu cuenta fue autenticada con exito.
                                </div>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <FormControl className='FormControlAuth FormControl-Cel-Auth'>
                                <Link to='/'>
                                    <Button
                                        ref={cancelRef}
                                        onClick={onClose}
                                    >
                                        Ir a inicio
                                    </Button>
                                </Link>
                                </FormControl>
                            </AlertDialogFooter>
                        </AlertDialogContent>
    
                    ) : context.authStatus != 200 && context.authStatus != 0 ? (

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
                                    <Button ref={cancelRef} onClick={onClose}>
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
                                            onChange={(event) => context.setCodeAuth(event.target.value)}
                                            type='text'
                                            name='code'
                                            />
                                    </FormControl>
                                </div>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <FormControl className='FormControlAuth FormControl-Cel-Auth'>
                                    <Button
                                        ref={cancelRef}
                                        className='ButtonControlAuth'
                                        type='submit'
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