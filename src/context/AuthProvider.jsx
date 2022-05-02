import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const AuthContext = createContext();

const AuthProvider =  ({children})=>{

    const [cargando, setCargando]= useState(true)
    const [auth, setAuth] = useState();

    useEffect(()=>{//una vez que obtenemos el token lo vamos a usar para poder navegar en las paginas privadas 
        const autenticarUsuario = async()=>{
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false)
                return
            };

            const  config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            };
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                //el get es el default en axios por lo que no hace falta ponrlo
                setAuth(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})//en caso de un error, vaciamos el token por seguridad
            }
            setCargando(false)
        }   
        autenticarUsuario()         
    },[])

    const cerrarSesion=()=>{
        localStorage.removeItem('token')
        setAuth({})
    };
        //removemos le token del localsotrage y limpioamos el useState


    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false)
                return
            };

            const  config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            try {
                const url=`/veterinarios/perfil/${datos._id}`
                const {data} = await clienteAxios.put(url, datos, config)
                
                return  {
                    msg: 'Almacenado correctamente'
                }
            } catch (error) {
                return({
                    msg: error.response.data.msg,
                    error:true
                })
            }
    }

    const guardarPassword = async(datos)=>{
        const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false)
                return
            };

            const  config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            };

            try {
                const url = '/veterinarios/actualizar-password'
                const{data}= await clienteAxios.put(url, datos, config);
                console.log(data)
                return{
                    msg:data.msg
                }
            } catch (error) {
                return {
                    msg:error.response.data.msg,
                    error:true
                }
            }
    }
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion, 
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};


export {
    AuthProvider
}

export default AuthContext