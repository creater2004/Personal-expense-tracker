import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <Link to={user ? "/dashboard" : "/login"} className="brand">
        <img className="brand-logo" src="/expense-tracker.svg" alt="" aria-hidden="true" />
        <span>Expense Tracker</span>
      </Link>
      {user ? (
        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/expenses/add">Add expense</NavLink>
          <span className="user-greeting">Hi, {user.name}</span>
          <button className="button button-small" onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <nav className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <Link className="button button-small" to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
