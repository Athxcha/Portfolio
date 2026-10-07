window.onload = pageLoad;

function pageLoad(){
    // สร้าง XMLHttpRequest เพื่อดึงข้อมูลจากไฟล์ JSON
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "cloth.json", true);
    
    xhr.onload = function() {
        // แปลงข้อมูล Response ที่ได้จาก JSON string ให้เป็น JavaScript Object/Array
        let data = JSON.parse(xhr.responseText);
        showData(data);
    };
    
    xhr.onerror = function() {
        alert("ERROR: ไม่สามารถโหลดข้อมูลสินค้าได้!");
    };
    
    xhr.send();
}

function showData(data){
    // ดึงกล่องใหญ่ layer และกล่องลูก div ทั้งหมดข้างใน
    const layer = document.getElementById("layer");
    const childDivs = layer.getElementsByTagName("div");

    // วนลูปข้อมูลสินค้าทีละตัว เพื่อเอาไปใส่ในกล่อง div ย่อยแต่ละกล่อง
    for (let i = 0; i < data.length; i++) {
        // 1. สร้างแท็กรูปภาพ ชื่อแบรนด์ และราคา
        let img = document.createElement("img");
        img.src = data[i].pic; // path รูปภาพตามโครงสร้างข้อมูล
        
        let title = document.createElement("p");
        title.innerText = data[i].brand; // ชื่อแบรนด์สินค้า

        let price = document.createElement("p");
        price.innerText = data[i].price; // ราคาสินค้า

        // 2. เอาข้อมูลใส่เข้าไปใน div ย่อยตัวที่ i
        childDivs[i].appendChild(img);
        childDivs[i].appendChild(title);
        childDivs[i].appendChild(price);
    }
}