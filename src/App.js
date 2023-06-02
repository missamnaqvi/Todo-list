import { Toaster } from 'react-hot-toast';
import './App.css';
import MainCmp from './components/mainCmp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/signup';

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route index element={<MainCmp />} />
          {/* <Route path="/login" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      </Router>
      <Toaster toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        }
      }} />
    </div>
  );
}

export default App;
