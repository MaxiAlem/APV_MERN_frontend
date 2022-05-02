import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdminPacientes = () => {
  const [mostrarForm, setmostrarForm] =useState(false)
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={()=>setmostrarForm(!mostrarForm)}  //podemos mostrar u ocultar el from.swirchea el estado de true o dfalse
      >
        {mostrarForm ? 'Ocultar Formulario' : 'Mostrar formulario'}
      </button>
      <div className={`${mostrarForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>


      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes/>
      </div>
    </div>
  )
}

export default AdminPacientes