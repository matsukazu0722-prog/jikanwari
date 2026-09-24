// フォーム送信（授業登録）時の処理
if (classForm) {
  classForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const className = document.getElementById('class-name')?.value.trim();
    const targetClass = document.getElementById('target-class')?.value;
    const classTime = document.getElementById('class-time')?.value;
    const room = document.getElementById('room')?.value.trim();
    const notes = document.getElementById('notes')?.value.trim();

    if (!className) return;

    const detailText = `【対象】${targetClass || '全学年'}\n【開始】${classTime || '未定'}\n【教室】${room || '未定'}\n【内容】${notes || 'なし'}`;

    // 空いているマス（または指定マス）を探してセット
    const targetIndex = currentNormalState.findIndex(item => item.type === 'subject' && (!item.name || item.class === 'empty'));
    
    if (targetIndex !== -1) {
      currentNormalState[targetIndex].name = className;
      currentNormalState[targetIndex].class = 'hr';
      currentNormalState[targetIndex].detail = detailText;
    }

    // ① 自分の画面を更新
    renderTimetable();

    // ② 🌟 超重要：ここで必ずサーバーへPOST送信して全体保存する！
    await saveServerTimetable();

    classForm.reset();
    alert('登録完了！サーバーへ送信しました。');
  });
}