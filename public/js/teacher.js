// ====================================================
// 👨‍🏫 Design Catalyst - 教師用 リアルタイム時間割同期スクリプト
// ====================================================

// 1. 初期データ構造
let currentNormalState = [
  { type: 'time', html: '<span>1限</span><br>09:05-09:55' },
  { type: 'subject', name: '数学I', class: 'math', detail: '教科書P.10からスタート。ノート提出あり。' },
  { type: 'subject', name: '英語コミ', class: 'english', detail: '単語テスト第1回。範囲は1〜50。' },
  { type: 'subject', name: '化学基礎', class: 'science', detail: '実験室集合。白衣を忘れないこと。' },
  { type: 'subject', name: '数学I', class: 'math', detail: '前回の宿題の答え合わせから。' },
  { type: 'subject', name: '現代社会', class: 'society', detail: 'プリント分配あり。' },

  { type: 'time', html: '<span>2限</span><br>10:05-10:55' },
  { type: 'subject', name: '現代文', class: 'japanese', detail: '「羅生門」の読解。' },
  { type: 'subject', name: '物理基礎', class: 'science', detail: '力学の計算問題をやります。' },
  { type: 'subject', name: '英語コミ', class: 'english', detail: '教科書Lesson2の音読。' },
  { type: 'subject', name: '世界史B', class: 'society', detail: 'マイルストーンテストの解説。' },
  { type: 'subject', name: '古典A', class: 'japanese', detail: '予習必須。小テストあり。' },

  { type: 'time', html: '<span>3限</span><br>11:05-11:55' },
  { type: 'subject', name: '体育', class: 'pe', detail: '体育館集合。バスケットボール。' },
  { type: 'subject', name: '数学II', class: 'math', detail: '' },
  { type: 'subject', name: '現代文', class: 'japanese', detail: '' },
  { type: 'subject', name: '化学基礎', class: 'science', detail: '' },
  { type: 'subject', name: '美術', class: 'art', detail: 'デッサンの続き。用具一式持参。' },

  { type: 'lunch', html: '昼休み（11:55 - 12:30）', colspan: 6 },

  { type: 'time', html: '<span>4限</span><br>12:30-13:20' },
  { type: 'subject', name: '日本史B', class: 'society', detail: '' },
  { type: 'subject', name: '英語表現', class: 'english', detail: '' },
  { type: 'subject', name: '情報I', class: 'info', detail: 'PC室集合。' },
  { type: 'subject', name: '体育', class: 'pe', detail: '' },
  { type: 'subject', name: '生物基礎', class: 'science', detail: '' },

  { type: 'time', html: '<span>5限</span><br>13:30-14:20' },
  { type: 'subject', name: '数学B', class: 'math', detail: '' },
  { type: 'subject', name: '漢文', class: 'japanese', detail: '' },
  { type: 'subject', name: '地理B', class: 'society', detail: '' },
  { type: 'subject', name: '英語演習', class: 'english', detail: '' },
  { type: 'subject', name: '音楽', class: 'art', detail: '' },

  { type: 'time', html: '<span>6限</span><br>14:30-15:20' },
  { type: 'subject', name: 'プログラミング', class: 'info', detail: '' },
  { type: 'subject', name: 'ホームルーム', class: 'hr', detail: '席替え。' },
  { type: 'subject', name: '倫理', class: 'society', detail: '' },
  { type: 'subject', name: '地学基礎', class: 'science', detail: '' },
  { type: 'subject', name: '総合探究', class: 'hr', detail: '' },

  { type: 'time', html: '<span>7限</span><br>15:30-16:20' },
  { type: 'subject', name: '', class: 'empty', detail: '' },
  { type: 'subject', name: '八工走', class: 'special', detail: '火曜恒例ダッシュイベント。' },
  { type: 'subject', name: '', class: 'empty', detail: '' },
  { type: 'subject', name: '', class: 'empty', detail: '' },
  { type: 'subject', name: '', class: 'empty', detail: '' }
];

let currentTestState = JSON.parse(JSON.stringify(currentNormalState));
let testDates = {
  mon: { month: "7", day: "6" },
  tue: { month: "7", day: "7" },
  wed: { month: "7", day: "8" },
  thu: { month: "7", day: "9" },
  fri: { month: "7", day: "10" }
};

// 2. DOM要素の取得
const classForm = document.querySelector('.class-form');
const timetableBody = document.getElementById('timetableBody');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');

// ----------------------------------------------------
// 🌐 サーバーAPI通信（全端末共有処理）
// ----------------------------------------------------

