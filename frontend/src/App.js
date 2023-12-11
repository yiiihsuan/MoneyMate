//verion w/to liff
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashBoard.js';
import AccountingBook from './pages/AccountingBook.js';
import AccountingBookForLiff from './pages/AccountingBookLiff.js';
import Calendar from './component/Calendar.js';
import liff from '@line/liff';
//<Route path="/" element={<HomePageForLiff />} />
//<Route path="/dashboard" element={<DashboardForLiff />} />



const queryClient = new QueryClient();

const App = () => {
  
  const [isInLiff, setIsInLiff] = useState(false);

  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID})
      .then(() => {
        if (liff.isInClient()) {
          setIsInLiff(true);
        }
      })
      .catch((err) => {
        console.error('LIFF 初始化失敗', err);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Routes>
            {isInLiff ? (
              <>
                <Route path="/accountingbookliff" element={<AccountingBookForLiff />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/accountingbook" element={<AccountingBook />} />
                <Route path="/accountingbookliff" element={<AccountingBookForLiff />} />
                <Route path="/Calendar" element={<Calendar />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;




// // //verion w/to liff
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// //import SmallProductList from './pages/sProductList'; // 導向小螢幕組件
// import HomePage from './pages/HomePage';
// import Dashboard from './pages/DashBoard.js';
// import AccountingBook from './pages/AccountingBook.js';



// const queryClient = new QueryClient();

// const App = () => {
  
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);


//   return (
//     <QueryClientProvider client={queryClient}>
//     <Router>
//       <div>
//         <Routes>
//         {windowWidth >= 1280 ? (
//             <>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/accountingbook" element={<AccountingBook />} />
       
//             </>
//           ) : (
//             <>
//          <Route path="/" element={<HomePage />} />
//          <Route path="/dashboard" element={<Dashboard />} />
//          <Route path="/accountingbook" element={<AccountingBook />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//     </QueryClientProvider>
//   );
// };

// export default App;

