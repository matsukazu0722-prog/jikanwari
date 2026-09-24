// ----------------------------------------------------
// 🎨 Design Catalyst - Teacher Dashboard Controller
// ----------------------------------------------------

// データ状態管理
let currentNormalState = [];
let currentTestState = [];
let testDates = {
  mon: { month: "7", day: "6" },
  tue: { month: "7", day: "7" },
  wed: { month: "7", day: "8" },
  thu: { month: "7", day: "9" },
  fri: { month: "7", day: "10" }
};

// DOM要素の取得
const classForm = document.querySelector('.class-form');
const timetableBody = document.getElementById('timetableBody');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');

// ----------------------------------------------------
// 🌐 サーバーAPI通信（リアルタイム同期）
// ----------------------------------------------------

// サーバーから最新の時間割を取得
async function fetchServerTimetable() {
  try {
    const res = await fetch('/api/timetable');
    const data = await res.json();
    if (data && data.normal && data.normal.length > 0) {
      currentNormalState = data.normal;
      currentTestState = data.test;
      testDates = data.dates || testDates;
    }
  } catch (err) {
    console.error('データ取得エラー:', err);
  }
}

// サーバーへ変更内容を送信・共有保存
async function saveServerTimetable() {
  try {
    const res = await fetch('/api/timetable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        normal: currentNormalState,
        test: currentTestState,
        dates: testDates
      })
    });
    const result = await res.json();
    console.log('同期成功:', result);
  } catch (err) {
    console.error('同期失敗:', err);
  }
}

// ----------------------------------------------------
// 📝 授業入力フォーム（form.class-form）の送信処理
// ----------------------------------------------------
if (classForm) {
  classForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // フォーム入力値の取得
    const className = document.getElementById('class-name')?.value.trim();
    const targetClass = document.getElementById('target-class')?.value;
    const classTime = document.getElementById('class-time')?.value;
    const room = document.getElementById('room')?.value.trim();
    const notes = document.getElementById('notes')?.value.trim();

    if (!className) return;

    // トピックや教室情報を結合してディテールを作成
    const detailText = `【対象】${targetClass || '全学年'}\n【開始】${classTime || '未定'}\n【教室】${room || '未定'}\n【内容】${notes || 'なし'}`;

    // 例: 1番目の空白セル、または指定セルに新規追加する（必要に応じてインデックスを調整）
    const targetIndex = currentNormalState.findIndex(item => item.type === 'subject' && (!item.name || item.class === 'empty'));
    
    if (targetIndex !== -1) {
      currentNormalState[targetIndex].name = className;
      currentNormalState[targetIndex].class = 'hr'; // デフォルトスタイル設定
      currentNormalState[targetIndex].detail = detailText;
    }

    // 画面再描画＆サーバーに同期送信
    renderTimetable();
    await saveServerTimetable();

    // フォームのリセットとフィードバック
    classForm.reset();
    alert(`「${className}」の登録が完了し、生徒側にも共有されました！`);
  });
}

// ----------------------------------------------------
// 🖥️ 時間割テーブル描画ロジック
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
      td.className = `subject ${data.class}`;
      td.innerText = data.name || '';
      td.addEventListener('click', () => handleCellEdit(index));
      currentRow.appendChild(td);
    }
  });
  if (currentRow) timetableBody.appendChild(currentRow);
}

// マス目（セル）の直接編集モーダル処理
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
// 🚀 初期化処理：サーバーからデータをロードして描画
// ----------------------------------------------------
async function initApp() {
  await fetchServerTimetable();
  renderTimetable();
}

initApp();