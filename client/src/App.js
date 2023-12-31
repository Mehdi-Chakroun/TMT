import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element= {<Login />} />
          <Route exact path="/dashboard" element = {<Dashboard />} />
          <Route exact path="/admin" element = {<AdminPage />} />
        </Routes>
    </Router>
  );
}

export default App;
