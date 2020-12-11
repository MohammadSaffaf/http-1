
const http = require('http')
const fs = require('fs')
const path = require('path')

 const server= http.createServer((req, res) =>{
    // console.log(req);
    console.log(req.url);
//     if (req.url === '/'){
//         fs.readFile('./public/index.html' , (err,data) =>{
//             if (err) throw err
//             res.writeHead(200, { 'Content-type' : 'text/html'})
//             // res.write(data)
//             res.end(data)
//         })
//     }else if (req.url ==='/about'){
//         fs.readFile('./public/about.html' , (err,data) =>{
//             if (err) throw err
//             res.writeHead(200, { 'Content-type' : 'text/html'})
//             // res.write(data)
//             res.end(data)

//     })
// }
let filePath = path.join(__dirname, 'public', req.url === '/' ? 'Home.html' :req.url)
console.log(filePath);
let extname = path.extname(filePath)
console.log(extname);
let contentType ='text/html'
switch(extname){
    case '.js':
    contentType ='text/javascript'
    break
    case '.css':
        contentType ='text/css'
        break
        case '.png':
            contentType ='image/png'
            break
            case '.jpg':
            case '.jpeg':
                contentType ='image/jpg'
                break
                case '.ico':
                    contentType ='image/x-icon'
                    break
                    case '.svg':
                        contentType ='image/svg+xml'
                        break
}
fs.readFile(filePath, (err,data) => {
    if (err) {
        if (err.code === 'ENOENT'){
            fs.readFile('./public/404.html', (err,data) =>{
                if (err) throw err 
                res.writeHead(200, { 'Content-type' : 'text/html'})
                res.end(data)
            })

        }else{
            res.writeHead(500)
            res.end(err.code)
        }
    }else {
        res.writeHead(200, { 'Content-type' : contentType})
            // res.write(data)
            res.end(data)

    }
    
})
})



server.listen(5000, ()=>console.log("Server running...on:http://http://localhost:5000"))