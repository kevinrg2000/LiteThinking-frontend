import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ tipo, setTipo ] = useState(1)
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})


    

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, tipo, password, repetirPassword].includes('')) {
           setAlerta({
               msg: 'Todos los campos son obligatorios',
               error: true
           })
           return
        }

        if(password !== repetirPassword ) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlerta({
                msg: 'El Password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
            const { data } = await clienteAxios.post(`/usuarios/registrar`, {nombre, email, password, tipo} )

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setTipo('')
            setPassword('')
            setRepetirPassword('')
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus {''}
            <span className="text-slate-700">empresa</span>
        </h1>

        { msg && <Alerta alerta={alerta} /> }
    
        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre"
                >Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2"
                >Repetir Password</label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Tipo de Usuario</label>
                
            <div class="grid w-[100%] grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2 border 10" >
                <input id="bordered-radio-1" 
                class="w-5 h-5 bg-sky-700 bg-gray-100 border-gray-100 focus:ring-blue-500 dark:focus:bg-sky-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="radio" 
                value={1} 
                name="bordered-radio"
                checked={tipo ==1?true:false}
                onChange={e => setTipo(e.target.value)}
                />
                <label 
                for="bordered-radio-1"
                class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                    Administrador</label>
            </div>
            <br/>
            <div class="grid w-[100%] grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">
                <input checked="" 
                id="bordered-radio-2" 
                class="w-5 h-5 bg-sky-700 bg-gray-100 border-gray-100 focus:ring-blue-500 dark:focus:bg-sky-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="radio" 
                value={2} 
                name="bordered-radio"
                checked={tipo ==2?true:false}
                onChange={e => setTipo(e.target.value)}
                />
                <label for="bordered-radio-2" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Externo</label>
            </div>

            </div>

            <input 
                type="submit"
                value="Crear Cuenta"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
            
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>

            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/olvide-password"
            >Olvide Mi Password</Link>
        </nav>
    
    </>
  )
}

export default Registrar