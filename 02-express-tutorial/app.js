const http = require('http');
const  { readdir, readFile } = require ('node:fs/promises');
const path = require('path');

const { readDirectoryServeContentFiles } = require('./utils/functions');

const server = http.createServer((req, res) => {

    let routePaths= ['./navbar-app'];

    for ( let i = 0; i < routePaths.length; i++ ){

        readDirectoryServeContentFiles(routePaths[i], readdir, readFile, path, req, res)

    }


});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
