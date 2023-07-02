import React, { FC } from 'react';
import CrossIcon from '../../assets/cross.svg';
import LikeIcon from '../../assets/Heart.svg';
import { Button } from '../../Components/Button/Button';
import './ProfileList.css';
import { Link } from "react-router-dom";

interface Props {
  name: string;
  age: string;
  sex: number;
  city: string;
  description: string;
}

export const ProfileList: FC<Props> = ({
  name,
  age,
  sex,
  city,
  description,
}) => {
  return (
    <Link className="profile__container" to="/profileView">
      <div className="profile__bio">
        <div className="profile__icon" />
        <div className="profile__info">
          <div className="item__buttons">
            <span>
              <img src={CrossIcon} />
            </span>
            <span>
              <img src={LikeIcon} />
            </span>
          </div>
          <div className="item__name">
            <h2>
              {name}, {age} лет
            </h2>
            <span>{sex === 0 ? 'жен.' : 'муж.'}</span>
          </div>
          <div className="item__price">
            <span>0 &ndash; 1 000$</span>
            <div>{city}</div>
          </div>
        </div>
      </div>
      <div className="item__description">{description}</div>
      <div className="flex justify-center">
        <Button>Открыть анкету</Button>
      </div>
    </Link>
  );
}