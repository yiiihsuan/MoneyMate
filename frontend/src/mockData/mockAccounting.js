
/*
{
  id INT AUTO_INCREMENT PRIMARY KEY,
  price INT NOT NULL,                      -- 金額為整數
  category VARCHAR(255) ,  -- 類別，限定食、衣、住、行、育、樂，可以為 NULL
  tag VARCHAR(255) ,       -- 標籤，可以自定義，可以為 NULL
  detail TEXT,                    -- 交易詳細說明
  created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 創建時間，自動生成
 
   created_time , price, category, tag, detail,
   2023.12.3 , 200 , 食 , 午餐 , 牛肉麵＋餛飩湯
   2023.12.3 , 7000 , 住 , 房租 , 11月房租

}

*/

const mockAccountingData = [
    {
      "created_time": "2023-12-03T00:00:00.000Z",
      "price": 200,
      "category": "食",
      "tag": "午餐",
      "detail": "牛肉麵＋餛飩湯"
    },
    {
        "created_time": "2023-12-03T07:00:00.000Z",
        "price": 200,
        "category": "食",
        "tag": "午餐",
        "detail": "牛肉麵＋餛飩湯"
      },
    {
        "created_time": "2023-12-03T09:30:00.000Z",
        "price": 7000,
        "category": "住",
        "tag": "房租",
        "detail": "11月房租"
      },
    {
      "created_time": "2023-12-03T9:00:00.000Z",
      "price": 7000,
      "category": "住",
      "tag": "房租",
      "detail": "11月房租"
    },
    {
        "created_time": "2023-12-03T12:00:00.000Z",
        "price": 7000,
        "category": "住",
        "tag": "房租",
        "detail": "11月房租"
      }
  ];
  
  export default mockAccountingData;
  