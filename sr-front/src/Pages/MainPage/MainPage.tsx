import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Components/Button/Button';
import './MainPage.css';
import logo from '../../assets/logo.png';
import serachIcon from '../../assets/ic_search.svg';

export const MainPage = () => {
  return (
    <>
      <div className="py-3 px-4 flex items-center space-x-4 border-b">
        <div className="flex-grow-0">
          <img src={logo} />
        </div>
        <div className="flex-1 font-light text-xs items-center">
          <div className="flex items-center justify-center space-x-1">
            <img src={serachIcon} />
            <span>Поиск соседа</span>
          </div>
        </div>
        <div className="flex-grow-0">
          <Link to="/login">
            <div className="px-2 py-1 rounded bg-neutral-400 text-white text-sm">
              Войти
            </div>
          </Link>
        </div>
      </div>
      <div className="px-8 py-7 block space-y-4 bg-neutral-400 text-white text-center">
        <h1>Сервис поиска твоего идеального соседа по всему миру</h1>
        <p className="text-sm">
          Хочешь сэкономить на жилье? Не знаешь, где найти соседа “в складчину”?
          Переживаешь, что не сойдетесь характерами?{' '}
        </p>
        <p>Наш сервис Shared Rentals создан для тебя</p>
        <Button width="100%" onClick={() => console.log('Регистрация')}>
          Найти соседа
        </Button>
      </div>
      <div className="p-4">
        <p className="text-center font-semibold">
          Найдите соседа, указав необходимые данные для поиска
        </p>
        <div className="search">
          <div className="search__icon">
            <img src={serachIcon} />
          </div>
          <div className="search__item">Куда?</div>
          <div className="search__item">Когда?</div>
          <div className="search__item">С кем?</div>
        </div>
      </div>
    </>
  );
};
