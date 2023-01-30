const myform = document.getElementById("myForm");
const myamount = document.getElementById("amount");
const mydescription = document.getElementById("description");
const mycategory = document.getElementById("category");

myform.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", function () {
  getDataFromApi();
});

async function getDataFromApi() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/855049afb27f4286b28beae1b3a8fbcb/AppointmentDatas"
    );
    for (var i = 0; i < res.data.length; i++) {
      showNewUserOnScreen(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

async function onSubmit(e) {
  try {
  e.preventDefault();

  const obj = {
    amount: myamount.value,
    description: mydescription.value,
    category: mycategory.value,
  };
 
    const res = await axios.post(
      "https://crudcrud.com/api/855049afb27f4286b28beae1b3a8fbcb/AppointmentDatas",
      obj
    );
    userList.innerHTML = "";
    getDataFromApi();
  } catch (err) { 
    console.log(err);
  }

  myamount.value = "";
  mydescription.value = "";
  mycategory.value = "";
}

function showNewUserOnScreen(obj) {
  try{
  const userList = document.getElementById("userList");
  const childHTML = `<li  id =${obj._id}>CATEGORY :-${obj.category}, AMOUNT:-${obj.amount}, DESCRIPTION:-${obj.description} 
  <button type="button" class="btn btn-outline-info m-2 float-right btn-sm" onClick = editItem('${obj.description}','${obj.category}','${obj.amount}','${obj._id}')>Edit</button>
  <button type="button" class="btn btn-outline-danger btn-sm m-2 float-right" onClick = deleteItem("${obj._id}")>Delete</button>
  </li>`;
  userList.innerHTML = userList.innerHTML + childHTML;
  } catch(err){
    console.log(err);
  }
}

async function deleteItem(id) {
  try {
    const res = await axios.delete(
      `https://crudcrud.com/api/855049afb27f4286b28beae1b3a8fbcb/AppointmentDatas/${id}`
    );
    userList.innerHTML = "";
    getDataFromApi();
  } catch (err) {
    console.log(err);
  }
} 

function editItem(description, category, amount, id) {
  mydescription.value = description;
  myamount.value = amount;
  mycategory.value = category;

  deleteItem(id);
}
