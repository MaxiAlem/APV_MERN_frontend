import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  

  const handleSubmit = async e =>{
    e.preventDefault();

    if(email === '' || email.lenght < 6){
      setAlerta({msg: "el Email es Obligatorio", 
      error:true})
      return
    }
    try {
      const {data}= await clienteAxios.post('/veterinarios/olvide-password',{email});
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Recupera tu Acceso y no Pierdas{""}
              <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>
        <div>
           {msg && <Alerta
            alerta={alerta}
          />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  email
                </label>
                <input
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}//leemos el value y lo cargamos en el useState
                />
            </div>
            <input
              type="submit"
              value="Enviar Instrucciones"
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
                to="/registrar">Registrate</Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword