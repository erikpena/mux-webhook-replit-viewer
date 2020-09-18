const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const HmacSha256 = require('crypto-js/hmac-sha256');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome, please view the README.md before beginning.  Thank you!  :-)');
});

app.post('/mux/webhook-handler', (req, res) => {
  const body = JSON.stringify(req.body);

  const muxSigHeader = req.headers['mux-signature'];

  if(muxSigHeader === undefined) {
    res.send({ error: "Unable to resolve 'Mux-Signature' request header."});

    return;
  }

  const sigParts = muxSigHeader.split(',').map((pair) => pair.split('='));
  const sigObj = _.fromPairs(sigParts);

  const payload = `${sigObj.t}.${body}`;

  const actual = sigObj.v1;
  const expected = HmacSha256(payload, process.env.WEBHOOK_SIGNING_SECRET).toString();

  const result = {
    muxSigHeader,
    payload,
    expected,
    actual
  };

  console.log(result)

  res.send(result);
});

app.listen(3000, () => {
  console.log('server started');
});
