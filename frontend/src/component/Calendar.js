import React from "react";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { zhTW } from "date-fns/locale";


const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChange = (d) => {
    const [newSelectedDate] = d; // 假設 d 是一個陣列，包含選中的日期
    setSelectedDate(newSelectedDate); // 更新選中的日期
    console.log('選擇日期:', newSelectedDate);
    console.log('選擇的年:', newSelectedDate.getFullYear());
    console.log('選擇的月:', newSelectedDate.getMonth() + 1);
    console.log('選擇的日:', newSelectedDate.getDate());
    const formattedDate = `${newSelectedDate.getFullYear()}-${newSelectedDate.getMonth() + 1}-${newSelectedDate.getDate()}`;
    console.log('組裝的日期:', formattedDate);
    onDateChange(newSelectedDate);

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
      startValue={selectedDate} // startValue == endValue
      endValue={selectedDate}
      startDate={tenDayAgo}
      endDate={threeDaysLater}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
