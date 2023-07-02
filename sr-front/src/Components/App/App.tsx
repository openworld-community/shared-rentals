import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { LoginContainer } from '../Login/LoginContainer';
import { MainPage } from '../../Pages/MainPage/MainPage';
import { Profiles } from '../../Pages/Profiles/Profiles';
import { ProfileView } from '../../Pages/ProfileView/ProfileView';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profileView" element={<ProfileView />} />
        <Route path="/login" element={<LoginContainer />} />
      </Route>
    </Routes>
  );
}
