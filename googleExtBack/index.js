// 引入 library
const express = require('express');
// express 引入的是一個 function
const app = express();
// 建立一個不易產生衝突的 port 用來測試
const port = 5001;

app.use(express.json());//需要這行 才可以解析post資料

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'eric890529',
  database : 'googleext'
});
 
connection.connect();


// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get('/sql', (req, res) => {
  res.send('hello world!')
   
  
})

app.get('/bye', (req, res) => {
  res.send('bye!')
})

app.post('/search', (req, res) => {
  var id = req.body.id;
  //console.log(req)
  console.log(id)
  connection.query('SELECT * FROM vocabulary WHERE u_id = ? ORDER BY RAND() LIMIT 3;',[ id ], function (error, results, fields) {
    try{
      if (!results.length){
        throw new Error('id not found');
        //throw new Errors.NotFound('id not found');
      }
    } catch(err){
      console.log('ERROR:', err);
    }
    console.log('The query is: ', results);
    var wordJson = {
      word1 : results[0].word,
      word2 : results[1].word,
      word3 : results[2].word,
    }
    res.json(wordJson)
  })
})

app.post('/check', (req, res) => {
  var word = req.body.words;
  //console.log(word)
  connection.query('SELECT u_id FROM vocabulary WHERE word = ?',[ word], function (error, results, fields) {
    console.log(results)
    if (!results.length){
      console.log("Not Exist!!")
      res.status(200).send("Non")
    }else{
      console.log("Exist!!")
      console.log(results)
      res.status(200).send("exist")
    }
  })
  
})


// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})