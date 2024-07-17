import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context'
import {
    Input, Button, FormControl, FormLabel, Select, Textarea
} from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import './CreateProduct.css'
import { crearProducto } from '../../Utils/data'

const CreateProduct = () => {

    const context = useContext(StoreContext)
    const [fileame, setFilename] = useState(null)
    const navigate = useNavigate()

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

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        const filename = event.target.value;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                setFilename(filename);
                context.setImgProductToCreate(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const CreateProductApi = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'name': context.nameProductToCreate,
                    'price': parseInt(context.priceProductToCreate),
                    'type_product_id': parseInt(context.typeProductToCreate),
                    'description': context.descriptionProductToCreate,
                    'user_id': context.userData?.user_id,
                    'username': context.globalUsername,
                    'file': {
                        'filename': fileame,
                        'image': context.imgProductToCreate,
                    }
                }
            )
        };

        context.setResultAPICreateProduct(crearProducto); // -----> borrar
        navigate('/perfil'); // -----> borrar

        // const URL = 'http://localhost:3030/dev/products';
        // fetch(URL, requestOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //         context.setResultAPICreateProduct(data);

        //         if (data.statusCode == 200) {
        //             navigate('/perfil');
        //         }
        //     });
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
                        className='InputSingup'
                        placeholder=' Escribe el nombre del producto'
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
                    <FormLabel className='FormLabelSingup'>Categoría del producto</FormLabel>
                    <Select
                        className='select-type-product'
                        // placeholder='Categoría del producto'
                        onChange={(event) => context.setTypeProductToCreate(event.target.value)}
                    >
                        {renderTypeProducts()}
                    </Select>
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Imagen</FormLabel>
                    {/* <UploadImage /> */}
                    <input
                        // onChange={(event) => context.setImgProductToCreate(event.target.files[0])}
                        onChange={handleFileChange}
                        type="file" name="image" accept="image/*"
                    ></input>
                </FormControl>

                <FormControl className='FormControl' isRequired>
                    <FormLabel className='FormLabelSingup' >Descripción del producto</FormLabel>
                    <Textarea 
                        onChange={(event) => context.setDescriptionProductToCreate(event.target.value)}
                        className='create-p-textarea'
                        placeholder='Escribe detalles del producto'
                    />
                </FormControl>

                <FormControl className='FormControl FormControl-Cel-Singup'>
                    <Button
                        type='submit'
                        className='ButtonControlSingup'
                        onClick={() => {CreateProductApi();}}
                    >
                        Crear producto
                    </Button>
                </FormControl>
            </div>
        </Layout>
    )
}

export default CreateProduct