const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clicks', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define the click count schema and model
const clickCountSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});

const ClickCount = mongoose.model('ClickCount', clickCountSchema);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');// Provide frontend url where u want to upload the count
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

  app.get('/api/count', (req, res) => {
    ClickCount.findOne()
      .then(clickCount => {
        res.json({ count: clickCount ? clickCount.count : 0 });
      })
      .catch(error => {
        console.error('Error retrieving click count:', error);
        res.sendStatus(500);
      });
  });
  

app.post('/api/count', (req, res) => {
  ClickCount.findOne().then(clickCount => {
    if (clickCount) {
      clickCount.count++;
      return clickCount.save();
    } else {
      return ClickCount.create({ count: 1 });
    }
  }).then(() => {
    console.log(`Button clicked: ${req.body.direction}`);
    res.sendStatus(200);
  }).catch(error => {
    console.error('Error updating click count:', error);
    res.sendStatus(500);
  });
});

app.listen(8080, () => {
  console.log('API server listening on port 8080');
});
