// ========================
// Multi-language dictionary
// ========================
const LANGS = {
  en: {
    title: "Student & Class Management System",
    tab_students: "Students",
    tab_classes: "Classes",
    student_list: "Student Master List",
    add_student: "Add Student",
    class_mgmt: "Class Management",
    add_class: "Add Class",
    add_to_class: "Add to Class",
    team: "Teams",
    add_team: "+ Add Team",
    no_teams: "No teams yet.",
    subjects_chaps: "Subjects & Chapters",
    add_subject: "Add subject",
    add_chap: "Add chapter",
    add_subject_btn: "Add Subject",
    add_chap_btn: "Add Chapter",
    scores: "Scores, Grades (A–F), TP (per subject)",
    delete: "Delete",
    remove: "Remove",
    assign: "Assign",
    assign_student: "Assign student...",
    members: "Members:",
    not_in_class: "Not in class yet",
    class: "Class:",
    tp_edit: "TP Edit",
    edit_tp_scale: "Edit TP Scale for",
    save: "Save",
    cancel: "Cancel",
    theme_customizer: "Theme Customizer",
    theme_primary: "Primary Color",
    theme_accent: "Accent Color",
    theme_font: "Font",
    theme_save: "Save",
    theme_cancel: "Cancel",
    toast_saved: "Theme saved!",
    toast_lang: "Language changed!",
    toast_theme_reset: "Theme reset to default.",
    confirm_delete_student: "Are you sure you want to delete this student?",
    confirm_delete_class: "Are you sure you want to delete the class",
    confirm_delete_team: "Are you sure you want to delete this team?",
  },
  ms: {
    title: "Sistem Pengurusan Pelajar & Kelas",
    tab_students: "Pelajar",
    tab_classes: "Kelas",
    student_list: "Senarai Induk Pelajar",
    add_student: "Tambah Pelajar",
    class_mgmt: "Pengurusan Kelas",
    add_class: "Tambah Kelas",
    add_to_class: "Tambah ke Kelas",
    team: "Pasukan",
    add_team: "+ Tambah Pasukan",
    no_teams: "Belum ada pasukan.",
    subjects_chaps: "Subjek & Bab",
    add_subject: "Tambah subjek",
    add_chap: "Tambah bab",
    add_subject_btn: "Tambah Subjek",
    add_chap_btn: "Tambah Bab",
    scores: "Markah, Gred (A–F), TP (setiap subjek)",
    delete: "Padam",
    remove: "Buang",
    assign: "Tetapkan",
    assign_student: "Tetapkan pelajar...",
    members: "Ahli:",
    not_in_class: "Belum dalam kelas",
    class: "Kelas:",
    tp_edit: "TP Sunting",
    edit_tp_scale: "Edit Skala TP untuk",
    save: "Simpan",
    cancel: "Batal",
    theme_customizer: "Penyesuai Tema",
    theme_primary: "Warna Utama",
    theme_accent: "Warna Aksen",
    theme_font: "Fon",
    theme_save: "Simpan",
    theme_cancel: "Batal",
    toast_saved: "Tema disimpan!",
    toast_lang: "Bahasa ditukar!",
    toast_theme_reset: "Tema ditetapkan semula.",
    confirm_delete_student: "Padam pelajar ini?",
    confirm_delete_class: "Padam kelas",
    confirm_delete_team: "Padam pasukan ini?",
  },
  zh: {
    title: "学生与班级管理系统",
    tab_students: "学生",
    tab_classes: "班级",
    student_list: "学生总表",
    add_student: "添加学生",
    class_mgmt: "班级管理",
    add_class: "添加班级",
    add_to_class: "添加到班级",
    team: "小组",
    add_team: "+ 添加小组",
    no_teams: "暂无小组。",
    subjects_chaps: "科目与章节",
    add_subject: "添加科目",
    add_chap: "添加章节",
    add_subject_btn: "添加科目",
    add_chap_btn: "添加章节",
    scores: "分数, 等级 (A–F), TP（每科目）",
    delete: "删除",
    remove: "移除",
    assign: "分配",
    assign_student: "分配学生...",
    members: "成员:",
    not_in_class: "尚未分班",
    class: "班级:",
    tp_edit: "TP编辑",
    edit_tp_scale: "编辑TP标准",
    save: "保存",
    cancel: "取消",
    theme_customizer: "主题定制",
    theme_primary: "主颜色",
    theme_accent: "强调色",
    theme_font: "字体",
    theme_save: "保存",
    theme_cancel: "取消",
    toast_saved: "主题已保存！",
    toast_lang: "语言已切换！",
    toast_theme_reset: "主题已重置。",
    confirm_delete_student: "确定删除该学生？",
    confirm_delete_class: "确定删除班级",
    confirm_delete_team: "确定删除该小组？",
  }
};
let LANG = localStorage.getItem('sm_lang') || 'en';

