import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ButtonPage } from './pages/ButtonPage';
import { TypographyPage } from './pages/TypographyPage';
import { InputPage } from './pages/InputPage';
import { CardPage } from './pages/CardPage';
import { BadgePage } from './pages/BadgePage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/typography" element={<TypographyPage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/card" element={<CardPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
      </Route>
    </Routes>
  );
}

export default App;
