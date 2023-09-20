import { Routes, Route } from 'react-router-dom';
import './App.css';
import AgenciesLog from './components/pages/AgenciesLog';
import AgenciesReg from './components/pages/AgenciesReg';
import AgenciesDashboard from './components/pages/AgenciesDashboard';
import DonersReg from './components/pages/DonersReg';
import DonersLog from './components/pages/DonersLog';
import DonersDashboard from './components/pages/DonersDashboard';
import HomePage from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import DonateMoney from './components/pages/DonateMoney';
import AdminLog from './components/pages/AdminLog';
import AdminDashboard from './components/pages/AdminDashboard';
import GivenFoodForm from './components/pages/GivenFoodForm';
import ShowOneDoner from './components/pages/ShowOneDoner';
import ShowOneVolunteer from './components/pages/ShowOneVolunteer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path='/agencies' element={<AgenciesLog />} />
        <Route path='/agency/show/:id' element={<ShowOneVolunteer />} />
        <Route path='/agencies/register' element={<AgenciesReg />} />
        <Route path='/agencies/dashboard' element={<AgenciesDashboard/>} />
        <Route path='/doners' element={<DonersLog />} />
        <Route path='/doner/show/:id' element={<ShowOneDoner />} />
        <Route path='/doners/register' element={<DonersReg />} />
        <Route path='/doners/dashboard' element={<DonersDashboard/>}/>
        <Route path='/doners/giveMore' element={<GivenFoodForm/>} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/donate-money" element={<DonateMoney />} />
        <Route path='/admin/log' element={<AdminLog />}/>
        <Route path='/MyAdmin/Dashboard' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
