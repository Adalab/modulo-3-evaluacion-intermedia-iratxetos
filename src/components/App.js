import '../styles/App.scss';
import initialData from '../data/clubs.json';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(initialData);
  const [searchClub, setSearch] = useState('all');
  const [newClub, setNewClub] = useState(
    {
      name: '',
      openOnWeekdays: false,
      openOnWeekend: false,
    }
  );
  const [theme, setTheme] = useState('light');
  const [activate, setActiveMode] = useState('');

  //SWITCH
  const handleSwitch = (ev) => {
    if (activate === '') {
      setTheme('dark');
      setActiveMode('active');
    } else {
      setTheme('light');
      setActiveMode('');
    };
  }

  //BUSCADOR SELECT
  const handleSearchClub = (ev) => {
    setSearch(ev.target.value);
  };

  //CREACIÓN DE NUEVO CLUB EN EL LISTADO
  const handleChangeNewClub = (ev) => {
    const elementIdChanged = (ev.currentTarget.id);
    const elementValueChanged = (ev.currentTarget.value);
    setNewClub({
      ...newClub,
      [elementIdChanged]: elementValueChanged
    });
  };

  //TOMA LOS VALORES DEL NUEVO CLUB
  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newClub]);
    setNewClub({
      name: '',
      openOnWeekdays: false,
      openOnWeekend: false,
    });
  };

  //BORRAR CLUB
  const handleDeleteClub = (ev) => {
    const deletedClub = parseInt(ev.target.id);
    const deletedClubPosition = data.findIndex((club) => { return deletedClub === club.id });
    console.log(deletedClubPosition);
    data.splice(deletedClubPosition, 1);
    setData([...data]);
  };

  //MUESTRA LA LISTA DE CLUBS FILTRADA
  const renderClubList = () => {
    return data
      .filter((data) => {
        if (searchClub === 'openOnWeekdays') {
          return data.openOnWeekdays === true;
        } else if (searchClub === 'openOnWeekend') {
          return data.openOnWeekend === true;
        }
        return true;
      })

      .map((club, index) => (
        <li className={`club__item ${theme}`} key={index}>
          <div className={`club__section ${theme}`}>
            <p className={`club__name ${theme}`}>
              #{index} {club.name}
            </p>
            <p className={`club__weekdays ${theme}`}>
              {`Abierto entre semana: ${club.openOnWeekdays ? 'Si' : 'No'}`}
            </p>
            <p className={`club__weekend ${theme}`}>
              {`Abierto el fin de semana: ${club.openOnWeekend ? 'Si' : 'No'}`}
            </p>
          </div>
          <button className={`club__delete ${theme}`} id={club.id} onClick={handleDeleteClub}>X</button>
        </li>
      ));
  };


  //PINTAMOS EL HTML DE LA FUNCIÓN
  return (
    <div className={`page  ${theme}`}>

      {/* header */}
      <header className='header'>
        <h1 className={`header__title  ${theme}`}>Mis clubs</h1>

        <button className={`switch ${activate}`} id='switch' onClick={handleSwitch} >
          <span><i class='fas fa-moon'></i></span>
          <span><i class="fas fa-sun"></i></span>
        </button>

        <form action="">
          <select className={`header__search  ${theme}`} onChange={handleSearchClub}>
            <option value="all">Todos</option>
            <option value="openOnWeekdays">Los que abren entre semana</option>
            <option value="openOnWeekend">Lo que abren fines de semana</option>
          </select>
        </form>
      </header>

      <main>
        {/* clubs list */}
        <ul className='club__list'>{renderClubList()}</ul>

        {/* new club */}
        <form className={`new-club__form ${theme}`} >
          <h2 className={`new-club__title ${theme}`}>Añadir un nuevo club</h2>
          <label className={`new-club__label ${theme}`}>
            Nombre del club
            <input
              className={`new-club__label--input ${theme}`}
              type='text'
              name='name'
              id='name'
              placeholder='Escribe el nombre'
              onChange={handleChangeNewClub}
              value={newClub.name}
            />
          </label>
          <label className={`new-club__label ${theme}`}> ¿Abre entre semana?
            <input
              className={`new-club__label--input ${theme}`}
              type='checkbox'
              name='openOnWeekdays'
              id='openOnWeekdays'
              onChange={handleChangeNewClub}
              checked={newClub.openOnWeekdays}
            />
          </label>
          <label className={`new-club__label ${theme}`}>¿Abre los fines de semana?
            <input
              className={`new-club__label--input ${theme}`}
              type='checkbox'
              name='openOnWeekend'
              id='openOnWeekend'
              onChange={handleChangeNewClub}
              checked={newClub.openOnWeekend}
            />
          </label>
          <input
            className={`new-club__btn ${theme}`}
            type='submit'
            value='Añadir'
            onClick={handleClick}
          />
        </form>
      </main>
      <footer>
        <small className="copy"> Evaluación Intermedia React <span className='authorName'>Iratxe Martin</span> &copy; 2021 </small>
      </footer >
    </div >
  );

}

export default App;
