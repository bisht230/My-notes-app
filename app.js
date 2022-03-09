window.addEventListener('DOMContentLoaded', showNote());
// for buttons 
const addBtn = document.getElementById('addBtn');

// for adding the notes then the content in txtarea will save in local storage
addBtn.addEventListener('click', function () {
    let txt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];   //notesObj is the array
    }
    else {
        notesObj = JSON.parse(notes);     // it is used when we get the string
    }
    notesObj.push(txt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    txt.value = '';
    // console.log(notesObj); 
    showNote();
});

// function to show the elements in local storage
function showNote() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
<div class=" noteCard card my-2 mx-2" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Note ${index + 1}</h5>
    <p class="card-text">${element}</p>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
  </div>
</div> `;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show !! use "Add Note" option`;
    }
}

// function to delete node
function deleteNote(index) {
    console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");   // for storing the notes in local storage
    if (notes == null) {
        notesObj = [];   //notesObj is the array
    }
    else {
        notesObj = JSON.parse(notes);     // it is used when we get the string
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNote();
}

// for searching the element inside the search box 
let searchTxt = document.getElementById('search');
searchTxt.addEventListener('input', function () {
    let inputVal = searchTxt.value.toLowerCase();
    // console.log('fire',inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = document.getElementsByTagName('p')[0].textContent;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});