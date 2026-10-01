import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 全端末で共有するデータ保持用（グローバル変数）
let sharedTimetableData = {
  normal: [],
  test: [],
  dates: {}
};

// 1. 全端末共通のデータ取得 API
app.get('/api/timetable', (req, res) => {
  res.json(sharedTimetableData);
});

// 2. 生徒・先生のどちらからでも更新可能な保存 API
app.post('/api/timetable', (req, res) => {
  if (req.body && (req.body.normal || req.body.test)) {
    sharedTimetableData = req.body;
    console.log('【データ更新成功】全端末へ共有可能になりました');
    res.json({ status: 'success', data: sharedTimetableData });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid data format' });
  }
});

// ルーティング
app.get('/', (req, res) => res.redirect('/student'));
app.get('/student', (req, res) => res.render('student'));
app.get('/teacher', (req, res) => res.render('teacher'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});