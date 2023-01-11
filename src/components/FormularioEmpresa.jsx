import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'
import useEmpresas from '../hooks/useEmpresas'
const FormularioEmpresa = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nit, setNit] = useState('')
    const [telefono, setTelefono] = useState('')
    const [articulos, setArticulos] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const params = useParams();
    const {  submitEmpresa, empresa } = useEmpresas();

    useEffect(() => {
        if( params.id ) {
            setId(empresa._id)
            setNombre(empresa.nombre)
            setDireccion(empresa.direccion)
            setNit(empresa.nit)
            setTelefono(empresa.telefono)
            setArticulos(empresa.articulos)
            
        } 
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault();
        
        if([nombre, direccion, nit,telefono].includes('') ) {
            setAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }
        // Crear la empresa en el api 
        try {
            
            await submitEmpresa({ id,nombre,direccion,nit,telefono,alerta})

            setId(null)
            setNombre('')
            setDireccion('')
            setNit('')
            setTelefono('')
            
            setAlerta({
                msg: 'Empresa creada correctamente',
                error: false
            })
            return

            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }        
    }

    const { msg } = alerta

    return (
            <form 
                className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                    {msg && <Alerta alerta={alerta} />}

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="nombre"
                        >Nombre Empresa</label>

                        <input
                            id="nombre"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Nombre del Empresa"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="dirección"
                        >Dirección</label>

                        <input
                            id="direccion"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Dirección del Empresa"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="nit"
                        >NIT</label>

                        <input
                            id="nit"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="NIT del Empresa"
                            value={nit}
                            onChange={e => setNit(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="cliente"
                        >telefono</label>

                        <input
                            id="cliente"
                            type="number"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Telefono de la empresa"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value={id ? 'Actualizar Empresa': 'Crear Empresa'}
                        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                    />
            </form>
    )
}

export default FormularioEmpresa