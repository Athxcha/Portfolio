const fs = require('fs/promises');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

// complete the code here
const server = http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const data = await main();
    res.write(`<pre >${JSON.stringify(data, null, 2)}</pre>`);
    res.end();
});

// complete the code here
const readJsonFile = () => {
    return fs.readFile('cloth1.json', 'utf8')
        .then(data => JSON.parse(data));
}

// complete the code here
// จำนวนเสื้อผ้าตามที่กำหนด
const editJsonFile = (data) => { 
    const n_stock = [12, 13, 50, 22, 55, 87, 12, 29, 10];

    for (let i = 0; i < data.length; i++) {
        data[i].stock = n_stock[i];
    }

    return data;
}

// complete the code here
const writeJsonFile = (data) =>{
    return fs.writeFile(
        'new_cloth.json',
        JSON.stringify(data, null, 2)
    ).then(() => data);
}

// complete the code here
const main = async () => {
    const data = await readJsonFile();
    const newData = editJsonFile(data);
    await writeJsonFile(newData);

    return newData;
}

server.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/`);
});