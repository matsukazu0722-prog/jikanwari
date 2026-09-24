// 変更前: let timetableData = [];
// ⭕ 変更後: 初期構造を揃えておく
let timetableData = {
    normal: [],
    test: [],
    dates: {}
};

// データの取得 API
app.get('/api/timetable', (req, res) => {
    res.json(timetableData);
});

// データの更新 API
app.post('/api/timetable', (req, res) => {
    // 送信されてきたデータをそのまま代入して保持
    timetableData = req.body;
    res.json({ message: 'Success', data: timetableData });
});