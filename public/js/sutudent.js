// 初期データ（サーバーにデータがまだ無い場合のバックアップ）
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

let currentTestState = [
  { type: 'time', html: '<span>1限</span><br>09:05-09:55' },
  { type: 'subject', name: '数Iテスト', class: 'test-sub', detail: '範囲：因数分解〜二次関数。' },
  { type: 'subject', name: '現文テスト', class: 'test-sub', detail: '範囲：羅生門、漢字テスト。' },
  { type: 'subject', name: '化学テスト', class: 'test-sub', detail: '範囲：元素記号、熱化学方程式。' },
  { type: 'subject', name: '数IIテスト', class: 'test-sub', detail: '範囲：三角関数。' },
  { type: 'subject', name: '世Bテスト', class: 'test-sub', detail: '範囲：フランス革命。' },

  { type: 'time', html: '<span>2限</span><br>10:05-10:55' },
  { type: 'subject', name: '英コミュテ', class: 'test-sub', detail: '範囲：Lesson1〜2。' },
  { type: 'subject', name: '物理テスト', class: 'test-sub', detail: '範囲：運動方程式。' },
  { type: 'subject', name: '古典テスト', class: 'test-sub', detail: '範囲：竹取物語。' },
  { type: 'subject', name: '日Bテスト', class: 'test-sub', detail: '範囲：江戸時代初期。' },
  { type: 'subject', name: '地学テスト', class: 'test-sub', detail: '範囲：地球の構造。' },

  { type: 'time', html: '<span>3限</span><br>11:05-11:55' },
  { type: 'subject', name: 'HR / 自習', class: 'hr', detail: '提出物の回収を行います。' },
  { type: 'subject', name: '情報テスト', class: 'test-sub', detail: '範囲：情報モラル。' },
  { type: 'subject', name: 'HR / 自習', class: 'hr', detail: '明日のテスト勉強。' },
  { type: 'subject', name: '英表テスト', class: 'test-sub', detail: '範囲：P.30まで。' },
  { type: 'subject', name: 'HR / 放課', class: 'hr', detail: '終わり次第下校。' }
];

let testDates = {
  mon: { month: "7", day: "6" },
  tue: { month: "7", day: "7" },
  wed: { month: "7", day: "8" },
  thu: { month: "7", day: "9" },
  fri: { month: "7", day: "10" }
};

const toggleEditBtn = document.getElementById('toggleEditBtn');
const toggleTestBtn = document.getElementById('toggleTestBtn');
const openCalcBtn = document.getElementById('openCalcBtn');
const openTimerBtn = document.getElementById('openTimerBtn');
const openMessageBtn = document.getElementById('openMessageBtn');
const timetableTitle = document.getElementById('timetableTitle');
const statusSubtitle = document.getElementById('statusSubtitle');
const timetableBody = document.getElementById('timetableBody');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');

let isEditMode = false;
let isTestPeriod = false;
let activeCellIndex = null;
let activeTargetDateKey = null;

let calcInput = '0';
let swInterval = null;
let swElapsedTime = 0;

// ----------------------------------------------------
// 🌐 サーバーAPI通信用関数（データ同期）
// ----------------------------------------------------
async function fetchServerTimetable() {
  try {
    const res = await fetch('/api/timetable');
    const data = await res.json();
    if (data && data.normal && data.normal.length > 0) {
      currentNormalState = data.normal;
      currentTestState = data.test;
      testDates = data.dates;
    }
  } catch (err) {
    console.error('データ取得失敗:', err);
  }
}

async function saveServerTimetable() {
  try {
    await fetch('/api/timetable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        normal: currentNormalState,
        test: currentTestState,
        dates: testDates
      })
    });
  } catch (err) {
    console.error('データ保存失敗:', err);
  }
}

// ----------------------------------------------------
// 画面描画ロジック
// ----------------------------------------------------
function renderDates() {
  for (let key in testDates) {
    const element = document.getElementById(`date-${key}`);
    if (element) {
      if (testDates[key].month && testDates[key].day) {
        element.innerText = `${testDates[key].month}/${testDates[key].day}`;
      } else {
        element.innerText = `--/--`;
      }
    }
  }
}

