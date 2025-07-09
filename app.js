let classes = {}; // { className: { subjects: [subjectName], students: [{ name, subjects: [{ name, chapters: [] }] }] } }
let currentClassTab = '';
let currentPage = 'students'; // 'students' or 'classes'

// --- Persistence Helpers ---
function saveData() {
    localStorage.setItem('tp_classes', JSON.stringify(classes));
    localStorage.setItem('tp_currentClassTab', currentClassTab);
    localStorage.setItem('tp_currentPage', currentPage);
}

function loadData() {
    const stored = localStorage.getItem('tp_classes');
    if (stored) classes = JSON.parse(stored);
    const storedTab = localStorage.getItem('tp_currentClassTab');
    if (storedTab) currentClassTab = storedTab;
    const storedPage = localStorage.getItem('tp_currentPage');
    if (storedPage) currentPage = storedPage;
}

// --- Initialization ---
window.onload = function() {
    loadData();
    renderPageSwitcher();
    renderStudentManager();
    renderClassTabs();
    renderClassContent();
    showPage(currentPage);
};

function renderPageSwitcher() {
    const switcher = document.getElementById('pageSwitcher');
    switcher.innerHTML = `
        <button onclick="showPage('students')" class="${currentPage === 'students' ? 'active' : ''}">Student Manager</button>
        <button onclick="showPage('classes')" class="${currentPage === 'classes' ? 'active' : ''}">Class Tabs</button>
        <hr>
    `;
}

window.showPage = function(page) {
    currentPage = page;
    saveData();
    renderPageSwitcher();
    document.getElementById('studentManager').style.display = page === 'students' ? '' : 'none';
    document.getElementById('classTabs').style.display = page === 'classes' ? '' : 'none';
    document.getElementById('classContent').style.display = page === 'classes' ? '' : 'none';
};

function renderStudentManager() {
    const div = document.getElementById('studentManager');
    let allStudents = [];
    Object.keys(classes).forEach(cls => {
        classes[cls].students.forEach(stu => {
            allStudents.push({ name: stu.name, className: cls });
        });
    });
    div.innerHTML = `
        <h2>All Students</h2>
        <ul>
            ${allStudents.length === 0 ? '<li>No students yet.</li>' : allStudents.map(s => `<li>${s.name} <span style="color:#888;">[${s.className}]</span></li>`).join('')}
        </ul>
        <p style="color:#888;">To add students, go to the Class Tabs view.</p>
    `;
}

function renderClassTabs() {
    const classNames = Object.keys(classes);
    const tabDiv = document.getElementById('classTabs');
    tabDiv.innerHTML = classNames.map(cls =>
        `<span class="class-tab">
            <button class="tab-btn${cls === currentClassTab ? ' active' : ''}" onclick="switchClassTab('${cls}')">${cls}</button>
            <button class="delete-class-btn" onclick="deleteClass('${cls}')" title="Delete Class">X</button>
        </span>`
    ).join(' ') +
    `<button class="tab-btn add-tab" onclick="showAddClass()">+ Add Class</button>`;
}

window.switchClassTab = function(cls) {
    currentClassTab = cls;
    saveData();
    renderClassTabs();
    renderClassContent();
};

window.showAddClass = function() {
    const className = prompt('Enter new class name:');
    if (className && !classes[className]) {
        classes[className] = { subjects: [], students: [] };
        currentClassTab = className;
        saveData();
        renderClassTabs();
        renderClassContent();
    }
};

