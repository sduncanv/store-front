import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import {
    FormControl, FormLabel, Input, Button, InputGroup, InputRightElement,
    FormHelperText, FormErrorMessage, useDisclosure,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import './Singup.css'
import isOpen from '../AuthenticateUser'


function PasswordInput() {

    const context = useContext(StoreContext)

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
        <InputGroup size='md'>
            <Input className='InputSingup'
            type={show ? 'text' : 'password'} placeholder='Enter password'
            onChange={(event) => context.setPassword(event.target.value)}
            />
            <InputRightElement className='InputRightElement'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {
                        show ?
                        <EyeIcon className='EyeSlashIcon'></EyeIcon>
                        // 'Hide'
                        :
                        <EyeSlashIcon className='EyeSlashIcon'></EyeSlashIcon>
                        // 'Show'
                    }
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

function Singup() {

    const context = useContext(StoreContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const CreateUser = () => {

        // context.setOpenModal(true)
        onOpen()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.username,
                    'password': context.password,
                    'email': context.email,
                    'name': context.name,
                    'first_lastname': context.firstLastname
                }
            )
        };

        console.log('Requeeeeeest')

        // fetch('http://localhost:3000/dev/user', requestOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //         context.setDataSingup(data)
        //     });

    }

    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''
    
    return (
        <Layout>
            { isOpen ? (
            <div>
                <Modal
                colorScheme='red'
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create your account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {/* <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input ref={initialRef} placeholder='First name' />
                            </FormControl>

                            <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                            </FormControl> */}

                            <FormControl className='FormControl' isRequired>
                                <FormLabel className='FormLabelSingup' >Código: </FormLabel>
                                <Input placeholder='Enter your code.' className='InputSingup'
                                onChange={(event) => context.setCodeAuth(event.target.value)}
                                type='text' name='code' />
                            </FormControl>

                            <FormControl className='FormControl'>
                                <Link to='/authenticated-user'>
                                    <Button className='ButtonControlSingup'
                                    onClick={onClose} type='submit'>Autenticar</Button>
                                </Link>
                            </FormControl>
                        </ModalBody>

                        {/* <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
                            Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter> */}
                    </ModalContent>
                </Modal>
            </div>
            ) : (
            <div className='singup-main'>
                <h1 className='singup-title'>Crear cuenta</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Nombres: </FormLabel>
                    <Input placeholder='Enter your name.' className='InputSingup'
                    onChange={(event) => context.setName(event.target.value)}
                    type='text' name='name' />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Primer apellido: </FormLabel>
                    <Input placeholder='Enter your first lastname.' className='InputSingup'
                    onChange={(event) => context.setFirstLastname(event.target.value)}
                    type='text' name='first_lastname' />
                </FormControl>

                <FormControl className='FormControl' isRequired isInvalid={isError}>
                    <FormLabel className='FormLabelSingup' >Email: </FormLabel>
                    <Input
                    type='email'
                    name='email'
                    className='InputSingup'
                    placeholder='Enter your email.'
                    value={input}
                    onChange={handleInputChange}
                    // onChange={(event) => context.setEmail(event.target.value)}
                    />
                    {
                        !isError ? (
                            <FormHelperText>Ingresa tu correo.</FormHelperText>
                        ) : (
                            <FormErrorMessage>El correo es obligatorio.</FormErrorMessage>
                        )
                    }
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Username: </FormLabel>
                    <Input placeholder='Enter your username.' className='InputSingup'
                    onChange={(event) => context.setUsername(event.target.value)}
                    type='text' name='username' />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Contraseña: </FormLabel>
                    <PasswordInput />
                </FormControl>

                <FormControl className='FormControl FormControl-Cel-Singup'>
                    <Button
                    className='ButtonControlSingup'
                    type='submit'
                    onClick={() => {
                        CreateUser();
                    }}>Crear cuenta</Button>
                    <h3 className='singup-login-question'>
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                    </h3>
                    {/* <Link
                    // to='/authenticate-user'
                    >
                    </Link> */}
                </FormControl>
            </div>
            )}
        </Layout>
    )
}
  
export default Singup