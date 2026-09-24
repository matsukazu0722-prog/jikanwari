// ====================================================
// 🎓 生徒用 リアルタイム時間割同期スクリプト（完全修正版）
// ====================================================

// 初期データ構造
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

let currentTestState = [...currentNormalState];
let testDates = {
  mon: { month: "7", day: "6" },
  tue: { month: "7", day: "7" },
  wed: { month: "7", day: "8" },
  thu: { month: "7", day: "9" },
  fri: { month: "7", day: "10" }
};

const timetableBody = document.getElementById('timetableBody');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');

// 🌐 サーバーからの読み込み処理
async function fetchServerTimetable() {
  try {
    const res = await fetch('/api/timetable');
    const data = await res.json();
    
    // サーバーに保存されている最新のデータを取り出す
    if (data && data.normal && Array.isArray(data.normal) && data.normal.length > 0) {
      currentNormalState = data.normal;
      if (data.test) currentTestState = data.test;
      if (data.dates) testDates = data.dates;
      console.log('最新データの同期成功:', currentNormalState);
    }
  } catch (err) {
    console.error('同期エラー:', err);
  }
}

// 🖥️ 画面描画ロジック
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
      td.addEventListener('click', () => showDetail(index));
      currentRow.appendChild(td);
    }
  });
  if (currentRow) timetableBody.appendChild(currentRow);
}

// モーダル詳細表示
function showDetail(index) {
  const data = currentNormalState[index];
  if (!data || !data.name) return;

  modalBox.innerHTML = `
    <h3>${data.name} の詳細</h3>
    <div class="view-detail-text" style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${data.detail || '詳細はありません。'}</div>
    <div class="modal-actions">
        <button class="btn btn-close" id="btnClose">閉じる</button>
    </div>
  `;
  document.getElementById('btnClose').addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
  modalOverlay.classList.add('active');
}

// アプリ起動時処理
async function initApp() {
  await fetchServerTimetable();
  renderTimetable();
}

initApp();