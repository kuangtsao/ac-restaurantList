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
## 啟動專案
挑一個喜歡的
```
[project path] $ npm run start
[project path] $ node app.js
[project path] $ npm run dev
[project path] $ nodemon app.js
```