function renderTimetable() {
  timetableBody.innerHTML = '';
  const activeState = isTestPeriod ? currentTestState : currentNormalState;
  let currentRow = null;

  activeState.forEach((data, index) => {
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
      td.addEventListener('click', () => handleCellClick(index));
      currentRow.appendChild(td);
    }
  });
  if (currentRow) timetableBody.appendChild(currentRow);

  updateSubtitle();
  renderDates();
}

function updateSubtitle() {
  if (isEditMode) {
    if (isTestPeriod) {
      statusSubtitle.innerText = `【編集モード】マスを押すと授業変更、曜日の下の「月/日」を押すと日付を変更できます`;
    } else {
      statusSubtitle.innerText = `【編集モード】マスを押すと授業名や詳細を変更できます`;
    }
    statusSubtitle.className = 'subtitle edit-mode-active';
  } else {
    statusSubtitle.innerText = `【通常モード】マスを押すと授業の詳細が見れます`;
    statusSubtitle.className = 'subtitle';
  }
}

function handleDateClick(dayKey) {
  if (!isEditMode || !isTestPeriod) return;

  activeTargetDateKey = dayKey;
  const dayLabels = { mon: '月曜日', tue: '火曜日', wed: '水曜日', thu: '木曜日', fri: '金曜日' };
  const currentData = testDates[dayKey];

  modalBox.innerHTML = `
    <h3>${dayLabels[dayKey]} の日付編集</h3>
    <div class="form-group">
        <label>設定する日付</label>
        <div class="date-input-group">
            <input type="number" id="inputMonth" value="${currentData.month}" min="1" max="12" placeholder="月"> 月
            <input type="number" id="inputDay" value="${currentData.day}" min="1" max="31" placeholder="日"> 日
        </div>
    </div>
    <div class="modal-actions">
        <button class="btn btn-cancel" id="btnDateCancel">キャンセル</button>
        <button class="btn btn-save" id="btnDateSave">保存する</button>
    </div>
  `;

  document.getElementById('btnDateSave').addEventListener('click', saveDateData);
  document.getElementById('btnDateCancel').addEventListener('click', closeModal);
  modalOverlay.classList.add('active');
  document.getElementById('inputMonth').focus();
}

async function saveDateData() {
  const m = document.getElementById('inputMonth').value.trim();
  const d = document.getElementById('inputDay').value.trim();

  if (m && d) {
    testDates[activeTargetDateKey].month = m;
    testDates[activeTargetDateKey].day = d;
  } else {
    testDates[activeTargetDateKey].month = "";
    testDates[activeTargetDateKey].day = "";
  }
  
  closeModal();
  renderTimetable();
  await saveServerTimetable(); // サーバーへ同期保存
}

function handleCellClick(stateIndex) {
  activeCellIndex = stateIndex;
  const activeState = isTestPeriod ? currentTestState : currentNormalState;
  const data = activeState[stateIndex];

  const currentName = data.class === 'empty' ? '' : data.name;
  const currentDetail = data.detail || '詳細はありません。';

  if (isEditMode) {
    modalBox.innerHTML = `
      <h3>授業情報の編集</h3>
      <div class="form-group">
          <label>授業名</label>
          <input type="text" id="inputSubject" value="${currentName}" placeholder="授業名を入力">
      </div>
      <div class="form-group">
          <label>授業の詳細・メモ</label>
          <textarea id="inputDetail" rows="4" placeholder="範囲、持ち物など…">${data.detail || ''}</textarea>
      </div>
      <div class="modal-actions">
          <button class="btn btn-cancel" id="btnCancel">キャンセル</button>
          <button class="btn btn-save" id="btnSave">保存する</button>
      </div>
    `;
    document.getElementById('btnSave').addEventListener('click', saveCellData);
    document.getElementById('btnCancel').addEventListener('click', closeModal);
    modalOverlay.classList.add('active');
    document.getElementById('inputSubject').focus();
  } else {
    if (!data.name) return;
    modalBox.innerHTML = `
      <h3>${data.name} の詳細</h3>
      <div class="view-detail-text">${currentDetail}</div>
      <div class="modal-actions">
          <button class="btn btn-close" id="btnClose">閉じる</button>
      </div>
    `;
    document.getElementById('btnClose').addEventListener('click', closeModal);
    modalOverlay.classList.add('active');
  }
}

async function saveCellData() {
  const activeState = isTestPeriod ? currentTestState : currentNormalState;
  const newName = document.getElementById('inputSubject').value.trim();
  const newDetail = document.getElementById('inputDetail').value.trim();

  if (newName === "") {
    activeState[activeCellIndex].name = "";
    activeState[activeCellIndex].class = "empty";
  } else {
    activeState[activeCellIndex].name = newName;
    if (activeState[activeCellIndex].class === 'empty') {
      activeState[activeCellIndex].class = isTestPeriod ? 'test-sub' : 'hr';
    }
  }
  activeState[activeCellIndex].detail = newDetail;

  closeModal();
  renderTimetable();
  await saveServerTimetable(); // サーバーへ同期保存
}

// --- ツール類（電卓・タイマー・メッセージ）---
openCalcBtn?.addEventListener('click', () => {
  calcInput = '0';
  modalBox.innerHTML = `
    <h3>ミニ電卓</h3>
    <div class="calc-screen" id="calcScreen">0</div>
    <div class="calculator-grid">
        <button class="calc-btn clear" onclick="pressCalc('C')">C</button>
        <button class="calc-btn backspace" onclick="pressCalc('⌫')">⌫</button>
        <button class="calc-btn operator" onclick="pressCalc('÷')">÷</button>
        <button class="calc-btn operator" onclick="pressCalc('×')">×</button>
        <button class="calc-btn" onclick="pressCalc('7')">7</button>
        <button class="calc-btn" onclick="pressCalc('8')">8</button>
        <button class="calc-btn" onclick="pressCalc('9')">9</button>
        <button class="calc-btn operator" onclick="pressCalc('-')">-</button>
        <button class="calc-btn" onclick="pressCalc('4')">4</button>
        <button class="calc-btn" onclick="pressCalc('5')">5</button>
        <button class="calc-btn" onclick="pressCalc('6')">6</button>
        <button class="calc-btn operator" onclick="pressCalc('+')">+</button>
        <button class="calc-btn" onclick="pressCalc('1')">1</button>
        <button class="calc-btn" onclick="pressCalc('2')">2</button>
        <button class="calc-btn" onclick="pressCalc('3')">3</button>
        <button class="calc-btn" onclick="pressCalc('.')">.</button>
        <button class="calc-btn" style="grid-column: span 2" onclick="pressCalc('0')">0</button>
        <button class="calc-btn equal" onclick="pressCalc('=')">=</button>
    </div>
    <div class="modal-actions"><button class="btn btn-close" onclick="closeModal()">閉じる</button></div>
  `;
  modalOverlay.classList.add('active');
});

window.pressCalc = function (val) {
  const screen = document.getElementById('calcScreen');
  if (!screen) return;
  if (val === 'C') calcInput = '0';
  else if (val === '⌫') calcInput = (calcInput === '0' || calcInput === 'Error' || calcInput.length <= 1) ? '0' : calcInput.slice(0, -1);
  else if (val === '=') {
    try { calcInput = String(new Function(`return ${calcInput.replace(/×/g, '*').replace(/÷/g, '/')}`)()); }
    catch (e) { calcInput = 'Error'; }
  } else calcInput = (calcInput === '0' || calcInput === 'Error') ? val : calcInput + val;
  screen.innerText = calcInput;
};

