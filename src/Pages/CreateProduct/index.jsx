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
    const date = getDate()

    const [newNameProduct, setNewNameProduct] = useState('Nombre del producto')
    const [newPriceProduct, setNewPriceProduct] = useState('0000000')
    const [newTypeProduct, setNewTypeProduct] = useState('')
    const [newDescriptionProduct, setNewDescriptionProduct] = useState('')
    const [newImageProduct, setnewImageProduct] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const renderTypeProducts = () => {

        if (context.typePoducts?.length > 0) {
            return (
                context.typePoducts?.map(t_product => (
                    <option
                    key={t_product.type_product_id}
                    value={t_product.type_product_id}
                    >
                        {t_product.name}
                    </option>
                ))
            )
        }
    }

    const handleFileChange = (event) => {

        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                // const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
                // setnewImageProduct(base64String)

                const fullBase64 = reader.result
                const pureBase64 = fullBase64.split(',')[1]

                setnewImageProduct(pureBase64)
                setPreviewImage(fullBase64)
            }
            reader.readAsDataURL(file)
        }
    }

    const [isErrorInCreateProduct, setIsErrorInCreateProduct] = useState(false)

    const CreateProductApi = () => {

        const filename = `user_${context.responseGetUser?.user_id}-date_${date.formattedDate}`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'name': newNameProduct,
                    'price': parseInt(newPriceProduct),
                    'type_product_id': parseInt(newTypeProduct),
                    'description': newDescriptionProduct,
                    'user_id': context.responseGetUser?.user_id,
                    'file': {
                        'filename': filename,
                        'image': newImageProduct,
                    }
                }
            )
        }

        const URL = 'http://localhost:3004/dev/products'
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statusCode == 200) {
                    // context.getAllProducts()
                    setIsErrorInCreateProduct(false)
                    navigate('/')
                } else {
                    setIsErrorInCreateProduct(true)
                }
            })
    }

    const price = Number(newPriceProduct)
    const formattedPrice = price.toLocaleString('es-CO', {
        style: 'decimal', minimumFractionDigits: 0,
    })

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
                            onChange={(event) => setNewNameProduct(event.target.value)}
                        />
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup'>Precio del producto</FormLabel>
                        <Input
                            type='number'
                            name='product_price'
                            placeholder='¿Qué precio tendrá el producto?'
                            className='InputSingup'
                            onChange={(event) => setNewPriceProduct(event.target.value)}
                        />
                    </FormControl>

                    <FormControl className='FormControl'>
                        <FormLabel className='FormLabelSingup'>Categoría del producto</FormLabel>
                        <Select
                            className='select-type-product'
                            placeholder='Categoría del producto'
                            onChange={(event) => setNewTypeProduct(event.target.value)}
                        >
                            {/* {renderTypeProducts()} */}
                            <option key='1' value='1'>Ropaaa</option>
                            <option key='2' value='2'>Electrooo</option>
                        </Select>
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Imagen</FormLabel>
                        <input
                            onChange={handleFileChange}
                            type="file" name="image" id="image"  accept="image/*"
                        ></input>
                    </FormControl>

                    <FormControl className='FormControl' isRequired>
                        <FormLabel className='FormLabelSingup' >Descripción del producto</FormLabel>
                        <Textarea
                            onChange={(event) => setNewDescriptionProduct(event.target.value)}
                            className='create-p-textarea'
                            placeholder='Escribe detalles del producto'
                        />
                    </FormControl>

                    {
                        isErrorInCreateProduct ? (
                            <FormControl className='FormControl'>
                                <FormLabel className='FormLabelLogin'>
                                    Error al crear el producto. Intentalo de nuevo.
                                </FormLabel>
                            </FormControl>
                        ) : (null)
                    }

                    <FormControl className='FormControl FormControl-Cel-Singup'>
                        <Button
                            type='submit'
                            className='ButtonControlSingup'
                            onClick={() => {CreateProductApi()}}
                        >
                            Crear producto
                        </Button>
                    </FormControl>
                </div>
                <div className='cadp-preview'>
                    <div className='product-detail'>
                        <h1>{newNameProduct}</h1>
                        <h3>$ {formattedPrice}</h3>
                        <br />
                        <p>{newDescriptionProduct}</p>
                        <br />
                        <p>
                            {date.formattedCurrentDate}
                        </p>
                    </div>
                    <div className='product-image'>
                        <figure>
                            {/* <img src="https://acdn.mitiendanube.com/stores/002/413/552/products/x001-b8a45680c3a1883c8e169738468713791-2a2b3d0b3f1ac46b5e16973849453376-1024-1024.webp" alt="" /> */}
                            {/* <img src={previewImage} alt="Vista previa" /> */}
                            <img src={previewImage ? previewImage : 'https://www.tenvinilo.co/build/images/web/services/upload.jpg'} alt="Vista previa" />
                        </figure>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct