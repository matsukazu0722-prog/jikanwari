import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. まず最初に app を定義する（ここが超重要！）
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 3. データ共有用変数
let timetableData = {
  normal: [],
  test: [],
  dates: {}
};

// 4. APIエンドポイント（ルーティング）
app.get('/api/timetable', (req, res) => {
  res.json(timetableData);
});

app.post('/api/timetable', (req, res) => {
  timetableData = req.body;
  res.json({ message: 'Success', data: timetableData });
});

// 5. 画面表示用ルーティング
app.get('/', (req, res) => {
  res.redirect('/student');
});

app.get('/student', (req, res) => {
  res.render('student');
});

app.get('/teacher', (req, res) => {
  res.render('teacher');
});

// 6. サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});