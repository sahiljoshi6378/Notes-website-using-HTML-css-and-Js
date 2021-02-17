// Calling the showNote() function to update the ui
showNotes()



// Reference of the add note button and delete all button in the global scope 
const btnAddnote =document.getElementById('btnAddnote');
let titleName = document.getElementById('titleName');
let noteText =  document.getElementById('noteText');


// Main EventListener on add note button
btnAddnote.addEventListener("click",function(e){
    e.preventDefault() 
    if(titleName.value == "" || noteText.value ==""|| titleName.value.length <5 || titleName.value.length>20  || noteText.value.length < 5 || noteText.value.length >50 ){
        alertBox('Can\'t add this note');
    }
    else{

        let noteObj = {
            title: titleName.value,
            text : noteText.value
        };

        // adding and getting the notes to the LocalStorage
        let notes = localStorage.getItem('notes');
        if (notes === null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
            }

        notesObj.push(noteObj);
        localStorage.setItem('notes',JSON.stringify(notesObj));
        showNotes();
        // reset the inner Text of the input feinds
        document.getElementById('titleName').value ="";
        document.getElementById('noteText').value="";

        alertBox('Added a note');
        
    }
})





// Function to show all the notes
function showNotes(){
    // Getting all the notes form localstorage
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html ="";
    notesObj.forEach(function(element,index){
        // appending the below given html string with the filled inputes of each object 
        html +=`
        <th style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: 100; color: white"" scope="row">${index+1}</th>
        <td  style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: 100; color: white"" >${element.title}</td>
        <td  style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: 100; color: white"" >${element.text}</td>
        <td ><button style="padding:6px 10px 6px 10px;border-color: white;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: 300; color: white" class="btn btn-outline-success" id="${index}" onclick="dltNote(this.id)"><i style="padding: 3px" class="far fa-trash-alt"></i>Delete</button></td>
      </tr>`
    })
    
    let notesContainor = document.getElementById('populatingAllNotes');
    if(notes !=""){
        // updating the ui
        notesContainor.innerHTML = html;
    }

}


// Reload the ui
document.getElementById('reloadPage').addEventListener('click',(()=>{
    location.reload();
}))


// Function to delete a single note
function dltNote(index){
    // Getting all the notes from locan stogate 
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);

    // updating the local storage
    localStorage.setItem('notes',JSON.stringify(notesObj));

    // Updating the Ui
    showNotes();

    // Showing the alert
    alertBox('delete single note');
}




// Delete all the notes
const btlDeleteAll =document.getElementById('btlDeleteAll').addEventListener('click',(()=>{
    localStorage.clear()
    showNotes();
    alertBox('deleting the all notes');
}))




// alert box function -------------------------[START]------------------------------------------------ //
const alertBox =((situaTion)=>{
    if (situaTion === 'Added a note'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Success! :</strong> Your note has been added.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
    }
    else if(situaTion === 'Can\'t add this note'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error!</strong> You should have cheeck the feildes.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
    }
    else if(situaTion === 'delete single note'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Successfull!</strong> Note has been successfully removed.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
    }
    else if(situaTion === 'deleting the all notes'){
        document.getElementById('alert').innerHTML =`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Success:</strong> All the notes are being removed.
        <button type="button" id="autocloseBtn" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        
        setTimeout(() => {
            document.getElementById('autocloseBtn').click();
            situaTion ='';
        }, 2000);
    }

})
// alert box function -------------------------------[END]---------------------------------------------------//
