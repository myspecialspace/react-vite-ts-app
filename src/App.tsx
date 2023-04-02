import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/Main';
import NotFoundPage from './pages/NotFound/NotFound';
import AboutPage from './pages/About/About';
import Layout from './components/Layout/Layout';
import FormPage from './pages/Form/Form';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="form" element={<FormPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
