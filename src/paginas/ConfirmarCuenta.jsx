import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
//import axios from "axios"-- como importamos el file dl cnfig para axios, no hace falta importarlo hasta aca
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {id} = params

  useEffect(()=>{
    const confirmarCuenta= async()=>{
      try {
        
        const{data}= await clienteAxios.get(`/veterinarios/confirmar/${id}`)
        setCuentaConfirmada(true);
        setAlerta({
          msg:data.msg
        })
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
      setCargando(false)
    } 
    confirmarCuenta()
  },[])

    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Confirma tu Cuenta y empieza a Administrar {""}
              <span className="text-black"> tus Pacientes</span>
              </h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white">
            {!cargando && <Alerta
            //con el useState de cargando, esperamods a que termine el async y este se vuelva false
            //para que habilite el mensaje de alerta desps de resolver la busqueda en la DB
              alerta = {alerta}
            />}
              
            {cuentaConfirmada && (
              <Link
              className="block my-5 text-center text-gray-500"
              to="/">Inicia Sesion</Link>
            )}
            
          </div>
          


      
      </>
    )
  }
  
  export default ConfirmarCuenta