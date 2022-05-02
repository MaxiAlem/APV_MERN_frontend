import { Link } from "react-router-dom";
import { useState } from "react";
//import axios from 'axios'
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirpassword, setrepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit  = async e=>{
    e.preventDefault();

    if([nombre,email,password,repetirpassword].includes('')){
      setAlerta({msg: 'Todos los Campos son Obligatorios', error:true})
      return
    }

    if(password !== repetirpassword){
      setAlerta({msg: 'Ambos passwords deben ser iguales', error:true})
      return
    }

    if(password.length < 6){
      setAlerta({msg: 'Tu password debe tener minimo 6 caracteres', error:true})
      return
    }

    setAlerta({})//la vaciamos

    //creamos el usuario en la API
    //en VITE el enviroment se llama con import.meta.env y el nombre debe empezar siempre con VITE
    try {
     
    await clienteAxios.post(`/veterinarios`,{nombre, email, password})
    
    setAlerta({
      msg: 'Creado Correctamente, revisa tu email',
      error: false
    })
    
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,//traemos los errores desde las validaciones creadas en el Backend
        error: true
      })
    }

  }

  const {msg} = alerta

    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Registrate y Administra {""}
              <span className="text-black"> tus Pacientes</span>
              </h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white">
          {msg && <Alerta
            alerta={alerta}
          />}
            <form
              onSubmit={handleSubmit}
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  nombre
                </label>
                <input
                type="text"
                placeholder="Nombre de Usuario"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nombre}
                onChange= {e=> setNombre(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  email
                </label>
                <input
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange= {e=> setEmail(e.target.value)}
                />
              </div>
              
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  password
                </label>
                <input
                type="password"
                placeholder="password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange= {e=> setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  confirma tu password
                </label>
                <input
                type="password"
                placeholder="repite tu password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirpassword}
                onChange= {e=> setrepetirPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Crear Cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800
                md:w-auto"
              />
              </form>

              

              <nav className="my-10 lg:flex lg:justify-between">
                <Link
                  className="block my-5 text-center text-gray-500"
                  to="/">¿Ya Tienes una Cuenta? Inicia Sesion</Link>
                <Link
                  className="block my-5 text-center text-gray-500"
                  to="/olvide-password">Olvide mi pasword</Link>
                  {/* reemplaza al a href en react, para emjor performance */}
              </nav>
            

          </div>
          


      
      </>
    )
  }
  
  export default Registrar