import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import AddButton from '../AddButton/AddButton';

import './header.css';

export default function Header({ showAddModal }) {
  const [dulce, setDulce] = useState(false);
  const [salado, setSalado] = useState(false);
  const [inicio, setInicio] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (location.includes('dulce')) {
      setDulce(true);
      setSalado(false);
      setInicio(false);
      return;
    } else if (location.includes('salado')) {
      setSalado(true);
      setDulce(false);
      setInicio(false);
      return;
    } else if (location === '/') {
      setInicio(true);
      setSalado(false);
      setDulce(false);
      return;
    }
    setDulce(false);
    setSalado(false);
    setInicio(false);
  }, [location]);

  return (
    <header className="header">
      <AddButton className="add-btn" showAddModal={showAddModal} />

      <ul className="categories-list">
        <li className={inicio ? 'category active' : 'category'}>
          <Link to="/">INICIO</Link>
        </li>
        <li className={dulce ? 'category active' : 'category'}>
          <Link to="/category/dulce">DULCE</Link>
        </li>
        <li className={salado ? 'category active' : 'category'}>
          <Link to="/category/salado">SALADO</Link>
        </li>
      </ul>

      <form className="search-form">
        <input
          className="search-bar"
          type={'text'}
          placeholder="Buscar..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (search.length === 0) return;
            if (e.key === 'Enter') {
              navigate(`/search/${search}`);
            }
          }}
        />
        <button
          className={search.length ? 'search-btn' : 'search-btn disabled'}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link className="btn-anchor" to={`/search/${search}`}>
            <svg fill="#000" viewBox="0 0 30 30">
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </Link>
        </button>
      </form>
    </header>
  );
}
