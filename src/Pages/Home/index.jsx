import { useContext } from 'react'
import { StoreContext } from '../../Context'
import Layout from '../../Components/Layout'

function Home() {

    const context = useContext(StoreContext)

    return (
        <Layout>
            <h1>Prueba Layout</h1>
        </Layout>
    )
}

export default Home