// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import SmallProductList from './pages/sProductList'; // 導向小螢幕組件
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashBoard.js';
import AccountingBook from './pages/AccountingBook.js';



const App = () => {
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
        {windowWidth >= 1280 ? (
            <>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accountingbook" element={<AccountingBook />} />
       
            </>
          ) : (
            <>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/accountingbook" element={<AccountingBook />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

