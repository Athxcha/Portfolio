// ข้อมูลผลงานแถบแรก: MDT มี 10 งาน
var work1 = [
    {name: "Assignment 1", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment1/"},
    {name: "Assignment 2", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment2/"},
    {name: "Assignment 3", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment3/"},
    {name: "Assignment 4", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment4/"},
    {name: "Assignment 5", description: "$4.00", image: "", link: "hhttps://athxcha.github.io/Portfolio/Assignment5/"},
    {name: "Assignment 6", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment6/"},
    {name: "Assignment 7", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment7/"},
    {name: "Assignment 8", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment8/"},
    {name: "Assignment 9", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment9/"},
    {name: "Assignment 10", description: "$4.00", image: "", link: "https://athxcha.github.io/Portfolio/Assignment10/"}
];

// ข้อมูลผลงานแถบที่สอง: Game มี 5 งาน
var work2 = [
    {name: "Homelomera Rubescens", description: "$4.00", image: "", link: ""},
    {name: "Licuala Grandis", description: "$4.00", image: "", link: ""},
    {name: "Fiddle Leaf Fig", description: "$4.00", image: "", link: ""},
    {name: "Homelomera Rubescens", description: "$4.00", image: "", link: ""},
    {name: "Licuala Grandis", description: "$4.00", image: "", link: ""}
];

// ข้อมูลผลงานแถบที่สาม: 3D มี 3 งาน
var work3 = [
    {name: "Homelomera Rubescens", description: "$4.00", image: "", link: ""},
    {name: "Licuala Grandis", description: "$4.00", image: "", link: ""},
    {name: "Fiddle Leaf Fig", description: "$4.00", image: "", link: ""}
];

// ข้อมูลผลงานแถบที่สี่: Activity มี 4 งาน
var work4 = [
    {name: "Homelomera Rubescens", description: "$4.00", image: "", link: ""},
    {name: "Licuala Grandis", description: "$4.00", image: "", link: ""},
    {name: "Fiddle Leaf Fig", description: "$4.00", image: "", link: ""},
    {name: "Homelomera Rubescens", description: "$4.00", image: "", link: ""}
];

var linkText = "View Work →";

window.onload = pageLoad;

function pageLoad() {
    document.getElementById("tab1").onclick = showFirstTab;
    document.getElementById("tab2").onclick = showSecondTab;
    document.getElementById("tab3").onclick = showThirdTab;
    document.getElementById("tab4").onclick = showFourthTab;

    // เลข PIC ท้ายหน้านับต่อจากจำนวนงานทั้งหมด
    var nextPicture =
        4 + work1.length + work2.length + work3.length + work4.length;

    document.getElementById("footer-pic1").textContent =
        "PIC " + nextPicture;

    document.getElementById("footer-pic2").textContent =
        "PIC " + (nextPicture + 1);

    showFirstTab();
}

function showFirstTab() {
    showWorks(work1, 4, true, "tab1");
}

function showSecondTab() {
    showWorks(work2, 4 + work1.length, false, "tab2");
}

function showThirdTab() {
    showWorks(
        work3,
        4 + work1.length + work2.length,
        false,
        "tab3"
    );
}

function showFourthTab() {
    showWorks(
        work4,
        4 + work1.length + work2.length + work3.length,
        false,
        "tab4"
    );
}

function showWorks(works, firstPic, showLink, tabId) {
    var workList = document.getElementById("work-list");

    workList.innerHTML = "";

    document.getElementById("tab1").classList.remove("active");
    document.getElementById("tab2").classList.remove("active");
    document.getElementById("tab3").classList.remove("active");
    document.getElementById("tab4").classList.remove("active");

    document.getElementById(tabId).classList.add("active");

    for (var i = 0; i < works.length; i++) {
        var card = document.createElement("div");
        card.className = "work-card";

        var picture = document.createElement("div");
        picture.className = "picture";

        if (works[i].image == "") {
            picture.textContent = "PIC " + (firstPic + i);
        } else {
            var img = document.createElement("img");

            img.src = works[i].image;
            img.alt = works[i].name;

            picture.appendChild(img);
        }

        var title = document.createElement("h3");
        title.textContent = works[i].name;

        var description = document.createElement("p");
        description.className = "work-description";
        description.textContent = works[i].description;

        card.appendChild(picture);
        card.appendChild(title);
        card.appendChild(description);

        // ปุ่มลิงก์แสดงเฉพาะ MDT
        if (showLink == true) {
            var link = document.createElement("a");

            link.className = "work-link";
            link.href = works[i].link;
            link.textContent = linkText;

            card.appendChild(link);
        }

        workList.appendChild(card);
    }
}