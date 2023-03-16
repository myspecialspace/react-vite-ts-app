import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/Main';
import NotFoundPage from './pages/NotFound/NotFound';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='*' element={<NotFoundPage />} />
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
