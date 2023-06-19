import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { LoginContainer } from '../Login/LoginContainer';
import { MainPage } from '../MainPage/MainPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginContainer />} />
      </Route>
    </Routes>
  );
}