// ================
// Theme Customizer
// ================
const THEME_DEFAULTS = {
  primary: "#3498db",
  accent: "#e67e22",
  font: "Inter"
};
function applyTheme(theme) {
  document.documentElement.style.setProperty('--primary', theme.primary || THEME_DEFAULTS.primary);
  document.documentElement.style.setProperty('--accent', theme.accent || THEME_DEFAULTS.accent);
  document.body.style.fontFamily = theme.font ? `'${theme.font}', Inter, Arial, sans-serif` : THEME_DEFAULTS.font;
  document.documentElement.style.setProperty('--font-family', `'${theme.font || THEME_DEFAULTS.font}', Inter, Arial, sans-serif`);
}
function loadTheme() {
  let t = localStorage.getItem("sm_theme");
  let theme = t ? JSON.parse(t) : THEME_DEFAULTS;
  applyTheme(theme);
  return theme;
}

// ===================
// Toast notification
// ===================
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove("show"), 2200);
}

// =====================
// UI Language Update
// =====================
function renderLang() {
  // Header, Nav, Forms, Buttons, Modal
  const S=LANGS[LANG];
  document.title = S.title;
  document.getElementById("title-main").textContent = S.title;
  document.getElementById("tab-students").textContent = S.tab_students;
  document.getElementById("tab-classes").textContent = S.tab_classes;
  document.getElementById("student-list-title").textContent = S.student_list;
  document.getElementById("student-name-input").placeholder = S.add_student;
  document.querySelector("#student-add-form button").textContent = S.add_student;
  document.getElementById("class-mgmt-title").textContent = S.class_mgmt;
  document.getElementById("class-name-input").placeholder = S.add_class;
  document.querySelector("#class-add-form button").textContent = S.add_class;
  // Modal
  document.getElementById("tp-scale-edit-title").textContent = S.edit_tp_scale;
  document.getElementById("tp-scale-save-btn").textContent = S.save;
  document.getElementById("tp-scale-cancel-btn").textContent = S.cancel;
  // Theme Customizer
  document.getElementById("theme-customizer-title").textContent = S.theme_customizer;
  document.getElementById("theme-primary-label").textContent = S.theme_primary;
  document.getElementById("theme-accent-label").textContent = S.theme_accent;
  document.getElementById("theme-font-label").textContent = S.theme_font;
  document.getElementById("theme-save-btn").textContent = S.theme_save;
  document.getElementById("theme-cancel-btn").textContent = S.theme_cancel;
  // Re-render main panels
  renderStudents();
  renderClassTabs();
  renderClassPanel();
}

// ================
// Language selector
// ================
document.getElementById("lang-selector").value = LANG;
document.getElementById("lang-selector").onchange = function() {
  LANG = this.value;
  localStorage.setItem("sm_lang", LANG);
  renderLang();
  toast(LANGS[LANG].toast_lang);
};

// =============================
// Theme customizer modal logic
// =============================
function showThemeModal() {
  const theme = loadTheme();
  document.getElementById("theme-primary-picker").value = theme.primary || THEME_DEFAULTS.primary;
  document.getElementById("theme-accent-picker").value = theme.accent || THEME_DEFAULTS.accent;
  document.getElementById("theme-font-picker").value = theme.font || THEME_DEFAULTS.font;
  document.getElementById("themeModal").style.display = "";
}
document.getElementById("themeCustomizerBtn").onclick = showThemeModal;
document.getElementById("theme-save-btn").onclick = function() {
  let th = {
    primary: document.getElementById("theme-primary-picker").value,
    accent: document.getElementById("theme-accent-picker").value,
    font: document.getElementById("theme-font-picker").value
  };
  localStorage.setItem("sm_theme", JSON.stringify(th));
  applyTheme(th);
  document.getElementById("themeModal").style.display = "none";
  toast(LANGS[LANG].toast_saved);
};
document.getElementById("theme-cancel-btn").onclick = function() {
  document.getElementById("themeModal").style.display = "none";
};
// Apply theme on startup
loadTheme();

// ========
// Dark Mode
// ========
const darkBtn = document.getElementById('darkModeToggle');
function setDark(dark) {
  document.body.classList.toggle('dark', dark);
  darkBtn.innerText = dark ? "☀️" : "🌙";
  localStorage.setItem('sm_dark', dark ? '1' : '0');
}
darkBtn.onclick = () => setDark(!document.body.classList.contains('dark'));
if (localStorage.getItem('sm_dark') === '1' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) setDark(true);

// ==============
// Data Storage
// ==============
const STORAGE = {
  students: 'sm_students_v8',
  classes: 'sm_classes_v8'
};
let students = JSON.parse(localStorage.getItem(STORAGE.students)) || [];
let classes = JSON.parse(localStorage.getItem(STORAGE.classes)) || [];

function save() {
  localStorage.setItem(STORAGE.students, JSON.stringify(students));
  localStorage.setItem(STORAGE.classes, JSON.stringify(classes));
}
function getStudentById(id) { return students.find(s => s.id === id); }
function getClassById(id) { return classes.find(c => c.id === id); }

// ================
// Tabs Navigation
// ================
window.showTab = function(tab) {
  document.getElementById('section-students').style.display = (tab === 'students') ? '' : 'none';
  document.getElementById('section-classes').style.display = (tab === 'classes') ? '' : 'none';
  document.getElementById('tab-students').classList.toggle('active', tab === 'students');
  document.getElementById('tab-classes').classList.toggle('active', tab === 'classes');
};

// ================
// Student Master List
// ================
window.addPoint = function(sid) {
  const stu = getStudentById(sid);
  stu.points = Math.min(1000, (stu.points || 0) + 1);
  save(); renderStudents(); renderClassTabs(); renderClassPanel();
};
window.subPoint = function(sid) {
  const stu = getStudentById(sid);
  stu.points = Math.max(0, (stu.points || 0) - 1);
  save(); renderStudents(); renderClassTabs(); renderClassPanel();
};
window.deleteStudent = function(sid) {
  if (!confirm(LANGS[LANG].confirm_delete_student)) return;
  students = students.filter(s => s.id !== sid);
  classes.forEach(cls => {
    cls.studentIds = (cls.studentIds || []).filter(id => id !== sid);
    (cls.teams||[]).forEach(t => t.memberIds = t.memberIds.filter(id => id !== sid));
  });
  save(); renderStudents(); renderClassTabs(); renderClassPanel();
};

function renderStudents() {
  const S = LANGS[LANG];
  const ul = document.getElementById('student-list');
  ul.innerHTML = '';
  students.forEach((stu) => {
    const li = document.createElement('li');
    const studentClasses = classes
      .filter(cls => (cls.studentIds || []).includes(stu.id))
      .map(cls => cls.name);
    li.innerHTML = `
      <span>${stu.name}</span>
      <span style="color:var(--primary);font-size:0.97em;margin-left:1em;">
        ${studentClasses.length ? `${S.class} ${studentClasses.join(", ")}` : `<i>${S.not_in_class}</i>`}
      </span>
      <button style="background:var(--red);" onclick="window.deleteStudent('${stu.id}')">${S.delete}</button>
    `;
    ul.appendChild(li);
  });
}
document.getElementById('student-add-form').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('student-name-input').value.trim();
  if (name) {
    students.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,7), name, points: 0 });
    save();
    this.reset();
    renderStudents();
    renderClassTabs();
    renderClassPanel();
  }
};

// ================
// Class Management
// ================
function defaultTPScale() {
  return [
    {min: 90, tp: 6},
    {min: 75, tp: 5},
    {min: 60, tp: 4},
    {min: 45, tp: 3},
    {min: 30, tp: 2},
    {min: 0, tp: 1}
  ];
}
function ensureSubjectsAreObjects(cls) {
  if (cls.subjects && typeof cls.subjects[0] === "string") {
    cls.subjects = cls.subjects.map((n, i) => ({
      name: n,
      tpScale: defaultTPScale(),
      colorIdx: i % 7
    }));
  }
}
function getSubjectColor(sub) {
  const idx = (sub.colorIdx !== undefined ? sub.colorIdx : 0) % 7;
  return ["#0984e3","#fd9644","#20bf6b","#a259e6","#17a2b8","#ed4c67","#f7b731"][idx];
}
window.cycleSubjectColor = function(classId, subjectIdx) {
  const cls = getClassById(classId);
  ensureSubjectsAreObjects(cls);
  let sub = cls.subjects[subjectIdx];
  sub.colorIdx = ((sub.colorIdx !== undefined ? sub.colorIdx : subjectIdx) + 1) % 7;
  save();
  renderClassPanel();
};

const gradeOptions = ['A','B','C','D','E','F'];
function gradeToScore(grade) {
  switch((grade||"").toUpperCase()) {
    case "A": return 100;
    case "B": return 80;
    case "C": return 60;
    case "D": return 40;
    case "E": return 10;
    case "F": return 0;
    default: return "";
  }
}
function scoreToGrade(score) {
  if (score === "" || score === undefined) return "";
  score = Number(score);
  if (score === 100) return "A";
  if (score >= 80) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  if (score >= 10) return "E";
  return "F";
}
function subjectScoreToTP(subject, score) {
  if (!subject.tpScale) return "";
  score = Number(score);
  for (const {min, tp} of subject.tpScale) {
    if (score >= min) return tp;
  }
  return "";
}

window.updateScore = function(sid, classId, subjectIdx, chap, val) {
  const stu = getStudentById(sid);
  val = val === "" ? "" : Number(val);
  stu.scores = stu.scores || {};
  stu.scores[classId] = stu.scores[classId] || {};
  const subjectObj = getClassById(classId).subjects[subjectIdx];
  if (!stu.scores[classId][subjectObj.name]) stu.scores[classId][subjectObj.name] = {};
  stu.scores[classId][subjectObj.name][chap] = val;
  save(); renderClassPanel();
};
window.updateGrade = function(sid, classId, subjectIdx, chap, g) {
  const stu = getStudentById(sid);
  const val = gradeToScore(g);
  stu.scores = stu.scores || {};
  stu.scores[classId] = stu.scores[classId] || {};
  const subjectObj = getClassById(classId).subjects[subjectIdx];
  if (!stu.scores[classId][subjectObj.name]) stu.scores[classId][subjectObj.name] = {};
  stu.scores[classId][subjectObj.name][chap] = val;
  save(); renderClassPanel();
};

