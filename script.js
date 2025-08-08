const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
// queryselector gives more function than getelement


// take either arrow function or take function keyword

//collect all textarea and then save all text inside them
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];
  notes.forEach(
    (note) => {
      data.push(note.value)
    }
  )
  // console.log(data)

  if(data.length === 0) {
    localStorage.removeItem("notes")
  }
  else {
    //change array to string and the put it to localstorage
    localStorage.setItem("notes", JSON.stringify(data))
  }

}

addBtn.addEventListener (
  "click",
  function() {
    addNote() //function
  }
)


const addNote = (text = "") => { //default argument is empty
  const note = document.createElement("div");
  note.classList.add("note")
  note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>  
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
  `;
// save and trash are classes


  // for deleting a note
  note.querySelector(".trash").addEventListener (
    "click",
    function() {
      note.remove()
      saveNotes()
    }
  )

  // for saving a note locally calling function
  note.querySelector(".save").addEventListener(
    "click",
    function() {
      saveNotes() //function
    }
  )
  // after removing focus auto save
  note.querySelector("textarea").addEventListener(
    "focusout",
    function() {
      saveNotes()
    }
  )

  main.appendChild(note);
  saveNotes()
}

// self calling function which runs on page load
(
    function() {
      const lsNotes = JSON.parse(localStorage.getItem("notes"));
      //console.log(notes)
      if (lsNotes === null) {
        addNote()
      }
      else {
        lsNotes.forEach(
          (lsNotes) => {
            addNote(lsNotes)
          }
        )
      }
      // if (lsNotes.length === 0) {
      //   localStorage.removeItem("notes")
      // }
      // else {
      //   addNote()
      // }
    }
)()