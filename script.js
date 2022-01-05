
//variable initialization 
let tbody = document.getElementById('tbody');
let str ;

toDoDetail();

function toDoDetail() {
    url = 'https://jsonplaceholder.typicode.com/todos';
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) =>{
        console.log(data);
        str = '';
        for(let k of data){
            str +=`
            <tr class="main">
            <th scope="row">${k.id}</th>
            <td>${k.title}</td>
            <td>${k.completed}</td>
            <td>
            
            <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#view${k.id}" id="${k.id}" onclick="viewUser(this.id)">
  View User
</button>
<div class="modal fade" id="view${k.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

<div class="modal-dialog" role="document" id="user${k.id}">

</div>
</div>

   </td>
          </tr>
            
            `
        }
      tbody.innerHTML = str;  
        
        
          let main = document.querySelectorAll('.main');
      let inputBtn = document.getElementById('inputBtn');
      inputBtn.addEventListener('input', () =>{
            Array.from(main).forEach((element) =>{
              if(element.children[1].innerHTML.toLowerCase().includes(inputBtn.value.toLowerCase())){
                element.style.display="";
              }
              else{
                element.style.display="none";
              }
            })
      })
        
      
    })
}


function viewUser(id){
    console.log(id);
    
    url = `https://jsonplaceholder.typicode.com/users/${id}`;
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) =>{
        console.log(data);
        let view = document.getElementById(`user${id}`);
        view.innerHTML = `
        
      
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">User Detail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">ToDo Id - ${data.id}</li>
        
          <li class="list-group-item">Name - ${data.name}</li>
          <li class="list-group-item">Email - ${data.email}</li>
        
         
        </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          
          </div>
        </div>
     `
    });
}
