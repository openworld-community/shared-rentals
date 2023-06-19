import React from 'react';
import './LoginContainer.css';
import { Button } from "../Button/Button";

export const LoginContainer = () => {
  return (
    <div className="container p-4">
      <div className="py-4 text-center">
        <h1 className="font-semibold text-lg">Вход и регистрация</h1>
        <p className="text-sm py-4">
          Зарегистрируйтесь или войдите в свой аккаунт и находите соседей прямо
          сейчас!
        </p>
      </div>
      <div className="grid gap-y-6">
        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            E-mail
          </label>
          <div className="container">
            <input
              type="text"
              name="email"
              className="border p-2 mt-2 rounded w-full"
              placeholder="janesmith@gmail.com"
            />
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Пароль
          </label>
          <div className="container">
            <input
              type="password"
              name="password"
              className="border p-2 mt-2 rounded w-full"
            />
          </div>
        </div>
        <div className="flex space-x-6 text-xs items-center">
          <div className="flex space-x-2">
            <input type="checkbox" checked />
            <p>Запомнить меня</p>
          </div>
          <div className="underline">Забыли пароль?</div>
        </div>
        <div className="space-y-4">
          <Button
            width="100%"
            border="none"
            radius="6px"
            color="#999"
            textColor="#fff"
            onClick={() => console.log('Регистрация')}
          >
            Продолжить
          </Button>
          <div className="text-xs flex justify-center">
            <span className="grow hline" />
            <span className="grow-0">или</span>
            <span className="grow hline" />
          </div>
          <Button
            width="100%"
            border="none"
            radius="6px"
            color="#999"
            textColor="#fff"
            onClick={() => console.log('Регистрация')}
          >
            Регистрация
          </Button>
        </div>
        <div className="text-xs flex justify-center font-semibold underline">
          Нужна помощь?
        </div>
        <div className="text-xs py-8 font-light">
          Продолжая, вы принимаете условия <span className="underline">Пользовательского соглашения</span> и <span className="underline">Политики конфиденциальности</span>
        </div>
      </div>
    </div>
  );
};
