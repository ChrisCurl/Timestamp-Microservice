
const express = require('express')
const app = express()
const dateFormat = require('dateformat')

app.use(express.static('public'));
app.set('view engine', 'ejs');


const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port ${port}`));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/:unixDate', (req, res)=> {
  if (!isNaN(req.params.unixDate)) {
    const unixTime = new Date(req.params.unixDate * 1000);
    let natTime = unixToNat(unixTime);
    let unixAndNat = {unix: req.params.unixDate * 1000, Natural_Time: natTime, Javascript_Date_Function: unixTime}
      res.send(unixAndNat)
  } else {
    let unixTime = new Date(req.params.unixDate);
    let natTime = req.params.unixDate;
    let unixAndNat = {unix: unixTime.getTime(), natural: natTime}
    res.send(unixAndNat);
  }
})


function unixToNat(time, nat) {
  let newDate = dateFormat(time, "dddd, mmmm dS, yyyy");
  if (newDate) {
    return newDate;
  } else {
    return null;
  }

}
