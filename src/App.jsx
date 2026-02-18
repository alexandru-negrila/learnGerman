import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Verbs from './pages/Verbs';
import Pronouns from './pages/Pronouns';
import Prepositions from './pages/Prepositions';
import Articles from './pages/Articles';
import Sentences from './pages/Sentences';
import Phrases from './pages/Phrases';
import Numbers from './pages/Numbers';
import Practice from './pages/Practice';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verbs" element={<Verbs />} />
        <Route path="/pronouns" element={<Pronouns />} />
        <Route path="/prepositions" element={<Prepositions />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/sentences" element={<Sentences />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Layout>
  );
}

export default App;
