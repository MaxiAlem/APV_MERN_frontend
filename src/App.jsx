import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdminPacientes from './paginas/AdminPacientes';
import CambiarPassword from './paginas/CambiarPassword';
import EditarPerfil from './paginas/EditarPerfil';



import {AuthProvider} from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* para tener el state en todos los Routes...el provider de autenticacions */}
        <PacientesProvider>
          <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='olvide-password' element={<OlvidePassword/>}/>
            <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
            <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>            
          </Route>

          <Route path='/admin' element={<RutaProtegida/>}>
            <Route index element={<AdminPacientes/>}/>
            <Route path='perfil' element={<EditarPerfil/>}/>
            <Route path='cambiar-password' element={<CambiarPassword/>}/>
          </Route>
        </Routes>
        </PacientesProvider>
        
      </AuthProvider>
      
    </BrowserRouter>
  )
}

export default App
