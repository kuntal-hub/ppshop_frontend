import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='flex flex-nowrap justify-center fixed top-0 left-0 h-14 w-screen bg-blue-500'>
        <NavLink to={"/"}
        className={`${({ isActive, isPending })=> isPending ? "pending" : isActive ? "active" : ""} pending`}
        >
            Info
        </NavLink>

        <NavLink to={"/entry"}
        className={`${({ isActive, isPending })=> isPending ? "pending" : isActive ? "active" : ""} pending`}
        >
            Entry
        </NavLink>

        <NavLink to={"/reports"}
        className={`${({ isActive, isPending })=> isPending ? "pending" : isActive ? "active" : ""} pending`}
        >
            Report
        </NavLink>

        <NavLink to={"/balance"}
        className={`${({ isActive, isPending })=> isPending ? "pending" : isActive ? "active" : ""} pending`}
        >
            Balance
        </NavLink>

        <NavLink to={"/account"}
        className={`${({ isActive, isPending })=> isPending ? "pending" : isActive ? "active" : ""} pending`}
        >
            Account
        </NavLink>
    </div>
  )
}