// サーバーから最新の共有データを取得
async function fetchServerTimetable() {
  try {
    const res = await fetch('/api/timetable');
    const data = await res.json();
    if (data && data.normal && Array.isArray(data.normal) && data.normal.length > 0) {
      currentNormalState = data.normal;
      if (data.test) currentTestState = data.test;
      if (data.dates) testDates = data.dates;
    }
  } catch (err) {
    console.error('データ取得エラー:', err);
  }
}

// サーバーへ最新データを保存（これで全端末へ共有されます）
async function saveServerTimetable() {
  try {
    const response = await fetch('/api/timetable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        normal: currentNormalState,
        test: currentTestState,
        dates: testDates
      })
    });
    const result = await response.json();
    console.log('サーバー保存成功:', result);
  } catch (err) {
    console.error('サーバー保存エラー:', err);
  }
}

// ----------------------------------------------------
// 📝 授業入力フォーム送信処理
// ----------------------------------------------------
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

    // 1番目にある「空欄マス」または「最初の授業セル」を差し替える
    let targetIndex = currentNormalState.findIndex(item => item.type === 'subject' && (!item.name || item.class === 'empty'));
    
    // 空欄がない場合は最初の授業マスに入れる
    if (targetIndex === -1) {
      targetIndex = currentNormalState.findIndex(item => item.type === 'subject');
    }
    
    if (targetIndex !== -1) {
      currentNormalState[targetIndex].name = className;
      currentNormalState[targetIndex].class = 'hr';
      currentNormalState[targetIndex].detail = detailText;
    }

    renderTimetable();

    // 🌟 超重要：サーバーへデータを送信して一括保存！
    await saveServerTimetable();

    classForm.reset();
    alert(`「${className}」を登録し、全員の時間割に反映しました！`);
  });
}

// ----------------------------------------------------
// 🖥️ 画面描画＆マス目クリック編集ロジック
// ----------------------------------------------------
function renderTimetable() {
  if (!timetableBody) return;
  timetableBody.innerHTML = '';
  let currentRow = null;

  currentNormalState.forEach((data, index) => {
    if (data.type === 'time' || data.type === 'lunch') {
      if (currentRow) timetableBody.appendChild(currentRow);
      currentRow = document.createElement('tr');
    }

    if (data.type === 'time') {
      const td = document.createElement('td');
      td.className = 'time';
      td.innerHTML = data.html;
      currentRow.appendChild(td);
    } else if (data.type === 'lunch') {
      const td = document.createElement('td');
      td.className = 'lunch-break';
      td.colSpan = data.colspan;
      td.innerText = data.html;
      currentRow.appendChild(td);
    } else if (data.type === 'subject') {
      const td = document.createElement('td');
      td.className = `subject ${data.class || 'hr'}`;
      td.innerText = data.name || '';
      td.addEventListener('click', () => handleCellEdit(index));
      currentRow.appendChild(td);
    }
  });
  if (currentRow) timetableBody.appendChild(currentRow);
}

function handleCellEdit(index) {
  if (!modalBox || !modalOverlay) return;
  const data = currentNormalState[index];

  modalBox.innerHTML = `
    <h3>授業情報の編集（先生用）</h3>
    <div class="form-group">
        <label>授業名</label>
        <input type="text" id="editSubject" value="${data.name || ''}" placeholder="授業名を入力">
    </div>
    <div class="form-group">
        <label>授業の詳細・連絡事項</label>
        <textarea id="editDetail" rows="4" placeholder="課題、持ち物、教室変更など">${data.detail || ''}</textarea>
    </div>
    <div class="modal-actions">
        <button class="btn btn-cancel" onclick="closeModal()">キャンセル</button>
        <button class="btn btn-save" id="btnSaveCell">全員に共有保存</button>
    </div>
  `;

  document.getElementById('btnSaveCell')?.addEventListener('click', async () => {
    const newName = document.getElementById('editSubject').value.trim();
    const newDetail = document.getElementById('editDetail').value.trim();

    currentNormalState[index].name = newName;
    currentNormalState[index].detail = newDetail;
    if (newName === '') {
      currentNormalState[index].class = 'empty';
    } else if (currentNormalState[index].class === 'empty') {
      currentNormalState[index].class = 'hr';
    }

    closeModal();
    renderTimetable();
    await saveServerTimetable(); // 即時同期
  });

  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay?.classList.remove('active');
}

modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ----------------------------------------------------
// 🚀 初期化処理＆自動データ同期
// ----------------------------------------------------
async function initApp() {
  await fetchServerTimetable();
  renderTimetable();
}

initApp();

// 5秒ごとに自動同期して他端末の変更を反映
setInterval(async () => {
  await fetchServerTimetable();
  renderTimetable();
}, 5000);