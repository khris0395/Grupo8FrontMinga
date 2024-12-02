import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import Profile from './components/EditAuthor/EdithAuthor'


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />

        </Routes>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;