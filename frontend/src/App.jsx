import PageLayout from './components/PageLayout';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import Privacy from './components/Privacy'
import Tos from './components/Tos'
import UrlStatistics from './components/UrlStatistics'
import { Navigate } from "react-router-dom";

function App() {

  return (
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/terms-of-service" element={<Tos />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/stats" element={<UrlStatistics />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

  );
}

export default App;