// ===================
// TP Modal
// ===================
let tpModalCurrent = null;
window.showTPModal = function(classId, subjectIdx) {
  const cls = getClassById(classId);
  ensureSubjectsAreObjects(cls);
  const subject = cls.subjects[subjectIdx];
  tpModalCurrent = {classId, subjectIdx};
  document.getElementById('tp-modal-subject').textContent = subject.name;
  const form = document.getElementById('tp-scale-form');
  form.innerHTML = '';
  let scale = subject.tpScale || defaultTPScale();
  scale = scale.slice().sort((a,b)=>b.min-a.min);
  for (let i=0; i<scale.length; ++i) {
    const row = document.createElement('div');
    row.className = 'tp-row';
    row.innerHTML = `
      <label>TP${scale[i].tp}</label>
      <span>≥ <input type="number" min="0" max="100" value="${scale[i].min}" style="width:4em" data-tp="${scale[i].tp}"></span>
      <button type="button" style="background:var(--red);" onclick="window.removeTPRow(${i})">${LANGS[LANG].delete}</button>
    `;
    form.appendChild(row);
  }
  const addRow = document.createElement('div');
  addRow.style.marginTop = '1.2em';
  addRow.innerHTML = `<button type="button" style="background:var(--primary);" onclick="window.addTPRow()">${LANGS[LANG].add_subject_btn}</button>`;
  form.appendChild(addRow);
  document.getElementById('tp-modal').style.display = '';
};
window.removeTPRow = function(idx) {
  const form = document.getElementById('tp-scale-form');
  form.removeChild(form.children[idx]);
};
window.addTPRow = function() {
  const form = document.getElementById('tp-scale-form');
  const row = document.createElement('div');
  row.className = 'tp-row';
  row.innerHTML = `
    <label>TP?</label>
    <span>≥ <input type="number" min="0" max="100" value="0" style="width:4em" data-tp=""></span>
    <button type="button" style="background:var(--red);" onclick="window.removeTPRow(${form.children.length-1})">${LANGS[LANG].delete}</button>
  `;
  form.insertBefore(row, form.lastChild);
};
document.getElementById('tp-scale-save-btn').onclick = function() {
  if (!tpModalCurrent) return;
  const {classId, subjectIdx} = tpModalCurrent;
  const cls = getClassById(classId);
  const subject = cls.subjects[subjectIdx];
  const form = document.getElementById('tp-scale-form');
  let newScale = [];
  for (let row of form.querySelectorAll('.tp-row')) {
    const tp = parseInt(row.querySelector('label').textContent.replace('TP','').trim()) || '';
    const min = parseInt(row.querySelector('input').value) || 0;
    newScale.push({min, tp});
  }
  newScale = newScale.filter(row => row.tp && !isNaN(row.min));
  newScale.sort((a,b)=>b.min-a.min);
  subject.tpScale = newScale;
  save();
  document.getElementById('tp-modal').style.display = 'none';
  tpModalCurrent = null;
  renderClassPanel();
};
document.getElementById('tp-scale-cancel-btn').onclick = function() {
  document.getElementById('tp-modal').style.display = 'none';
  tpModalCurrent = null;
};

// =================
// Class Panel
// =================
let currentClassId = null;
function renderClassTabs() {
  const S = LANGS[LANG];
  const ct = document.getElementById('class-tabs');
  ct.innerHTML = '';
  classes.forEach((cls, i) => {
    const btn = document.createElement('button');
    btn.className = 'class-tab-btn' + (currentClassId === cls.id ? ' active' : '');
    btn.innerText = cls.name;
    btn.onclick = () => { window.selectClass(cls.id, btn); };

    // Delete button fix
    const delBtn = document.createElement('button');
    delBtn.innerText = "🗑️";
    delBtn.title = S.delete;
    delBtn.className = "class-delete-btn";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (!confirm(`${S.confirm_delete_class} "${cls.name}"?`)) return;
      window.deleteClass(cls.id);
    };

    const wrapper = document.createElement('span');
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.appendChild(btn);
    wrapper.appendChild(delBtn);

    ct.appendChild(wrapper);
  });
}
window.deleteClass = function(classId) {
  const cls = getClassById(classId);
  if (!cls) return;
  classes = classes.filter(c => c.id !== classId);
  students.forEach(stu => {
    if (stu.scores && stu.scores[classId]) delete stu.scores[classId];
  });
  save();
  if (currentClassId === classId) {
    if (classes.length) {
      currentClassId = classes[0].id;
    } else {
      currentClassId = null;
    }
  }
  renderClassTabs();
  renderClassPanel();
};
window.selectClass = function(classId, btn) {
  document.querySelectorAll('.class-tab-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  currentClassId = classId;
  renderClassPanel();
};
document.getElementById('class-add-form').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('class-name-input').value.trim();
  if (name && !classes.find(c=>c.name===name)) {
    classes.push({ 
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,7), 
      name, 
      studentIds: [], 
      teams: [], 
      subjects: [],
      chapters: [] 
    });
    save();
    this.reset();
    renderClassTabs();
    renderClassPanel();
  }
};

