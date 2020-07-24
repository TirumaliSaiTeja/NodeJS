// Reading and writing in file system

const fs = require('fs')
const http = require('http')
const url = require('url')

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
// Routing in server

// here we use sync beacuse to avoid updating data everything we call
// for response and with single api call the user can get data

const replaceTemplate = (temp, product) => {
  // there might be multiple instances so we wrap the productname with
  // regular expressions with g which means global
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

  return output
}

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8',
)
const tempCard = fs.readFileSync('./templates/template-cards.html', 'utf-8')
const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8',
)

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // Overview

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })

    // Map expects a callback function, which arguments an element in the current loop

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)

    // Product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    // API
  } else if (pathname === '/API') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)
  }

  // Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Welcome',
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
