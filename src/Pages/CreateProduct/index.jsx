import { useContext } from 'react'
import { StoreContext } from '../../Context'
import {
    Input, Button, InputGroup, InputRightElement,
    FormControl, FormLabel,
    ChakraProvider, Select, Textarea
} from '@chakra-ui/react'
import UploadImage from '../../Components/UploadImage';
import Layout from '../../Components/Layout';
import './CreateProduct.css'

const CreateProduct = () => {

    const context = useContext(StoreContext)

    const renderTypeProducts = () => {
        if (context.typePoducts?.length > 0) {
            return (
                context.typePoducts?.map(t_product => (
                    <option
                        key={t_product.type_product_id}
                        value={t_product.type_product_id}
                    >{t_product.name}</option>
                ))
            )
        }
    }

    const CreateProductApi = () => {

        // context.setViewAuth(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'name': context.nameProductToCreate,
                    'username': context.priceProductToCreate,
                    'type_product_id': context.typeProductToCreate,
                    'email': context.descriptionProductToCreate,
                    'user_id': 1,
                    'image': context.imgProductToCreate,
                }
            )
        };

        context.setAuthenticated(true)
        context.setIsOpen(true)

        fetch('http://localhost:3000/dev/products', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data: ', data)
                context.setDataCreateProductAPI(data)
            });

    }

    return (
        <Layout>
            <div className='singup-main'>
                <h1 className='singup-title'>Crear un producto</h1>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Nombre del producto</FormLabel>
                    <Input
                        type='text'
                        name='product_name'
                        placeholder='Nombre del producto'
                        className='InputSingup'
                        onChange={(event) => context.setNameProductToCreate(event.target.value)}
                    />
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Precio del producto</FormLabel>
                    <Input
                        type='number'
                        name='product_price'
                        placeholder='¿Qué precio tendrá el producto?'
                        className='InputSingup'
                        onChange={(event) => context.setPriceProductToCreate(event.target.value)}
                    />
                </FormControl>

                <FormControl className='FormControl'>
                    <FormLabel className='FormLabelSingup'>Tipo del producto</FormLabel>
                    <Select
                        className='select-type-product'
                        placeholder='Select country'
                        onChange={(event) => context.setTypeProductToCreate(event.target.value)}
                    >
                        {renderTypeProducts()}
                    </Select>
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Imagen</FormLabel>
                    {/* <UploadImage /> */}
                    <input
                        onChange={(event) => context.setImgProductToCreate(event.target.value)}
                        type="file" name="image" accept="image/*"
                    ></input>
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Tipo del producto</FormLabel>
                    <Textarea className='create-p-textarea' placeholder='Escribe sobre el producto' />
                </FormControl>

                <FormControl className='FormControl FormControl-Cel-Singup'>
                    <Button
                        className='ButtonControlSingup'
                        type='submit'
                        onClick={() => {CreateProductApi();}}
                    >Crear producto</Button>

                </FormControl>
            </div>
        </Layout>
    )
}

export default CreateProduct