function renderClassContent() {
    const contentDiv = document.getElementById('classContent');
    if (!currentClassTab || !classes[currentClassTab]) {
        contentDiv.innerHTML = '<div style="text-align:center;color:#888;">Select a class tab or add a new class.</div>';
        return;
    }
    const cls = classes[currentClassTab];

    // Subject management
    let subjectHtml = `
        <div class="subject-manage">
            <form id="addSubjectForm">
                <input type="text" id="newSubjectName" placeholder="Add Subject to ${currentClassTab}" required>
                <button type="submit">Add Subject</button>
            </form>
            <div class="subject-list">
                ${cls.subjects.map((subj, i) => `
                    <span class="subject-chip">${subj}
                        <button onclick="deleteClassSubject('${currentClassTab}',${i})" title="Delete Subject">&times;</button>
                    </span>
                `).join('')}
            </div>
        </div>
    `;

    // Student management
    let studentHtml = `
        <form id="addStudentForm">
            <input type="text" id="newStudentName" placeholder="Student Name" required>
            <button type="submit">Add Student</button>
        </form>
        <div id="studentsList">
            ${cls.students.map((student, sIdx) => `
                <div class="student-card">
                    <div>
                        <strong>${student.name}</strong>
                        <button onclick="deleteStudent('${currentClassTab}',${sIdx})" style="float:right;background:#e74c3c;">Delete Student</button>
                    </div>
                    <div class="subjects">
                        ${student.subjects.map((subject, subjIdx) => {
                            let newTPRating = "TP0";
                            if (subject.chapters.length > 0) {
                                const average = subject.chapters.reduce((sum, chap) => sum + chap.tp, 0) / subject.chapters.length;
                                newTPRating = "TP" + Math.round(average);
                            }
                            return `
                            <div class="subject-header">
                                ${subject.name} (Total TP: <span class="total-tp" id="totalTP${sIdx}_${subjIdx}">${newTPRating}</span>)
                                <ul class="chapter-list" id="chapterList${sIdx}_${subjIdx}">
                                    ${subject.chapters.map((chap, chapIdx) => `
                                        <li>
                                            ${chap.chapter} (${chap.type}): TP ${chap.tp}
                                            <button onclick="deleteChapter('${currentClassTab}',${sIdx},${subjIdx},${chapIdx})" style="background:#c0392b;">Delete</button>
                                        </li>
                                    `).join('')}
                                </ul>
                                <form onsubmit="return addChapter(event, '${currentClassTab}', ${sIdx}, ${subjIdx})">
                                    <input type="text" placeholder="Chapter Name" id="chapterName${sIdx}_${subjIdx}" required>
                                    <input type="text" placeholder="TP Type" id="tpType${sIdx}_${subjIdx}" required>
                                    <input type="number" placeholder="TP Value" id="tpValue${sIdx}_${subjIdx}" min="1" max="6" step="1" required>
                                    <button type="submit">Add Chapter TP</button>
                                </form>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    contentDiv.innerHTML = subjectHtml + studentHtml;

    // Add subject event
    document.getElementById('addSubjectForm').onsubmit = function(e) {
        e.preventDefault();
        const subjName = document.getElementById('newSubjectName').value.trim();
        if (subjName && !cls.subjects.includes(subjName)) {
            cls.subjects.push(subjName);
            // Add this subject to all students in this class
            cls.students.forEach(stu => {
                stu.subjects.push({ name: subjName, chapters: [] });
            });
            saveData();
            renderClassContent();
        }
        document.getElementById('newSubjectName').value = '';
    };

    // Add student event
    document.getElementById('addStudentForm').onsubmit = function(e) {
        e.preventDefault();
        const stuName = document.getElementById('newStudentName').value.trim();
        if (stuName) {
            cls.students.push({ name: stuName, subjects: cls.subjects.map(subj => ({ name: subj, chapters: [] })) });
            saveData();
            renderClassContent();
        }
        document.getElementById('newStudentName').value = '';
    };
}

window.addChapter = function(event, className, sIdx, subjIdx) {
    event.preventDefault();
    const chapterNameEl = document.getElementById(`chapterName${sIdx}_${subjIdx}`);
    const tpTypeEl = document.getElementById(`tpType${sIdx}_${subjIdx}`);
    const tpValueEl = document.getElementById(`tpValue${sIdx}_${subjIdx}`);
    const chapterName = chapterNameEl.value.trim();
    const tpType = tpTypeEl.value.trim();
    const tpValue = parseInt(tpValueEl.value);
    if (chapterName && tpType && !isNaN(tpValue) && tpValue >= 1 && tpValue <= 6) {
        classes[className].students[sIdx].subjects[subjIdx].chapters.push({
            chapter: chapterName,
            type: tpType,
            tp: tpValue
        });
        saveData();
        // Only update the chapter list for this subject
        renderChapterList(className, sIdx, subjIdx);
        // Calculate and update average TP rating for this subject
        const chapters = classes[className].students[sIdx].subjects[subjIdx].chapters;
        const average = chapters.reduce((sum, chap) => sum + chap.tp, 0) / chapters.length;
        const newTPRating = "TP" + Math.round(average);
        document.getElementById(`totalTP${sIdx}_${subjIdx}`).textContent = newTPRating;
        // Clear form fields
        chapterNameEl.value = '';
        tpTypeEl.value = '';
        tpValueEl.value = '';
    }
    return false;
};

function renderChapterList(className, sIdx, subjIdx) {
    const chapterList = document.getElementById(`chapterList${sIdx}_${subjIdx}`);
    const chapters = classes[className].students[sIdx].subjects[subjIdx].chapters;
    chapterList.innerHTML = chapters.map((chap, chapIdx) => `
        <li>
            ${chap.chapter} (${chap.type}): TP ${chap.tp}
            <button onclick="deleteChapter('${className}',${sIdx},${subjIdx},${chapIdx})" style="background:#c0392b;">Delete</button>
        </li>
    `).join('');
}

window.deleteChapter = function(className, sIdx, subjIdx, chapIdx) {
    classes[className].students[sIdx].subjects[subjIdx].chapters.splice(chapIdx, 1);
    saveData();
    renderChapterList(className, sIdx, subjIdx);
    // Recalculate and update subject TP rating
    let newTotal = classes[className].students[sIdx].subjects[subjIdx]
                         .chapters.reduce((sum, chap) => sum + chap.tp, 0) / (classes[className].students[sIdx].subjects[subjIdx].chapters.length || 1);
    document.getElementById(`totalTP${sIdx}_${subjIdx}`).textContent = "TP" + Math.round(newTotal);
};

window.deleteStudent = function(className, sIdx) {
    if (confirm("Are you sure you want to delete this student?")) {
        classes[className].students.splice(sIdx, 1);
        saveData();
        renderClassContent();
        renderStudentManager();
    }
};

window.deleteClass = function(className) {
    if (confirm("Are you sure you want to delete this class? All data for this class will be lost.")) {
        delete classes[className];
        if (currentClassTab === className) {
            currentClassTab = Object.keys(classes)[0] || '';
        }
        saveData();
        renderClassTabs();
        renderClassContent();
        renderStudentManager();
    }
};

window.deleteClassSubject = function(className, subjIndex) {
    if (confirm("Are you sure you want to delete this subject? It will be removed from all students in this class.")) {
        // Remove the subject from the class subjects array
        classes[className].subjects.splice(subjIndex, 1);
        // Remove this subject from each student in this class
        classes[className].students.forEach(student => {
            student.subjects.splice(subjIndex, 1);
        });
        saveData();
        renderClassContent();
    }
};