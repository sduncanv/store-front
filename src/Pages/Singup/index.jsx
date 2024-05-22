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
            <Input className='Input' pr='4.5rem'
            type={show ? 'text' : 'password'} placeholder='Enter password'
            onChange={(event) => context.setPassword(event.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
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
                                <FormLabel className='FormLabel' >Código: </FormLabel>
                                <Input placeholder='Enter your code.' className='Input'
                                onChange={(event) => context.setCodeAuth(event.target.value)}
                                type='text' name='code' />
                            </FormControl>

                            <FormControl className='FormControl'>
                                <Link to='/authenticated-user'>
                                    <Button className='ButtonControl'
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
                <h1 className='singup-title'>Registrarse</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Nombres: </FormLabel>
                    <Input placeholder='Enter your name.' className='Input'
                    onChange={(event) => context.setName(event.target.value)}
                    type='text' name='name' />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Primer apellido: </FormLabel>
                    <Input placeholder='Enter your first lastname.' className='Input'
                    onChange={(event) => context.setFirstLastname(event.target.value)}
                    type='text' name='first_lastname' />
                </FormControl>

                <FormControl className='FormControl' isRequired isInvalid={isError}>
                    <FormLabel className='FormLabel' >Email: </FormLabel>
                    <Input
                    type='email'
                    name='email'
                    className='Input'
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
                    <FormLabel className='FormLabel' >Username: </FormLabel>
                    <Input placeholder='Enter your username.' className='Input'
                    onChange={(event) => context.setUsername(event.target.value)}
                    type='text' name='username' />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabel'>Contraseña: </FormLabel>
                    <PasswordInput />
                </FormControl>

                <FormControl className='FormControl'>
                    <Link
                    // to='/authenticate-user'
                    >
                        <Button
                        className='ButtonControl' type='submit'
                        onClick={() => {
                            CreateUser();
                        }}>Registrarse</Button>
                    </Link>
                </FormControl>
            </div>
            )}
        </Layout>
    )
}
  
export default Singup