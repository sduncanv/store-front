import './Layout.css'

const Layout = ({ children }) => {
    return (
        <div className='layout-main'>
            {children}
        </div>
    )
}

export default Layout