
import './App.css';

import DashboardPage from './layout/DashboardPage/DashboardPage';
import User from './layout/User/user';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div className="App">
      <Router>
  
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path='/user' element={<User/>}/>
        
      </Routes>
    </Router>
  {/* <Switch>
        <Route exact path="/Analytics" component={DashboardPage} />
        </Switch>
   
    <DashboardPage/> */}
    </div>
  );
}

export default App;
