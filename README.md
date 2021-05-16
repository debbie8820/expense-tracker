# Expense-tracker

An Node.js website that makes you have fun when bookkeeping

## 主要功能

- 瀏覽所有支出記錄
- 新增單筆支出
- 刪除單筆支出
- 編輯單筆支出
- 點選導覽列的「家庭記帳本」可以返回首頁


## 建置環境

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
   App is running on port 3000
   Mongodb is connected
   ```

5. 使用下列 URL 於瀏覽器上進行瀏覽

   ```
   http://localhost:3000
   ```


## 開發者

Debbie Chang