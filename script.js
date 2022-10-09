let addNote = document.querySelector('.add_note');
let popupBox = document.querySelector('.popup_box');
let closeBox = popupBox.querySelector('header i');
let popupBoxTitle = popupBox.querySelector('header p');
let addNoteBtn = document.getElementById('addNoteBtn');
let noteTitle = popupBox.querySelector('input');
let noteDesc = popupBox.querySelector('textarea');
let monthName = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
const notes = JSON.parse(localStorage.getItem('notes') || "[]");
let isUpdate = false, updateId;
let viewBox = document.querySelector('.view_box');
let viewTitle = viewBox.querySelector('.view_title'),
viewDesc = viewBox.querySelector('.view_description');

// Open Popup Box
addNote.addEventListener('click', () => {
    noteTitle.focus();
    popupBox.classList.add('show');
})

// Close Popup Box
closeBox.addEventListener('click', () => {
    popupBox.classList.remove('show');
    noteTitle.value = null;
    noteDesc.value = null;
    addNoteBtn.innerText = 'Add Note';
    popupBoxTitle.innerHTML = 'Add a new Note';
})

// Show notes function
function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let noteInfo = `<div class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.desc}</span>
                            </div>
                            <div class="bottom_content">
                                <span>${note.date}</span>
                                <div class="setting">
                                    <i class="icon" onclick="showMenu(this);">#</i>
                                    <ul class="menu">
                                        <li onclick="viewNote(${index});"># View</li>
                                        <li onclick="updateNote(${index}, '${note.title}', '${note.desc}');"># Edit</li>
                                        <li onclick="deleteNote(${index});"># Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </div>`;
        addNote.insertAdjacentHTML('afterend', noteInfo);
    });
}

// initial call
showNotes();

// Show Menu function
function showMenu(elam) {
    elam.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != elam) elam.parentElement.classList.remove('show');
    })
}

// View a Note
function viewNote(index) {
    viewBox.classList.add('show');
    viewTitle.innerText = notes[index].title;
    viewDesc.innerText = notes[index].desc;
    
}

// closeShowNote
function closeShowNote() {
    viewBox.classList.remove('show');
}

// Delete function 
function deleteNote(index){
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

// Update Function
function updateNote(index, title, desc){
    isUpdate = true;
    updateId = index;
    addNote.click();
    addNoteBtn.innerText = 'Update Note';
    popupBoxTitle.innerHTML = 'Update a Note';
    noteTitle.value = title;
    noteDesc.value = desc;
}

// Date function
function newDate(){
    let dateObg = new Date(),
    day = dateObg.getDate(),
    month = monthName[dateObg.getMonth()],
    year = dateObg.getFullYear();
    let date = `${month} ${day}, ${year}`;

    return date;
}

// Uniqe Id function
function uniqueId() {
    let uniqueId, str = "";
    let num = Math.round(Math.random() * 1000000000);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}[]:<>?,./+-*"

    for (i = 0; i < 10; i++) {
        str += possible[Math.floor(Math.random() * possible.length)]
    }

    uniqueId = "uid_" + str + "_" + num;

    return uniqueId;
}

// Adding and Update a Note
addNoteBtn.addEventListener('click', () => {
    let title = noteTitle.value,
    desc = noteDesc.value;

    if(title || desc){
        let note = {
            _id: uniqueId(),
            title: title,
            desc: desc,
            date: newDate()
        }
        
        if(!isUpdate){
            notes.push(note);
        }else{
            isUpdate = false;
            notes[updateId] = note;
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        closeBox.click();
        showNotes();
    }else{
        alert('Please enter some value');
    }
    
})