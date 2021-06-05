# Expense-tracker

An Node.js website that makes you have fun when bookkeeping<br>
:point_right:[點我體驗網站! Click me ](https://mighty-atoll-44743.herokuapp.com/)

<img alt="homepage" src="https://github.com/debbie8820/expense-tracker/blob/main/img/home.jpg">

### :fire:新功能
<img alt="homepage" src="https://github.com/debbie8820/expense-tracker/blob/main/img/login.jpg">

+ 加入使用者認證功能
+ 加入月份篩選功能
+ 加入「商家」欄位到支出明細中

### 主要功能
+ 瀏覽所有支出記錄
+ 新增單筆支出
+ 編輯單筆支出
+ 刪除單筆支出
+ 可根據支出「類別」篩選

### 建置環境

- [Node.js](https://nodejs.org/en/)：14.16.1
- [Express](https://www.npmjs.com/package/express)：4.17.1
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)：5.3.2
- [method-override](https://www.npmjs.com/package/method-override)：3.0.0
- [body-parser](https://www.npmjs.com/package/body-parser)： 1.19.0
- [mongoose](https://www.npmjs.com/package/mongoose)：5.12.7
- [mongoDB](https://www.mongodb.com/try/download/community)：4.2.13

## 安裝與執行

1. clone 此專案至本機電腦

   ```
   $ git clone https://github.com/debbie8820/expense-tracker.git
   ```

2. 進入專案資料夾並安裝

   ```
   $ cd expense-tracker
   $ npm install
   ```

3. 執行

   ```
   $ npm run seed
   $ npm run dev
   ```

4. 執行成功後，終端機會顯示下列訊息

   ```
   App is running on http://localhost:3000
   Mongodb is connected
   ```

5. 使用下列 URL 於瀏覽器上進行瀏覽

   ```
   http://localhost:3000
   ```

6. 種子資料已建構完畢，可使用下列資訊登入：
   ```
   姓名：小明
   信箱: user1@example.com
   密碼: 12345678

   姓名：小美
   信箱: user2@example.com
   密碼: 12345678
   ```

## 開發者

Debbie Chang