function renderClassPanel() {
  const S = LANGS[LANG];
  if (!currentClassId) { document.getElementById('class-panel').innerHTML = ''; return; }
  const cls = getClassById(currentClassId);
  if (!cls) return;
  ensureSubjectsAreObjects(cls);
  cls.studentIds = cls.studentIds || [];
  cls.teams = cls.teams || [];
  cls.subjects = cls.subjects || [];
  cls.chapters = cls.chapters || [];
  // Students in class
  const studentRows = cls.studentIds.map(sid => {
    const stu = getStudentById(sid);
    return stu ? `
      <li class="class-student-item">
        <span>${stu.name}</span>
        <button style="background:var(--red);" onclick="window.removeFromClass('${cls.id}','${stu.id}')">${S.remove}</button>
      </li>
    ` : '';
  }).join('');
  // Team section with colored badge and per-member point controls
  const teamHtml = (cls.teams.length ? `<ul class="team-list">` + cls.teams.map(team => {
    const members = (team.memberIds||[]);
    const currentScore = members.reduce((total, id) => {
      const stu = getStudentById(id);
      return total + (stu ? Math.min(stu.points || 0, 1000) : 0);
    }, 0);
    const maxScore = members.length * 1000;
    let perc = maxScore ? currentScore / maxScore : 0;
    let badgeColor = perc >= 1 ? '#0984e3'
      : perc >= 0.75 ? '#20bf6b'
      : perc >= 0.5 ? '#fd9644'
      : '#e74c3c';
    return `
      <li>
        <b>${team.name}</b>
        <span style="float:right;font-weight:bold;margin-left:1em;">
          <span style="
            display:inline-block;
            background: ${badgeColor};
            color: #fff;
            border-radius: 1em;
            padding: 0.2em 1em;
            min-width: 4.5em;
            font-size:1.08em;
          ">
            ${currentScore} / ${maxScore}
          </span>
        </span>
        <button style="background:#fff;color:var(--red);float:right;margin-right:0.5em;" onclick="if(confirm('${S.confirm_delete_team}'))window.deleteTeam('${cls.id}','${team.id}')">🗑️</button>
        <div class="team-member-list">
          ${S.members}
          ${
            members.length
              ? members.map(id => {
                  const stu = getStudentById(id);
                  if (!stu) return "";
                  return `
                    <span style="display:inline-flex;align-items:center;margin-right:0.7em;">
                      ${stu.name}
                      <span class="point-box" style="min-width:3.5em;margin-left:0.35em;">${stu.points || 0}</span>
                      <button style="background:var(--tp-5-6);margin-left:2px;" onclick="window.addPoint('${stu.id}')">+1</button>
                      <button style="background:var(--tp-1-2);margin-left:2px;" onclick="window.subPoint('${stu.id}')">-1</button>
                    </span>
                  `;
                }).join('')
              : '-'
          }
        </div>
        <form onsubmit="window.assignToTeam(event, '${cls.id}','${team.id}')">
          <select>
            <option value="">${S.assign_student}</option>
            ${cls.studentIds.filter(sid => !team.memberIds.includes(sid)).map(sid => `<option value="${sid}">${getStudentById(sid)?.name}</option>`).join('')}
          </select>
          <button type="submit" style="background: #fff; color: var(--primary); border: 1.5px solid var(--primary);">${S.assign}</button>
        </form>
      </li>
    `;
  }).join('') + `</ul>` : `<div style="color:var(--primary);margin:1em 0;">${S.no_teams}</div>`);
  // Subject/chapter management
  const subChForm = `
    <form id="subch-form" class="inline-form">
      <input id="subch-sub" type="text" placeholder="${S.add_subject}" />
      <button type="submit">${S.add_subject_btn}</button>
      <input id="subch-chap" type="text" placeholder="${S.add_chap}" />
      <button type="button" onclick="window.addChapter('${cls.id}')" style="background:var(--accent);">${S.add_chap_btn}</button>
    </form>
    <div style="margin-bottom:1em;">
      <b>${S.subjects_chaps.split("&")[0]}:</b> 
      ${cls.subjects.map((s,idx)=>
        `<span style="color:${getSubjectColor(s)};margin-right:0.7em;font-weight:700;">${s.name}
        <button style="background:var(--yellow);color:#222;padding:0 0.5em;" onclick="window.showTPModal('${cls.id}',${idx})" title="${S.edit_tp_scale}">${S.tp_edit}</button>
        </span>`).join('')}
      <br/>
      <b>${S.subjects_chaps.split("&")[1]||"Chapters"}:</b> ${cls.chapters.map(c=>`<span style="color:var(--accent);margin-right:0.7em">${c}</span>`).join('')}
    </div>
  `;
  // Scores/TP per subject card
  let subjectCards = '';
  cls.subjects.forEach((sub, subjectIdx) => {
    let color = getSubjectColor(sub);
    let studentsTable = `
      <table class="subject-card-table">
        <thead>
          <tr>
            <th>${LANGS[LANG].tab_students}</th>
            ${cls.chapters.map(chap => `<th>${chap}</th>`).join('')}
            <th>TP Avg</th>
          </tr>
        </thead>
        <tbody>
          ${cls.studentIds.map(sid => {
            const stu = getStudentById(sid);
            if (!stu) return '';
            let tps = [];
            const scoreTds = cls.chapters.map(chap => {
              stu.scores = stu.scores || {};
              stu.scores[cls.id] = stu.scores[cls.id] || {};
              if (!stu.scores[cls.id][sub.name]) stu.scores[cls.id][sub.name] = {};
              let score = stu.scores[cls.id][sub.name][chap] ?? '';
              let grade = scoreToGrade(score);
              let tp = subjectScoreToTP(sub, score);
              if (score !== '') tps.push(tp);
              let tpClass = !tp ? "tp-none" : (tp<=2 ? "tp-1-2" : (tp<=4 ? "tp-3-4" : "tp-5-6"));
              return `<td>
                <input class="score-input" type="number" min="0" max="100" value="${score}" 
                  onchange="window.updateScore('${stu.id}','${cls.id}',${subjectIdx},'${chap}',this.value)">
                <select onchange="window.updateGrade('${stu.id}','${cls.id}',${subjectIdx},'${chap}',this.value)">
                  <option value="">-</option>
                  ${gradeOptions.map(g => `<option value="${g}"${g===grade?" selected":""}>${g}</option>`).join('')}
                </select>
                <span class="tp-box ${tpClass}">${tp ? 'TP'+tp : ''}</span>
              </td>`;
            }).join('');
            let avgTP = tps.length ? (tps.reduce((a,b)=>a+b,0)/tps.length).toFixed(2) : '';
            let avgClass = !avgTP ? "tp-none" : (avgTP<=2 ? "tp-1-2" : (avgTP<=4 ? "tp-3-4" : "tp-5-6"));
            return `<tr>
              <td>${stu.name}</td>${scoreTds}
              <td><span class="tp-box ${avgClass}">${avgTP ? "TP" + avgTP : ""}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
    subjectCards += `
      <div class="subject-card" style="border-color:${color};">
        <div class="subject-card-header" style="background:${color};"
          onclick="window.cycleSubjectColor('${cls.id}',${subjectIdx})"
          title="${LANGS[LANG].edit_tp_scale}">
          <span>${sub.name}</span>
          <button class="tp-edit-btn" onclick="event.stopPropagation();window.showTPModal('${cls.id}',${subjectIdx});">${LANGS[LANG].tp_edit}</button>
        </div>
        <div style="padding:0.8em 1.2em 1.2em 1.2em;">
          ${studentsTable}
        </div>
      </div>
    `;
  });
  document.getElementById('class-panel').innerHTML = `
    <h3 style="color:var(--primary);margin-bottom:0.3em;">${cls.name}</h3>
    <form id="add-stu-form" class="inline-form">
      <select id="stu-to-add">
        <option value="">${S.add_to_class}</option>
        ${students.filter(s => !cls.studentIds.includes(s.id)).map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
      </select>
      <button type="submit">${S.add_to_class}</button>
    </form>
    <ul>${studentRows}</ul>
    <h4 style="color:var(--accent);margin-top:1.6em;">${S.team} <button style="background:var(--primary);color:#fff;" onclick="window.addTeam('${cls.id}')">${S.add_team}</button></h4>
    ${teamHtml}
    <h4 style="color:var(--primary);margin-top:1.7em;">${S.subjects_chaps}</h4>
    ${subChForm}
    <h4 style="color:var(--primary);margin-top:2em;">${S.scores}</h4>
    <div class="subject-cards">
      ${subjectCards || `<div style="color:var(--primary);opacity:0.7;">${S.add_subject}</div>`}
    </div>
  `;
  document.getElementById('add-stu-form').onsubmit = function(e) {
    e.preventDefault();
    const sid = document.getElementById('stu-to-add').value;
    if (sid && !cls.studentIds.includes(sid)) {
      cls.studentIds.push(sid);
      save(); renderClassPanel(); renderClassTabs();
    }
  };
  document.getElementById('subch-form').onsubmit = function(e) {
    e.preventDefault();
    const sub = document.getElementById('subch-sub').value.trim();
    if (sub && !cls.subjects.some(s=>s.name===sub)) {
      cls.subjects.push({name:sub,tpScale:defaultTPScale(),colorIdx:cls.subjects.length % 7});
      save(); renderClassPanel();
    }
    this.reset();
  };
}
window.removeFromClass = function(classId, sid) {
  const cls = getClassById(classId);
  cls.studentIds = cls.studentIds.filter(id => id !== sid);
  cls.teams.forEach(team => team.memberIds = team.memberIds.filter(id => id !== sid));
  const stu = getStudentById(sid);
  if (stu?.scores && stu.scores[classId]) delete stu.scores[classId];
  save(); renderClassPanel();
};
window.addTeam = function(classId) {
  const name = prompt('Team name?');
  if (!name) return;
  const cls = getClassById(classId);
  cls.teams.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,7), name, memberIds: [] });
  save(); renderClassPanel();
};
window.deleteTeam = function(classId, teamId) {
  const cls = getClassById(classId);
  cls.teams = cls.teams.filter(t => t.id !== teamId);
  save(); renderClassPanel();
};
window.assignToTeam = function(e, classId, teamId) {
  e.preventDefault();
  const sid = e.target.querySelector('select').value;
  if (!sid) return;
  const cls = getClassById(classId);
  const team = cls.teams.find(t => t.id === teamId);
  if (!team.memberIds.includes(sid)) team.memberIds.push(sid);
  save(); renderClassPanel();
};
window.addChapter = function(classId) {
  const cls = getClassById(classId);
  const chap = document.getElementById('subch-chap').value.trim();
  if (chap && !cls.chapters.includes(chap)) {
    cls.chapters.push(chap);
    save();
    renderClassPanel();
  }
  document.getElementById('subch-chap').value = '';
};

// ===================
// Initialize
// ===================
renderLang();