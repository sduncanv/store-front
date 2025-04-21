import React, { useState, useContext, useEffect } from 'react'
import { useParams, useLocation, NavLink, Navigate } from 'react-router-dom'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import {
    Input, Button, InputGroup, InputRightElement, FormControl, FormLabel
} from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import './ProductPage.css'
import AuthenticateUser from '../../Components/AuthenticateUser'

function ProductPage() {

    const { product_id } = useParams();
    const [responseGetProduct, setRespondeGetProduct] = useState({})
    
    const location = useLocation();
    const productFromState = location.state?.product;
    const [product, setProduct] = useState(productFromState || null);

    useEffect(() => {
        if (!productFromState) {
            const URL = `http://localhost:3003/dev/products?product_id=${product_id}`
            fetch(URL)
                .then(response => response.json())
                .then(data => {
    
                    if (data.statusCode == 200) {
    
                        setRespondeGetProduct(data.data[0])
                        setProduct(data.data[0])
    
                    } else {
                        console.log("Error")
                    };
                });
        }
    }, [productFromState, product_id])

    // if (!product) return <p>Cargando producto...</p>;

    return (
        <Layout>
            <div className='product-page-main'>
                <div className='product-detail'>
                    <h1>{product.name}</h1>
                    {/* <p>{product.description}</p> */}
                    <h3>$ {product.price}</h3>
                    <br />
                    {/* <p>
                        Hoodie "Nike" Oversize De la colección S5-2024 "VISIÓN".
                    </p>
                    <br />
                    <p>
                        Hoodie Fabricado con nuestra nueva horma de moldería Oversize, en tela 
                        perchada burda color Negro con un peso en gramaje de 320 gr, un peso 
                        que le da contundencia al cuerpo de la tela. Una confección con acabados 
                        premium y acentamientos de costura para conservarse mejor. 
                    </p>
                    <br />
                    <p>
                        Esta desarrollada bajo un molde o fit Oversize intervenido con un aplique 
                        en frente cosido simulación de Parpado Ojo con pupila rojo y un estampado 
                        en serigrafía con relieve en su espalda con el diseño de Lettering LIBERACCI 
                        en color rojo. Apliques de coderas en tela Tapíz con textura de Luna color 
                        Gris Ratón. Su marquilla viene cuadrada y cosida, al igual que sus anteriores 
                        versiones. Unidades Disponibles en tallas S, M y L
                    </p>
                    <br />
                    <p>
                        Medidas (Ancho x Largo):Medidas (Ancho x Largo):
                        Talla S: 62 x 67 cms
                        Talla M: 65 x 69 cms
                        Talla L: 68 x 71 cms
                    </p>
                    <br />
                    <p>
                        Recomendaciones de Cuidado:
                        Recuerda que esta pieza tiene apliques hechos a mano y unidos con maquina y debes 
                        ser cuidadoso con ellos para garantizar la duración de tu prenda:
                    </p>
                    <br />
                    <p>
                        - No retorcer los parpados del aplique de Ojo.
                        - Lavar a mano o en un ciclo muy suave en lavadora.
                        - No remojar la prenda durante mucho tiempo.
                        - No planchar encima de los apliques o estampados (Preferiblemente hacerlo por el revés).
                        - No usar secadora, secar al sol.
                        - No usar blanqueador.
                        - No retorcer para escurrir.
                    </p> */}
                    <p>{product.description}</p>
                    <br />
                    <p>
                        {product.created_at}
                    </p>
                </div>
                <div className='product-image'>
                    <figure>
                        <img src={product.url} alt="" />
                    </figure>
                </div>
            </div>
        </Layout>
    )
}

export default ProductPage