import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Renderなどの環境変数のPORTに対応させる設定（超重要）
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POSTリクエスト（送信されたデータ）をJSONとして受け取るための設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// --- サーバーメモリ上にデータを共有・保持する変数 ---
let timetableData = []; 

// トップページ（/）にアクセスしたら自動で /student を開く
app.get('/', (req, res) => {
    res.redirect('/student');
});

// 1. 生徒・教師画面の表示
app.get('/student', (req, res) => {
    res.render('student');
});

app.get('/teacher', (req, res) => {
    res.render('teacher');
});

// 2. データ共有用 API（データ取得）
app.get('/api/timetable', (req, res) => {
    res.json(timetableData);
});

// 3. データ共有用 API（データ更新・登録）
app.post('/api/timetable', (req, res) => {
    timetableData = req.body; // 送信された最新のデータを保存
    res.json({ message: 'Success', data: timetableData });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});