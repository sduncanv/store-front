import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
// import { useNumberInput, HStack, Button, Input } from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import './ProductPage.css'


function ProductPage() {

    const location = useLocation()
    const productFromState = location.state?.product
    const [responseGetProduct, setResponseGetProduct] = useState(productFromState || null)

    const { product_id } = useParams()

    useEffect(() => {
        if (!productFromState) {
            const URL = `http://localhost:3004/dev/products?product_id=${product_id}`
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode == 200) {
                        setResponseGetProduct(data.data[0])
                    } else {
                        console.log("Error solicitando datos de un producto.")
                    };
                });
        }
    }, [productFromState, product_id])

    // const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    //     step: 1,
    //     defaultValue: 1,
    //     min: 1,
    //     max: 10,
    // //  precision: 2,
    // })

    // const inc = getIncrementButtonProps()
    // const dec = getDecrementButtonProps()
    // const input = getInputProps()

    return (
        <Layout>
            <div className='product-page-main'>
                <div className='product-detail'>
                    <h1>{responseGetProduct.name}</h1>
                    <br />
                    <h3>$ {responseGetProduct.price}</h3>
                    {/* <br />
                    <HStack className='ppm-HStack'>
                        <Button className='ppm-Button' {...dec}>-</Button>
                        <Input className='ppm-Input' {...input} />
                        <Button className='ppm-Button' {...inc}>+</Button>
                    </HStack> */}
                    <br />
                    {/* <p>{responseGetProduct.description}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: responseGetProduct.description }} />
                    <br />
                    <p>{responseGetProduct.created_at}</p>
                </div>
                <div className='product-image'>
                    <figure><img src={responseGetProduct.url} alt="" /></figure>
                </div>
            </div>
        </Layout>
    )
}

export default ProductPage