// =============================================================================
// MDT312 Web Programming - Week 7 (JS-3)
// Lecture Demo Topics 
// =============================================================================

// window.addEventListener("DOMContentLoaded", initWeek7);
window.onload = initWeek7;
function initWeek7() {
    // -------------------------------------------------------------------------
    // 1. Setting a timer (Slides 11–16)
    // -------------------------------------------------------------------------
    const clickmeBtn = document.getElementById("clickme");
    if (clickmeBtn) clickmeBtn.onclick = delayedMessage;

    const intervalBtn = document.getElementById("intervalBtn");
    if (intervalBtn) intervalBtn.onclick = toggleIntervalMDT;

    const multiplyBtn = document.getElementById("multiplyBtn");
    if (multiplyBtn) multiplyBtn.onclick = delayedMultiply;

    // -------------------------------------------------------------------------
    // 2. textContent vs innerHTML (Slides 19–20)
    // -------------------------------------------------------------------------
    const addTextContentBtn = document.getElementById("addTextContentBtn");
    if (addTextContentBtn) addTextContentBtn.onclick = addWithTextContent;

    const addInnerHTMLBtn = document.getElementById("addInnerHTMLBtn");
    if (addInnerHTMLBtn) addInnerHTMLBtn.onclick = addWithInnerHTML;

    const clearTextDemoBtn = document.getElementById("clearTextDemoBtn");
    if (clearTextDemoBtn) {
        clearTextDemoBtn.onclick = function() {
            document.getElementById("textContentResult").textContent = "";
        };
    }

    // -------------------------------------------------------------------------
    // 3. Create new elements & Style by DOM (Slides 21–25)
    // -------------------------------------------------------------------------
    const addParaBtn = document.getElementById("addParaBtn");
    if (addParaBtn) addParaBtn.onclick = addParagraph;

    const styleDomBtn = document.getElementById("styleDomBtn");
    if (styleDomBtn) styleDomBtn.onclick = applyDomStyle;

    // -------------------------------------------------------------------------
    // 4. Selecting groups of DOM objects (Slides 26–28)
    // -------------------------------------------------------------------------
    const highlightAddressBtn = document.getElementById("highlightAddressBtn");
    if (highlightAddressBtn) highlightAddressBtn.onclick = highlightAddressParagraphs;

    const highlightPTagBtn = document.getElementById("highlightPTagBtn");
    if (highlightPTagBtn) highlightPTagBtn.onclick = highlightAllParagraphs;

    const resetAddressBtn = document.getElementById("resetAddressBtn");
    if (resetAddressBtn) resetAddressBtn.onclick = resetAddressParagraphs;

    // -------------------------------------------------------------------------
    // 5. Getting/setting CSS classes: className & classList (Slides 29–35)
    // -------------------------------------------------------------------------
    const toggleHighlightBtn = document.getElementById("toggleHighlightBtn");
    if (toggleHighlightBtn) toggleHighlightBtn.onclick = toggleHighlight;

    const addClassHighlight2Btn = document.getElementById("addClassHighlight2Btn");
    if (addClassHighlight2Btn) addClassHighlight2Btn.onclick = addHighlight2;

    const resetClassBtn = document.getElementById("resetClassBtn");
    if (resetClassBtn) resetClassBtn.onclick = resetClasses;

    // -------------------------------------------------------------------------
    // 6. Removing a node & ตรวจ element ก่อนลบหรือสร้างใหม่ (Slides 39–40)
    // -------------------------------------------------------------------------
    const removeBtn = document.getElementById("removeBtn");
    if (removeBtn) removeBtn.onclick = removeUsingRemove;

    const removeChildBtn = document.getElementById("removeChildBtn");
    if (removeChildBtn) removeChildBtn.onclick = removeUsingParentNode;

    const resetRemovalBtn = document.getElementById("resetRemovalBtn");
    if (resetRemovalBtn) resetRemovalBtn.onclick = resetRemovalDemo;

    const removeMeBtn = document.getElementById("removeMeBtn");
    if (removeMeBtn) removeMeBtn.onclick = toggleRemoveMe;

    // -------------------------------------------------------------------------
    // 7. JavaScript Events & Mouse Coordinates (Slides 41–45)
    // -------------------------------------------------------------------------
    const target = document.getElementById("target");
    if (target) {
        target.onmousemove = target.onmousedown = showCoords;
    }

    // -------------------------------------------------------------------------
    // 8. Event Delegation (Interactive Task List)
    // -------------------------------------------------------------------------
    const addTaskBtn = document.getElementById("addTaskBtn");
    if (addTaskBtn) {
        addTaskBtn.onclick = addTaskItem;
    }

    const taskInput = document.getElementById("taskInput");

    const todoList = document.getElementById("todo-list");
    if (todoList) {
        todoList.onclick = handleTodoListClick;
    }
}


// =============================================================================
// 1. Setting a timer (Slides 11–16)
// =============================================================================

// 1.1 setTimeout (Slide 12)
function delayedMessage() {
    const output = document.getElementById("output");
    output.textContent = "Wait for it...";
    setTimeout(sayHello, 5000);
}

function sayHello() {
    const output = document.getElementById("output");
    output.textContent = "Hello!";
}

// 1.2 setInterval (Slides 13–14)
let intervalTimer = null;

function toggleIntervalMDT() {
    if (intervalTimer === null) {
        intervalTimer = setInterval(showMDT, 1000);
    } else {
        clearInterval(intervalTimer);
        intervalTimer = null;
    }
}

function showMDT() {
    const output = document.getElementById("outputInterval");
    output.textContent += " MDT!";
}

