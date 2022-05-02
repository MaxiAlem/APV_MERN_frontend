import { Link } from "react-router-dom"
const AdminNav = () => {
  return (
    <nav className="flex gap-3">
        <Link to='/admin/perfil'
            className="font-bolt uppercase text-gray-500">
        Perfil</Link>
        <Link to='/admin/cambiar-password'
            className="font-bolt uppercase text-gray-500">
        Cambiar password</Link>

    </nav>
  )
}

export default AdminNav