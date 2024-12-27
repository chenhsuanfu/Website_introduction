const express = require('express');
const router = express.Router();
const { fetchServicesFromNotion } = require('../services/notionService');  // 引入 services 層的函數

// GET /api/services
router.get('/', async (req, res) => {
  try {
    // 調用 services 層的函數來獲取 Notion 中的服務資料
    const services = await fetchServicesFromNotion();

    // 返回服務資料給前端
    res.json(services);
  } catch (error) {
    // 處理錯誤並回應 500 錯誤狀態碼
    console.error('Error:', error.message);
    res.status(500).json({
      message: 'Error fetching data from Notion API',
      error: error.message
    });
  }
});

module.exports = router;
