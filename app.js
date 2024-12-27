const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');

// 引入服務路由
const servicesRoute = require('./routes/services');

// 靜態資源和視圖設定
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 使用服務 API 路由
app.use('/api/services', servicesRoute);

// 預設路由，將資料傳遞至 EJS 模板
app.get('/', async (req, res) => {
    try {
        // 從 API 取得服務資料
        const response = await fetch('http://localhost:3000/api/services');
        const services = await response.json();

        // 將服務資料傳遞給 EJS 模板
        res.render('index', {
            title: '太子登雞 - 連鎖加盟店',
            services: services  // 傳遞從 API 取得的服務資料
        });
    } catch (err) {
        console.error('錯誤:', err);
        res.render('index', {
            title: '太子登雞 - 連鎖加盟店',
            services: []  // 如果有錯誤，則傳遞空資料
        });
    }
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
