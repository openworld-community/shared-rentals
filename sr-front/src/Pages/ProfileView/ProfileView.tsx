import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ArrowBack from '../../assets/arrow_back.svg';
import { Button } from '../../Components/Button/Button';
import './ProfileView.css';

export const ProfileView: FC = () => {
  return (
    <>
      <div className="py-3 px-4 flex items-center space-x-4 border-b">
        <div className="flex-grow-0">
          <Link to="/profiles">
            <img src={ArrowBack} />
          </Link>
        </div>
        <div className="flex-1 text-center font-semibold">Просмотр анкеты</div>
      </div>
      <div className="profile-view__container">
        <div className="p-4 flex justify-center">
          <h2>Анкета соседа</h2>
        </div>
        <div className="flex justify-center">
          <div className="profile-view__image"></div>
        </div>
        <div className="profile-view__bio">
          <h2>Алина, 26 лет</h2>
          <span>жен.</span>
        </div>
        <div className="profile-view__description">
          <p>
            <span>Ищу соседа:</span> только я
          </p>
          <p>
            <span>Локация аренды:</span> Сербия, Белград
          </p>
          <p>
            <span>Дата аренды:</span> август, 2023
          </p>
          <p>
            <span>Срок аренды:</span> 3 месяца
          </p>
          <p>
            <span>Стоимость на одного:</span> 0 - 1 000$
          </p>
          <p>
            <span>Домашнее животное:</span> нет
          </p>
          <p>
            <span>О себе:</span> Веду тихий образ жизни. Работаю из дома.
          </p>
        </div>
        <div className="py-4 flex justify-center">
          <Button>Открыть контакт</Button>
        </div>
      </div>
    </>
  );
};
