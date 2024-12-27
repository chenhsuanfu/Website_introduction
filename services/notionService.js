const axios = require('axios');

// 環境變數
require('dotenv').config();
const { NOTION_DATABASE_ID, NOTION_TOKEN, NOTION_VERSION } = process.env;

// 定義 Notion API 的基本設定
const notionAPI = axios.create({
  baseURL: 'https://api.notion.com/v1/',
  headers: {
    'Authorization': `Bearer ${NOTION_TOKEN}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  },
});

// 查詢 Notion 資料庫的函數
const fetchServicesFromNotion = async () => {
  try {
    // 發送請求到 Notion API 查詢資料庫
    const response = await notionAPI.post(`databases/${NOTION_DATABASE_ID}/query`, {});

    // 處理回應數據，將資料映射為需要的格式
    const services = response.data.results.map((page) => {
      return {
        title: page.properties.Title.title[0]?.plain_text || 'No Title',
        description: page.properties.Description.rich_text[0]?.plain_text || 'No Description',
        image: page.properties.Picture.files[0]?.file?.url || '', // 確保圖片路徑是正確的
      };
    });

    return services;
  } catch (error) {
    console.error('Error fetching data from Notion:', error.response?.data || error.message);
    throw new Error('Error fetching data from Notion API');
  }
};

module.exports = {
  fetchServicesFromNotion,
};
