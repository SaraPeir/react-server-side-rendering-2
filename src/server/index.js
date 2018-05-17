import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
//import Customers from '../shared/Customers'
import serialize from "serialize-javascript"
import App from '../shared/App'
import {fetchPopularRepos} from '../shared/api'

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("/", (req, res, next) => {
fetchPopularRepos()
.then((data) => {
  const markup = renderToString(
      <App data={data}/>
  )

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `).catch(next)
})
})


// app.get('/api/customers', (req, res, next) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];
//
//   res.json(customers);
//
//   const cust = renderToString(
//       <Customers />
//   )
//
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>SSR with RR</title>
//         <script src="/bundle.js" defer></script>
//         <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
//       </head>
//       <body>
//         <div id="app">${cust}</div>
//       </body>
//     </html>
//   `).catch(next)
// });




app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/
