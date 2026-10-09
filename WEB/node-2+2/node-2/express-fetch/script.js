// AJAX, run on localhost
// รันผ่าน localhost ตามดัวย path และ เรียก index.html
// window.onload = pageLoad;
// function pageLoad(){
//     var xhr = new XMLHttpRequest(); 
//     xhr.open("GET", "data_2.json",true); 
//     xhr.onload = function() { 
//         alert(xhr.responseText); 
//     }; 
//     xhr.onerror = function() { 
//         alert("ERROR!"); 
//     }; 
//     xhr.send();
// }

// Fetch, run on localhost 
const readLog =  (async () => {
    try {
        const response = await fetch("data_2.json");
        const data = await response.json();
        alert(JSON.stringify(data));
        console.log(data);
        addData(data);
    } catch (err) {
        console.log(err);
    }
})

readLog();

const addData =  ( (data) => {
    const div = document.getElementById("container");
    for(d of data){
        const p = document.createElement("p");
        p.textContent = `Name: ${d.first_name} ${d.last_name}, Age: ${d.age}, Female: ${d.female}`;
        div.appendChild(p);
    }
})

