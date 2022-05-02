import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] =useState('');
    const [propietario, setPropietario] =useState('');
    const [email, setEmail] =useState('')
    const [fecha, setFecha] =useState('')
    const [sintomas, setsintomas] =useState('')
    const [id, setId]= useState(null)

    const [alerta, setAlerta] =useState({})

    const { guardarPaciente, paciente } = usePacientes()
    
    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(new Date(paciente.fecha).toISOString())
            setsintomas(paciente.sintomas)
            setId(paciente._id)//seteo para ver si es un pacinete nuevo o estamos editando
            
        }
    },[paciente])

    const handleSubmit= e=>{
        e.preventDefault();

        //Validar el formulario
        if([nombre , propietario,email,fecha,sintomas].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }
        setAlerta({})//limpianmos la alerta
        guardarPaciente({nombre , propietario,email,fecha,sintomas,id});
        setAlerta({
            msg: 'Guardado correctamente'
            });
            //vovlemso a resetear el form
            setNombre('')
            setPropietario('')
            setEmail('')
            setFecha('')
            setsintomas('')
            setId('');
             
    }

    const {msg} = alerta
  return (
    <>
        <h2 className="font-black text-3xl text-center">
            Administrador de pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Añade tus Pacientes y {''}
            <span className="text-indigo-600 font-bold">
            Administralos
            </span>
            </p>
        
        <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}>
             <div className="mb-5">
                <label
                    htmlFor="nomre"
                    className="uppercase text-gray-700 font-bold"
                    >Nombre Mascota</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded md"
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
             </div>
             <div className="mb-5">
                <label
                    htmlFor="propietario"
                    className="uppercase text-gray-700 font-bold"
                    >Nombre Propietario</label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del/la Propietario/a"
                    className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded md"
                    value={propietario}
                    onChange={e=>setPropietario(e.target.value)}
                />
             </div>
             <div className="mb-5">
                <label
                    htmlFor="email"
                    className="uppercase text-gray-700 font-bold"
                    >email</label>
                <input 
                    id="email"
                    type="text"
                    placeholder="email del/la Propietario/a"
                    className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded md"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
             </div>
             <div className="mb-5">
                <label
                    htmlFor="fecha"
                    className="uppercase text-gray-700 font-bold"
                    >Fecha alta</label>
                <input 
                    id="fecha"
                    type="date"
                    
                    className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded md"
                    value={fecha}
                    onChange={e=>setFecha(e.target.value)}
                />
             </div>
             <div className="mb-5">
                <label
                    htmlFor="sintomas"
                    className="uppercase text-gray-700 font-bold"
                    >sintomas</label>
                <textarea 
                    id="sintomas"
                    type="text"
                    placeholder="Describe los Sintomas"
                    className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded md"
                    value={sintomas}
                    onChange={e=>setsintomas(e.target.value)}
                />
             </div>
             <input
                type="submit"
                className="bg-indigo-600 text-white p-3 w-full uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={id ? 'Guardar cambios' : "agregar Paciente" }
             
             />
        </form>
        {msg && <Alerta alerta={alerta}/>}


    </>
  )
}

export default Formulario