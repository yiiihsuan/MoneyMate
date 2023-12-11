import React from "react";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { zhTW } from "date-fns/locale";

const Calendar = ( onDateChange) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleChange = (d) => {
      const [newSelectedDate] = d; // 假設 d 是一個陣列，包含選中的日期
      setSelectedDate(newSelectedDate); // 更新選中的日期
    };

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const tenDayAgo = new Date();
    tenDayAgo.setDate(tenDayAgo.getDate() - 7);


    const today = new Date();

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 5);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const disabledDates = [];
  
  for (let i = 1; i < 5; i++) {
    const disabledDate = new Date(today);
    disabledDate.setDate(today.getDate() + i);
    disabledDates.push(disabledDate);
  }
    return (
      <Datepicker
        onChange={handleChange}
        locale={zhTW}
        startValue={selectedDate} // 使用同一個值作為 startValue 和 endValue
        endValue={selectedDate} // 這確保了只選擇單一天的日期
        startDate={tenDayAgo} 
        endDate={threeDaysLater}
        disabledDates={disabledDates}
      />
  );
};

export default Calendar;


// import { useState } from 'react';
// import DatePicker from 'react-date-picker';

// function Example() {
//   const [value, onChange] = useState(new Date());

//   return (
//     <div>
//       <DatePicker onChange={onChange} value={value} />
//     </div>
//   );
// }

// export default Example;



/* to use npm install react-datepicker*/

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";

// import "./react-datepicker.css";

// //import "react-datepicker/dist/react-datepicker.css";


// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';



// const Example = () => {
//   const [startDate, setStartDate] = useState(new Date());

//   const today = new Date();
  
//   return (
//     <DatePicker 
//     selected={startDate} 
//     onChange={(date) => setStartDate(date)}
//     maxDate={today}
//      />
//   );
// };

// export default Example;




