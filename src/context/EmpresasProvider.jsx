import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const EmpresasContext = createContext();

const EmpresasProvider = ({children}) => {

    const [empresas, setEmpresas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [empresa, setEmpresa] = useState({});
    const [cargando, setCargando] = useState(false);
    const [ modalFormularioArticulo, setModalFormularioArticulo ] = useState(false)
    

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerEmpresas = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/empresas', config)
                setEmpresas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerEmpresas()
    }, [auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitEmpresa = async empresa => {
        if(empresa.id) {
            await editarEmpresa(empresa)
        } else {
            await nuevoEmpresa(empresa)
        }
    }

    const editarEmpresa = async empresa => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/empresas/${empresa.id}`, empresa, config)

            setAlerta({
                msg: 'Empresa Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/empresas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoEmpresa = async empresa => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/empresas', empresa, config)

            setEmpresas([...empresas, data])

            setAlerta({
                msg: 'Empresa Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/empresas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerEmpresa = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/empresas/${id}`, config )
            setEmpresa(data)
            setAlerta({})
        } catch (error) {
            navigate('/empresas')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarEmpresa = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/empresas/${id}`, config)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/empresas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalArticulo = () => {
        setModalFormularioArticulo(!modalFormularioArticulo)
        setArticulo({})
    }

    const submitArticulo = async articulo => {
        if(articulo?.id) {
            await editarArticulo(articulo)
        } else {
            await crearArticulo(articulo)
        }
    }

    

    return (
        <EmpresasContext.Provider
            value={{
                empresas,
                mostrarAlerta,
                alerta,
                submitEmpresa,
                obtenerEmpresa,
                empresa,
                cargando,
                eliminarEmpresa,
                
            }}
        >{children}
        </EmpresasContext.Provider>
    )
}
export { 
    EmpresasProvider
}

export default EmpresasContext