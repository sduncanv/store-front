import React, { useContext } from 'react';
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

        // onClose()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.username,
                    'code': context.codeAuth,
                }
            )
        };

        fetch('http://localhost:3000/dev/authenticate_user', requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setApiCodeAuth(data)

                data.statusCode === 400 ? (
                    context.setAuthStatus('error')
                ) : data.statusCode === 200 ? (
                    context.setAuthStatus('success')
                ) : (
                    context.setAuthStatus('error')
                )
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
                    context.authStatus === 'success' ? (

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
                                <Button ref={cancelRef} onClick={onClose}>
                                    Ir a inicio
                                </Button>
                                </FormControl>
                            </AlertDialogFooter>
                        </AlertDialogContent>
    
                    ) : context.authStatus === 'error' ? (

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
                                <Button ref={cancelRef} onClick={onClose}>
                                    Ir a inicio
                                </Button>
                                </FormControl>
                            </AlertDialogFooter>
                            
                        </AlertDialogContent>

                    ) : (
                        <AlertDialogContent>
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