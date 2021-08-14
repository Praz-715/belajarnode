const http = require('http');
const fs = require('fs');
const port = 3000;


http
    .createServer((req, res) => {

        const renderHTML = (path) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error: file note found')
                } else {
                    res.write(data);
                }
                res.end();
            });
        };

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        const url = req.url;

        // Routing
        switch (url) {
            case '/about':
                renderHTML('./about.html');
                break;
            case '/contact':
                renderHTML('./contact.html');
                break;
            default:
                renderHTML('./index.html');
                break;
        }

    })
    .listen(port, () => {
        console.log(`Server is listening on port ${port}...`);


    });