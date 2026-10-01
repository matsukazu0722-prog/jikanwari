import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌟 JSONデータを正しくパースするための設定（超重要）
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 🌟 サーバー側で全端末共有のデータオブジェクトを保持
let sharedTimetableData = {
  normal: [],
  test: [],
  dates: {}
};

// 1. 全端末共通のデータ取得 API
app.get('/api/timetable', (req, res) => {
  res.json(sharedTimetableData);
});

// 2. データ保存・全体更新 API
app.post('/api/timetable', (req, res) => {
  // 受信したデータが存在すれば更新
  if (req.body) {
    sharedTimetableData = req.body;
    console.log('【サーバーデータ更新完了】', new Date().toLocaleTimeString());
    return res.json({ status: 'success', data: sharedTimetableData });
  }
  res.status(400).json({ status: 'error', message: 'No data received' });
});

// ルーティング
app.get('/', (req, res) => res.redirect('/student'));
app.get('/student', (req, res) => res.render('student'));
app.get('/teacher', (req, res) => res.render('teacher'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});