import { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [prueba, setPrueba] = useState(0)
    console.log('prueba: ', prueba)

    return (
        <StoreContext.Provider value={{
            prueba,
            setPrueba
        }}>
            {children}
        </StoreContext.Provider>
    )
}