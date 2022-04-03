# 餐廳清單 1.0
## 簡介
電影清單的另一個實作：餐廳清單

## 功能
- 使用者可以在首頁看到所有餐廳與它們的簡單資料：
  - 餐廳照片
  - 餐廳名稱
  - 餐廳分類 
  - 餐廳評分
- 使用者可以再點進去看餐廳的詳細資訊：
  - 類別
  - 地址
  - 電話
  - 描述
  - 圖片
- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
- 使用者可以透過搜尋餐廳類別來找到特定的餐廳
- 當搜尋不到資料時，會跳出警告

## 安裝
1. 開啟終端機，確認好路徑，`git clone` 此專案，cd 到底下
```
$ pwd
[current_path]
$ git clone https://github.com/kuangtsao/ac-restaurantList.git
$ cd ac-restaurantList
```
2. 透過 `npm install` 安裝需要的 package
```
$ npm install
```
3. 啟動前先檢查有沒有 nodemon，沒有的話請依照這個以下指令安裝
```
$ which nodemon
# 如果有出現路徑就代表已經安裝了
$ npm install nodemon
# 如果要讓他變成到處都可以用，多帶一個 -g 的 flag
```

4. 啟動 mongodb container(optional)
如果已經有裝 mongo 4.2 版，或者不喜歡 container 的可以跳過  
先確認自己有沒有裝 docker 和 docker-compose
```
$ which docker
$ which docker-compose
```
如果沒有出現路徑，可以參考 [docker installation guide](https://docs.docker.com/compose/install/) 安裝  

利用 docker-compose 開啟  
```
[project path] $ docker-compose up -d
```

5. 注入種子資料
請先確認是否還在 clone 下來的路徑
```
[project path] $ npm run seed
```
## 啟動專案
挑一個喜歡的
```
[project path] $ npm run start
[project path] $ node app.js
[project path] $ npm run dev
[project path] $ nodemon app.js
```
只要有看到這個訊息，就可以到瀏覽器輸入 `http://localhost:3000`，就可以使用該專案功能
```
ac-restaurantList is running on http://localhost:3000
```
## 開發工具
- node 14.16.0
- express 4.16.4
- express-handlebars 3.0.2
- bootstrap 5.0.2
- font-awesome 5.8.1
- mongoose 6.1.6
- handlebars-helpers 0.10.0
- dotenv 8.2.0
- bcryptjs 2.4.3
- express-session 1.17.1
- passport 0.4.1 
- passport-local 1.0.0
- passport-facebook 3.0.0
