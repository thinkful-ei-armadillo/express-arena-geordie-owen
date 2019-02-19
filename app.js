const express = require('express');
const morgan = require('morgan'); //morgan is a logging tool

const app = express();
app.use(morgan('dev')); //this is how middleware is mounted, here invoked by the application object

app.get('/', (req, res) => {
  res.send(
    'Hello Pizza Pizzoli\'s! \n We are located in beautiful southern Alexandria.  Visit us on Wednesdays for Senior Night!'
  );
});

app.get('/burgers', (req, res) => {
  res.send(
    'we have juicy cheesies son.  Much better than in and out or whatever.'
  );
});

app.get('/pepperoni', (req, res) => {
  res.send('honestly ill just eat these on their own as a snack sometimes.');
});

app.get('/pineapple', (req, res) => {
  res.send('we all make choices man.');
});

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  res.send(`The sum of ${a} and ${b} is ${parseInt(a) + parseInt(b)}`);
});

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;
  //check that queries have been made
  if (!text || !shift) {
    throw new Error('Please define "text" and "shift" queries.');
  }
  // translate string input into charcodes to be shifted
  const textCodes = text
    .toUpperCase()
    .split('')
    .map(char => char.charCodeAt() - 65);

  const newCharCodes = textCodes.map(
    char => (parseInt(char) + parseInt(shift)) % 26
  );

  const encodedText = newCharCodes
    .map(char => String.fromCharCode(char + 65))
    .join();

  res.send({ encodedText });
});

app.get('/lotto', (req, res) => {});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}`;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
});
