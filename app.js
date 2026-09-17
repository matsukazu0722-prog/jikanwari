import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// mjsで__dirnameを再現する設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. テンプレートエンジンにEJSを設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. publicフォルダの中身を静的ファイルとして公開
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングの設定
app.get('/student', (req, res) => {
    res.render('student');
});

app.post('/student', (req, res) => {
    res.render('student');
});

app.get('/teacher', (req, res) => {
    res.render('teacher');
});

// サーバーの起動結果
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});