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
        <li className='club__item' key={index}>
          <div className='club__section'>
            <p className='club__name'>
              #{index} {club.name}
            </p>
            <p className='club__weekdays'>
              {`Abierto entre semana: ${club.openOnWeekdays ? 'Si' : 'No'}`}
            </p>
            <p className='club__weekend'>
              {`Abierto el fin de semana: ${club.openOnWeekend ? 'Si' : 'No'}`}
            </p>
          </div>
          <button className='club__delete' id={club.id} onClick={handleDeleteClub}>X</button>
        </li>
      ));
  };


  //PINTAMOS EL HTML DE LA FUNCIÓN
  return (
    <div className='page'>

      {/* header */}
      <header className='header'>
        <h1 className='header__title'>Mis clubs</h1>
        <form action="">
          <select className='header__search' onChange={handleSearchClub}>
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
        <form className='new-club__form'>
          <h2 className='new-club__title'>Añadir un nuevo club</h2>
          <label className='new-club__label'>
            Nombre del club
            <input
              className='new-club__label--input'
              type='text'
              name='name'
              id='name'
              placeholder='Escribe el nombre'
              onChange={handleChangeNewClub}
              value={newClub.name}
            />
          </label>
          <label className='new-club__label'> ¿Abre entre semana?
            <input
              className='new-club__label--input'
              type='checkbox'
              name='openOnWeekdays'
              id='openOnWeekdays'
              onChange={handleChangeNewClub}
              checked={newClub.openOnWeekdays}
            />
          </label>
          <label className='new-club__label'>¿Abre los fines de semana?
            <input
              className='new-club__label--input'
              type='checkbox'
              name='openOnWeekend'
              id='openOnWeekend'
              onChange={handleChangeNewClub}
              checked={newClub.openOnWeekend}
            />
          </label>
          <input
            className='new-club__btn'
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
