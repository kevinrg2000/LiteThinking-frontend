import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'


import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Empresas from './paginas/Empresas'
import {AuthProvider}  from './context/AuthProvider'

import {EmpresasProvider} from './context/EmpresasProvider'
function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <EmpresasProvider>
          <Routes>
              <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrar" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route path="olvide-password/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>
                  
              <Route path="/empresas" element={<Empresas />}>
              </Route>
          </Routes>
        </EmpresasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