// 1.3 Passing parameters to timer (Slides 15–16)
function delayedMultiply() {
    setTimeout(multiply, 2000, 6, 7);
}

function multiply(a, b) {
    alert(`Result: ${a} * ${b} = ${a * b}`);
}


// =============================================================================
// 2. textContent vs innerHTML (Slides 19–20)
// =============================================================================
function addWithTextContent() {
    const result = document.getElementById("textContentResult");
    const p = document.createElement("p");
    p.textContent = "<strong>Hello</strong> (แสดงแท็กเป็นข้อความธรรมดา ปลอดภัยจาก XSS)";
    result.appendChild(p);
}

function addWithInnerHTML() {
    const result = document.getElementById("textContentResult");
    const p = document.createElement("p");
    p.innerHTML = "<strong>Hello</strong> (แสดงเป็นตัวหนา แปลงเป็น HTML Tag)";
    result.appendChild(p);
}


// =============================================================================
// 3. Create new elements & Setting Style by DOM (Slides 21–25)
// =============================================================================
function addParagraph() {
    const main = document.getElementById("main");
    const p = document.createElement("p");
    p.textContent = "A paragraph!";
    main.appendChild(p);
}

function applyDomStyle() {
    const main = document.getElementById("main");
    main.style.color = "red";
    main.style.marginLeft = "50px";
}


// =============================================================================
// 4. Selecting groups of DOM objects (Slides 26–28)
// =============================================================================
function highlightAddressParagraphs() {
    const addrParas = document.querySelectorAll("#address p");
    for (let i = 0; i < addrParas.length; i++) {
        addrParas[i].style.backgroundColor = "yellow";
    }
}

function resetAddressParagraphs() {
    const addrParas = document.querySelectorAll("#address p");
    for (let i = 0; i < addrParas.length; i++) {
        addrParas[i].style.backgroundColor = "";
    }
}

function highlightAllParagraphs() {
    const allParas = document.querySelectorAll("p");
    for (let i = 0; i < allParas.length; i++) {
        allParas[i].style.backgroundColor = "lightblue";
    }
}


// =============================================================================
// 5. Getting/setting CSS classes (Slides 29–35)
// =============================================================================
function toggleHighlight() {
    const target = document.getElementById("classTarget");
    target.classList.toggle("highlight");
}

function addHighlight2() {
    const target = document.getElementById("classTarget");
    target.classList.add("highlight2");
}

function resetClasses() {
    const target = document.getElementById("classTarget");
    target.className = "class-target-box";
}


// =============================================================================
// 6. Removing a node & ตรวจ element ก่อนลบหรือสร้างใหม่ (Slides 39–40)
// =============================================================================

// วิธีที่ 1: Modern JS - x.remove()
function removeUsingRemove() {
    const item1 = document.getElementById("box-remove");
    if (item1) item1.remove();
}

// วิธีที่ 2: Legacy JS - x.parentNode.removeChild(x)
function removeUsingParentNode() {
    const item2 = document.getElementById("box-removeChild");
    if (item2 && item2.parentNode) {
        item2.parentNode.removeChild(item2);
    }
}

function resetRemovalDemo() {
    const container = document.getElementById("main2");
    container.textContent = "";

    const box1 = document.createElement("div");
    box1.id = "box-remove";
    box1.className = "removable-item";
    box1.textContent = "Item 1 (.remove())";

    const box2 = document.createElement("div");
    box2.id = "box-removeChild";
    box2.className = "removable-item";
    box2.textContent = "Item 2 (.parentNode.removeChild())";

    container.appendChild(box1);
    container.appendChild(box2);
}

// Slide 40: ตรวจ element ก่อนลบหรือสร้างใหม่
function toggleRemoveMe() {
    const x = document.getElementById("removeMe");
    if (x) {
        x.remove();
    } else {
        const container = document.getElementById("mainToggleRemove");
        const h3 = document.createElement("h3");
        h3.id = "removeMe";
        h3.className = "removable-item";
        h3.textContent = "Hello World,";
        container.appendChild(h3);
    }
}


// =============================================================================
// 7. Event Object & Mouse Coordinates (Slides 41–45)
// =============================================================================
function showCoords(event) {
    const target = document.getElementById("target");
    target.textContent = 
        "screen : (" + event.screenX + ", " + event.screenY + ")\n" +
        "client : (" + event.clientX + ", " + event.clientY + ")\n" +
        "button : " + event.button;
}


// =============================================================================
// 8. Event Delegation (Interactive Task List)
// =============================================================================
function addTaskItem() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") return;

    const todoList = document.getElementById("todo-list");

    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text + "+";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.title = "ลบรายการ";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    input.value = "";
    input.focus();
    updateTaskCount();
}

function handleTodoListClick(event) {
    // 1. ถ้าคลิกโดนปุ่มลบ
    if (event.target.classList.contains("delete-btn")) {
        const item = event.target.closest(".todo-item");
        if (item) {
            item.remove();
            updateTaskCount();
        }
    }
    // 2. ถ้าคลิกที่ตัวข้อความ หรือแถวรายการ -> สลับสถานะ completed
    else if (event.target.classList.contains("task-text") || event.target.classList.contains("todo-item")) {
        const item = event.target.closest(".todo-item");
        if (item) {
            item.classList.toggle("completed");
        }
    }
}

function updateTaskCount() {
    const total = document.querySelectorAll("#todo-list .todo-item").length;
    const countBadge = document.getElementById("task-count");
    if (countBadge) {
        countBadge.textContent = `รายการทั้งหมด: ${total} งาน`;
    }
}
