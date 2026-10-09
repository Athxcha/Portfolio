// const express = require('express');
// const app = express();
// const hostname = 'localhost';
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send("Hello world!");
//  });
 
//  app.listen(port, hostname, () => {
//         console.log(`Server running at   http://${hostname}:${port}/`);
// });

//routing
// const express = require('express');
// const app = express();
// const hostname = 'localhost';
// const port = 3000;

// app.get('/hello', (req, res) => {
//     res.send("Hello world!");
//  });
 
//  app.listen(port, hostname, () => {
//         console.log(`Server running at   http://${hostname}:${port}/`);
// });

// middleware
const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3000;

app.use((req,res,next) => {
    console.log("A request for things received at " + Date.now());
    next();
})

app.get('/hello', (req, res) => {
    res.send("Hello World!");
 });
 
app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/`);
});

// const express = require('express');
// const app = express();
// const hostname = 'localhost';
// const port = 3000;

// app.use((req,res,next) => {
//     console.log("Start");
//     next();
// })

// app.get('/', (req, res,next) => {
//     res.send("Middle");
//     next();
//  });

//  app.get('/', (req, res) => {
//     console.log("End");
//  });
 
// app.listen(port, hostname, () => {
//         console.log(`Server running at   http://${hostname}:${port}/`);
// });

// body-parser
