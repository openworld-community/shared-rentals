import React, { FC } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from '../../Components/Button/Button';
import { ProfileList } from '../ProfileList/ProfileList';
import './Profiles.css';

const users = [
  {
    name: 'Алина',
    age: '26',
    sex: 0,
    city: 'Белград',
    description:
      'Веду тихий образ жизни. Работаю из дома. Хочу найти чистоплотного',
  },
  {
    name: 'Амин',
    age: '26',
    sex: 1,
    city: 'Белград',
    description:
      'Веду тихий образ жизни. Работаю из дома. Хочу найти чистоплотного',
  },
];

export const Profiles: FC = () => {
  return (
    <>
      <div className="py-3 px-4 flex items-center space-x-4 border-b">
        <div className="flex-grow-0">
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <div className="flex-1 text-center font-semibold">Анкеты соседей</div>
      </div>
      <div className="p-4 flex justify-center">
        <Button icon="btn__filter">Фильтры</Button>
      </div>
      <div className="profiles">
        {users.map(({ name, age, sex, city, description }) => {
          return (
            <ProfileList
              key={name}
              name={name}
              age={age}
              sex={sex}
              city={city}
              description={description}
            />
          );
        })}
      </div>
    </>
  );
};
