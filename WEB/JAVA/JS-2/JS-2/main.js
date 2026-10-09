// =============================================================================
// MDT312 Web Programming - Week 6
// JavaScript 2: Arrays, Objects, Loops, Form Events & Data Handling
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Math Object (Built-in Math functions)
// -----------------------------------------------------------------------------
console.log("--- 1. Math Object ---");
console.log("Math.PI:", Math.PI);
console.log("Math.round(4.7):", Math.round(4.7));
const powerVal = Math.pow(8, 2);
console.log("Math.pow(8, 2):", powerVal);


// -----------------------------------------------------------------------------
// 2. Loops (For loop & While loop - ใช้ let แทน var)
// -----------------------------------------------------------------------------
// console.log("--- 2. Loops ---");

// 2.1 For loop
let sumFor = 0;
for (let i = 0; i < 100; i++) {
    if( i % 3 == 0 && i % 5 == 0 )
    {
        sumFor += i;
    }
}
console.log("Sum with for loop:", sumFor);

// 2.2 While loop
let sumWhile = 0;
let j = 0;
while (j < 100) {
    if( j % 2 == 0||j % 5 ==0)
    {
        sumWhile += j;
    }
    j++;
}
console.log("Sum with while loop:", sumWhile);


// -----------------------------------------------------------------------------
// 3. Array & Array Methods 
// -----------------------------------------------------------------------------
console.log("--- 3. Arrays & Methods ---");
const names = [5, 8, 9, 7, 4, 10];
console.log("Element at index 5:", names[5]);
names[5] = 6;
console.log("Updated names:", names);

// // Array Methods
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log("Initial fruits:", fruits);

// fruits.pop(); // เอาตัวท้ายออก
// console.log("After pop():", fruits);

// fruits.push("Mango"); // ใส่ตัวท้ายเพิ่ม
// console.log("After push('Mango'):", fruits);

// fruits.shift(); // เอาตัวหน้าออก
// console.log("After shift():", fruits);

// fruits.unshift("Banana"); // ใส่ตัวหน้าเพิ่ม
// console.log("After unshift('Banana'):", fruits);

// fruits.sort(); // เรียงลำดับตัวอักษร
// console.log("After sort():", fruits);


// -----------------------------------------------------------------------------
// 4. Object Literal (สร้าง Object ด้วย {} ตรงๆ - ห้ามใช้ var person = [])
// -----------------------------------------------------------------------------
console.log("--- 4. Objects ---");

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 46,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log("Person Object:", person);
console.log("Dot notation:", person.lastName);
console.log("Bracket notation:", person["lastName"]);
console.log("Method call:", person.fullName());


// -----------------------------------------------------------------------------
// 5. For...of Loop (วนซ้ำสมาชิกใน Array)
// -----------------------------------------------------------------------------
console.log("--- 5. For...of Loop ---");
const cars = ["BMW", "Volvo", "Mini"];
let carText = "";

for (const car of cars) {
    carText += car + " ";
}
console.log("Cars:", carText.trim());


// -----------------------------------------------------------------------------
// 6. Array of Objects
// -----------------------------------------------------------------------------
console.log("--- 6. Array of Objects (JSON Foundation) ---");

const pokemons = [
    { id: 1, name: "Pikachu", type: "Electric", cp: 938 },
    { id: 2, name: "Bulbasaur", type: "Grass", cp: 850 },
    { id: 3, name: "Charmander", type: "Fire", cp: 880 }
];

console.log("Array of Pokemons:", pokemons);
console.log("First Pokemon Name:", pokemons[0].name); // Pikachu
console.log("Second Pokemon Type:", pokemons[1].type); // Grass

// วนลูปแสดงข้อมูล Array of Objects
console.log("List of Pokemons:");
for (const p of pokemons) {
    console.log(`- #${p.id} ${p.name} (Type: ${p.type}) Max CP: ${p.cp}`);
}


// -----------------------------------------------------------------------------
// 7. Form Event Handling (ใช้ event.preventDefault() ป้องกันหน้าเว็บรีเฟรช)
// -----------------------------------------------------------------------------
// window.onload = pageLoad;

function pageLoad() {
    const form = document.getElementById("myForm");
    if (form) {
        form.onsubmit = myFormFunction;
    }

    // ตัวอย่างการอ่านข้อมูลเมื่อเปิดหน้าเว็บ (ถ้ามี Query String หรือ localStorage)
    loadStoredData();
}

function myFormFunction(event) {
    // สำคัญ: ป้องกันไม่ให้หน้าเว็บรีเฟรชเองเมื่อกด Submit
    event.preventDefault();

    const firstnameInput = document.forms["myForm"]["firstname"].value;
    const lastnameInput = document.forms["myForm"]["lastname"].value;

    alert(`Form Submitted!\nFirstname: ${firstnameInput}\nLastname: ${lastnameInput}`);
    console.log("Firstname:", firstnameInput, "Lastname:", lastnameInput);

    // ตัวอย่างการบันทึกลง localStorage
    localStorage.setItem("userFirstName", firstnameInput);
    localStorage.setItem("userLastName", lastnameInput);
    console.log("Saved to localStorage successfully!");
}


// -----------------------------------------------------------------------------
// 8. การส่งและเก็บข้อมูล: URLSearchParams vs localStorage
// -----------------------------------------------------------------------------
function loadStoredData() {
    console.log("--- 8. Data Passing & Storage ---");

    // วิธีที่ 1: URLSearchParams (จาก Query String เช่น ?firstname=John&lastname=Doe)
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        const firstnameFromURL = urlParams.get('firstname');
        const lastnameFromURL = urlParams.get('lastname');
        console.log("Data from URL query:", firstnameFromURL, lastnameFromURL);
    }

    // วิธีที่ 2: localStorage (ปลอดภัยกว่า ไม่เปิดเผย password/ข้อมูลส่วนตัวบน URL)
    const savedFirstname = localStorage.getItem("userFirstName");
    const savedLastname = localStorage.getItem("userLastName");
    if (savedFirstname) {
        console.log("Data from localStorage:", savedFirstname, savedLastname);
    }
}