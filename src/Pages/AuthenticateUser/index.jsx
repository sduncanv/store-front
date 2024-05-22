import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { FormControl, FormLabel, Input, Button, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
 } from '@chakra-ui/react'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'


const AuthenticateUser = () => {
    
    const context = useContext(StoreContext)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log('1.: ', isOpen)
    if (isOpen == false) {
        onOpen()
        console.log('aaaaaaaa')
        console.log('2.: ', isOpen)
    }
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // if (context.openModal) {
    //     onOpen()
    //     context.setOpenModal(false)
    // }

    const AuthenticateAccount = () => {

        const url = 'http://localhost:3000/dev/authenticate_user'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'username': context.username,
                    'code': context.codeAuth
                }
            )
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setApiCodeAuth(data)

                if (data.statusCode == 200) {
                    context.setIsRegistered(true);
                } else {
                    context.setIsRegistered(false);
                }
            });
    }
  
    return (
        <Layout>
            {/* <div className='singup-main'>
                <h1 className='singup-title'>Autenticar usuario</h1>
                <p>A tu correo envíamos un código de verificación, escribelo aquí.</p>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabel' >Código: </FormLabel>
                    <Input placeholder='Enter your code.' className='Input'
                    onChange={(event) => context.setCodeAuth(event.target.value)}
                    type='text' name='code' />
                </FormControl>

                <FormControl className='FormControl'>
                    <Link to='/authenticated-user'>
                        <Button className='ButtonControl' onClick={() => {
                            AuthenticateAccount();
                        }} type='submit'>Autenticar</Button>
                    </Link>
                </FormControl>
            </div> */}
            <div>
                {/* <Button onClick={onOpen}>Open Modal</Button>
                <Button ml={4} ref={finalRef}>
                    I'll receive focus on close
                </Button> */}
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
        </Layout>
    )
}

export default AuthenticateUser