openTimerBtn?.addEventListener('click', () => {
  modalBox.innerHTML = `
    <h3>ストップウォッチ</h3>
    <div class="stopwatch-display" id="swDisplay">00:00.00</div>
    <div class="stopwatch-actions">
        <button class="sw-btn start" onclick="startStopwatch()">スタート</button>
        <button class="sw-btn stop" onclick="stopStopwatch()">ストップ</button>
        <button class="sw-btn reset" onclick="resetStopwatch()">リセット</button>
    </div>
    <div class="modal-actions"><button class="btn btn-close" onclick="closeModal()">閉じる</button></div>
  `;
  modalOverlay.classList.add('active');
  updateStopwatchDisplay();
  if (swInterval) runStopwatchVisuals();
});

window.startStopwatch = function () {
  if (swInterval) return;
  const startTime = Date.now() - swElapsedTime;
  swInterval = setInterval(() => { swElapsedTime = Date.now() - startTime; updateStopwatchDisplay(); }, 10);
};
window.stopStopwatch = function () { clearInterval(swInterval); swInterval = null; };
window.resetStopwatch = function () { clearInterval(swInterval); swInterval = null; swElapsedTime = 0; updateStopwatchDisplay(); };
function runStopwatchVisuals() {
  clearInterval(swInterval);
  const startTime = Date.now() - swElapsedTime;
  swInterval = setInterval(() => { swElapsedTime = Date.now() - startTime; updateStopwatchDisplay(); }, 10);
}
function updateStopwatchDisplay() {
  const display = document.getElementById('swDisplay');
  if (!display) return;
  const totalSeconds = Math.floor(swElapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((swElapsedTime % 1000) / 10);
  display.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

openMessageBtn?.addEventListener('click', () => {
  modalBox.innerHTML = `
    <h3>先生へのメッセージ送信</h3>
    <div class="form-group"><label>宛先</label><select id="teacherSelect"><option>佐藤先生（数学）</option><option>鈴木先生（英語）</option><option>渡辺先生（担任）</option></select></div>
    <div class="form-group"><label>メッセージ内容</label><textarea id="messageContent" rows="5" placeholder="連絡内容を入力..."></textarea></div>
    <div class="modal-actions"><button class="btn btn-cancel" onclick="closeModal()">キャンセル</button><button class="btn btn-save" id="sendMessageBtn">送信する</button></div>
  `;
  modalOverlay.classList.add('active');
  document.getElementById('sendMessageBtn')?.addEventListener('click', () => {
    const teacher = document.getElementById('teacherSelect').value;
    const content = document.getElementById('messageContent').value.trim();
    if (!content) return alert("内容を入力してください。");
    modalBox.innerHTML = `<h3>送信完了</h3><div class="view-detail-text" style="border-color:#10b981; background:#f0fdf4;">${teacher}へ送信しました！\n\n「${content}」</div><div class="modal-actions"><button class="btn btn-close" onclick="closeModal()">閉じる</button></div>`;
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  activeCellIndex = null;
  activeTargetDateKey = null;
}

toggleEditBtn?.addEventListener('click', () => {
  isEditMode = !isEditMode;
  toggleEditBtn.classList.toggle('active', isEditMode);
  toggleEditBtn.querySelector('span').innerText = isEditMode ? '閲覧モードへ' : '編集モード';
  document.body.classList.toggle('edit-mode', isEditMode);
  renderTimetable();
});

toggleTestBtn?.addEventListener('click', () => {
  isTestPeriod = !isTestPeriod;
  toggleTestBtn.classList.toggle('active', isTestPeriod);
  if (isTestPeriod) {
    timetableTitle.innerText = '週間時間割（テスト期間）';
    document.body.classList.add('test-period-active');
  } else {
    timetableTitle.innerText = '週間時間割（通常期）';
    document.body.classList.remove('test-period-active');
  }
  renderTimetable();
});

['mon', 'tue', 'wed', 'thu', 'fri'].forEach(key => {
  document.getElementById(`date-${key}`)?.addEventListener('click', () => handleDateClick(key));
});

modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// ----------------------------------------------------
// 初期化処理：起動時にサーバーから最新データをロード
// ----------------------------------------------------
async function initApp() {
  await fetchServerTimetable();
  renderTimetable();
}

initApp();