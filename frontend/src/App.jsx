import PageLayout from './components/PageLayout';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import Tos from './components/Tos'
import UrlStatistics from './components/UrlStatistics'
import Missing from './components/Missing'

function App() {

  return (
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<Tos />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/stats" element={<UrlStatistics />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>

  );
}

export default App;
