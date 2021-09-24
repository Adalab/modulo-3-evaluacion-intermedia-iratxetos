import '../styles/App.scss';
import initialData from '../data/clubs.json';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(initialData);

  const [newClub, setNewClub] = useState(
    {
      name: '',
      openOnWeekdays: '',
      openOnWeekend: '',
    }
  );

  const htmlClubList = data.map((oneClub, index) => (
    <li className='club__item' key={index}>
      <p className='club__name'>
        {oneClub.name}
      </p>
      <p className='club__weekdays'>
        {`Abierto entre semana: ${oneClub.openOnWeekdays}`}
      </p>
      <p className='club__weekend'>
        {`Abierto el fin de semana: ${oneClub.openOnWeekend}`}
      </p>
    </li>
  ));

  const handleChangeNewClub = (ev) => {
    const elementIdChanged = (ev.currentTarget.id);
    const elementValueChanged = (ev.currentTarget.value);
    setNewClub({
      ...newClub,
      [elementIdChanged]: elementValueChanged
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newClub]);
    setNewClub({
      name: '',
      openOnWeekdays: '',
      openOnWeekend: '',
    });
  };


  return (
    <div className='page'>
      {/* header */}
      <header className='header'>
        <h1 className='header__title'>Mis clubs</h1>
      </header>

      <main>
        {/* clubs list */}
        <ul className='club__list'>{htmlClubList}</ul>

        {/* new club */}
        <form className='new-club__form'>
          <h2 className='new-club__title'>Añadir un nuevo club</h2>
          <label className='new-club__label'>
            Nombre del club
            <input
              className='new-club__input'
              type='text'
              name='name'
              id='name'
              placeholder='Pepino'
              onChange={handleChangeNewClub}
              value={newClub.name}
            />
          </label>
          <label className='new-club__label'> ¿Abre entre semana?
            <input
              className='new-club__input'
              type='checkbox'
              name='openOnWeekdays'
              id='openOnWeekdays'
              onChange={handleChangeNewClub}
              value={newClub.openOnWeekdays}
            />
          </label>
          <label className='new-club__label'>¿Abre los fines de semana?
            <input
              className='new-club__input'
              type='checkbox'
              name='openOnWeekend'
              id='openOnWeekend'
              onChange={handleChangeNewClub}
              value={newClub.openOnWeekend}
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
    </div>
  );
}

export default App;
