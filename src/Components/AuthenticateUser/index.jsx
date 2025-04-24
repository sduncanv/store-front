import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { StoreContext } from '../../Context'


function AuthenticateUser() {

    const context = useContext(StoreContext)
    const navigate = useNavigate()

    const [codeLocal, setCodeLocal] = useState('')
    const [isAuthenticatedError, setIsAuthenticatedError] = useState(false)

    const AuthenticateUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.usernameToAuth,
                    'code': codeLocal,
                }
            )
        }

        const URL = 'http://localhost:3003/dev/authenticate_user'
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {

                if (data.statusCode == 200) {
                    setIsAuthenticatedError(false)
                    context.setMessageFromSignup(true)
                    navigate('/login')
                } else {
                    setIsAuthenticatedError(true)
                }
            })
    }

    return (
        <div className='singup-code-confirmation'>

            <FormControl isRequired className='FormControl'>
                <FormLabel className='FormLabelSingup' >Código de confirmación.</FormLabel>
                <Input
                    type='code' name='code' className='InputSingup'
                    placeholder='Escribe el código que llegó a tu correo electrónico.'
                    onChange={(event) => setCodeLocal(event.target.value)}
                />
            </FormControl>

            {
                isAuthenticatedError ? (
                    <FormControl className='FormControl'>
                        <FormLabel className='FormLabelLogin'>
                            Error al autenticar el usuario.
                        </FormLabel>
                    </FormControl>
                ) : (null)
            }

            <FormControl className='FormControl FormControl-Cel-Singup'>
                <Button
                    type='submit' className='ButtonControlSingup'
                    onClick={() => {AuthenticateUser()}}
                    // isLoading={!resultValidationBotton}
                    loadingText='Escribe el código.'
                    // colorScheme={!resultValidationBotton ? 'teal' : 'gray'}
                    // variant={!resultValidationBotton ? 'solid' : 'outline'}
                >
                    Confirmar código.
                </Button>
            </FormControl>
        </div>
    )
}

export default AuthenticateUser