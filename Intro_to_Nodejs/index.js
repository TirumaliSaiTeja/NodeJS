// Reading and writing in file system

const fs = require('fs')
const http = require('http')

// Synchronous ways

// const fs = require('fs')
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// Asynchronous

// const textOut = `This is what we know about avacado: ${textIn}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('file updated')

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3)

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('your file as been written')
//       })
//     })
//   })
// })

// Creating a simple server

const server = http.createServer((req, res) => {
  res.end('Hello Welcome to the server')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
