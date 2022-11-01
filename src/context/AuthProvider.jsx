import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [tipo, setTipo] = useState({})  

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                

            } catch (error) {
                setAuth({})
            } 

            setCargando(false)

            
        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                tipo,
                setTipo,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext;