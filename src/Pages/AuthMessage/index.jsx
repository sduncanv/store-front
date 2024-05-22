import React, { useState, useContext } from 'react';
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'


function AuthMessage() {

    const context = useContext(StoreContext)
  
    return (
        <Layout>
            {
                context.isRegistered ? (
                    <div>good</div>
                ) : (
                    <div>bad</div>
                )
            }
        </Layout>
    )
}

export default AuthMessage