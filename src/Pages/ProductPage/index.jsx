import React, { useState, useContext } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import {
    Input, Button, InputGroup, InputRightElement, FormControl, FormLabel
} from '@chakra-ui/react'
import Layout from '../../Components/Layout'
import { StoreContext } from '../../Context'
import './ProductPage.css'
import AuthenticateUser from '../../Components/AuthenticateUser'

function ProductPage() {

    return (
        <Layout>
            <div className='product-page-main'>
                <div className='product-detail'>
                    <h1>Hoodie 'Nike' oversize</h1>
                    <p>Hoodie casual</p>
                    <h3>$400.000</h3>
                    <br />
                    <p>
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
                    </p>
                    <br />
                    <p>
                        2024-07-18
                    </p>
                </div>
                <div className='product-image'>
                    <figure>
                        <img src="https://cdn-images.farfetch-contents.com/18/90/65/88/18906588_41130828_1000.jpg" alt="" />
                    </figure>
                </div>
            </div>
        </Layout>
    )
}

export default ProductPage