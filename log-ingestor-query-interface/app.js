const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

// Log schema
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String
  }
});

const Log = mongoose.model('Log', logSchema);

// Route for log ingestion
app.post('/logs', async (req, res) => {
  try {
    const logData = req.body;
    const log = new Log(logData);
    await log.save();
    res.status(201).json({ message: 'Log ingested successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Log ingestor server running on port ${PORT}`);
});

// Route for querying logs with advanced features
app.get('/search', async (req, res) => {
    try {
      const { level, message, resourceId, startDate, endDate, traceId, spanId, commit, parentResourceId } = req.query;
  
      const query = {};
  
      // Basic filters
      if (level) query.level = level;
      if (message) query.message = { $regex: message, $options: 'i' };
      if (resourceId) query.resourceId = resourceId;
      if (traceId) query.traceId = traceId;
      if (spanId) query.spanId = spanId;
      if (commit) query.commit = commit;
      if (parentResourceId) query['metadata.parentResourceId'] = parentResourceId;
  
      // Date range filter
      if (startDate && endDate) {
        query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
      } else if (startDate) {
        query.timestamp = { $gte: new Date(startDate) };
      } else if (endDate) {
        query.timestamp = { $lte: new Date(endDate) };
      }
  
      const result = await Log.find(query);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  