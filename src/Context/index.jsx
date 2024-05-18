import { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [username, setUsername] = useState(0)
    const [password, setPassword] = useState(0)
    const [email, setEmail] = useState(0)
    const [name, setName] = useState(0)
    const [firstLastname, setFirstLastname] = useState(0)

    const [dataSingup, setDataSingup] = useState(0)

    // console.log('username: ', username)
    // console.log('password: ', password)

    return (
        <StoreContext.Provider value={{
            username,
            setUsername,
            password,
            setPassword,
            dataSingup, setDataSingup,
            email, setEmail,
            name, setName,
            firstLastname, setFirstLastname
        }}>
            {children}
        </StoreContext.Provider>
    )
}