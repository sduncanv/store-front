import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context'
import {
    Input, Button, FormControl, FormLabel, Select, Textarea,
} from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import './CreateProduct.css'
import { getDate } from '../../Utils/index'


const CreateProduct = () => {

    const context = useContext(StoreContext)
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
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                // context.setImgProductToCreate(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const CreateProductApi = () => {

        const date = getDate();
        const filename = `user_${context.userData?.user_id}-date_${date.formattedDate}`;

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
                        'filename': filename,
                        'image': context.imgProductToCreate,
                    }
                }
            )
        };

        const URL = 'http://localhost:3030/dev/products';
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                context.setResultAPICreateProduct(data);

                if (data.statusCode == 200) {
                    navigate('/perfil');
                }
            });
    }

    const [newNameProduct, setNewNameProduct] = useState('Nombre producto');
    const [newPriceProduct, setNewPriceProduct] = useState('0.000.000');
    const [newDescriptionProduct, setNewDescriptionProduct] = useState('');

    const newProductNameChange = (event) => {
        setNewNameProduct(event.target.value);
    };

    const newProductPriceChange = (event) => {
        setNewPriceProduct(event.target.value);
    };

    const newProductDescriptionChange = (event) => {
        setNewDescriptionProduct(event.target.value);
    };

    const formattedPrice = newPriceProduct.toLocaleString('es-CO', {
        style: 'decimal', minimumFractionDigits: 0,
    });
    const price_com = `${formattedPrice}`

    return (
        <Layout>
            <div className='create-and-detail-product'>
                <div className='create-product-main'>
                    <h1 className='singup-title'>Crea y visualiza tu producto</h1>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Escribe el nombre del producto</FormLabel>
                        <Input
                            type='text'
                            name='product_name'
                            className='InputSingup'
                            placeholder=' Escribe el nombre del producto'
                            onChange={newProductNameChange}
                        />
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Precio del producto</FormLabel>
                        <Input
                            type='number'
                            name='product_price'
                            placeholder='¿Qué precio tendrá el producto?'
                            className='InputSingup'
                            onChange={newProductPriceChange}
                        />
                    </FormControl>

                    <FormControl className='FormControl'>
                        <FormLabel className='FormLabelSingup'>Categoría del producto</FormLabel>
                        <Select
                            className='select-type-product'
                            placeholder='Categoría del producto'
                        >
                            {renderTypeProducts()}
                        </Select>
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Imagen</FormLabel>
                        {/* <UploadImage /> */}
                        <input
                            onChange={handleFileChange}
                            type="file" name="image" accept="image/*"
                        ></input>
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Descripción del producto</FormLabel>
                        <Textarea
                            onChangeCapture={newProductDescriptionChange}
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
                <div className='cadp-preview'>
                    <div className='product-detail'>
                        <h1>{newNameProduct}</h1>
                        <h3>$ {price_com}</h3>
                        <br />
                        <p>{newDescriptionProduct}</p>
                        <br />
                        <p>
                            15-85-8547
                        </p>
                    </div>
                    <div className='product-image'>
                        <figure>
                            <img src="https://acdn.mitiendanube.com/stores/002/413/552/products/x001-b8a45680c3a1883c8e169738468713791-2a2b3d0b3f1ac46b5e16973849453376-1024-1024.webp" alt="" />
                            {/* <img src={filePreview} alt="" /> */}
                        </figure>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct