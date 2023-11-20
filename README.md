<!-- GETTING STARTED -->
# Log Ingestor and Query Interface

This project implements a log ingestor system that efficiently handles vast volumes of log data and offers a query interface for searching logs based on various parameters.

## Log Ingestor

The log ingestor is a Node.js application that listens for incoming logs over HTTP and stores them in a MongoDB database.

### Setup

1. Install dependencies:

   ```bash
   npm install
2. Start the log ingestor server:
   ```bash
   node app.js

The server will run on http://localhost:3000 by default.

### Log Ingestion

Logs can be ingested by sending POST requests to http://localhost:3000/logs with log data in the specified JSON format.

```json
{
  "level": "info",
  "message": "Log message",
  "resourceId": "server-123",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-0987"
  }
}
```


### Query Interface

The query interface allows users to search logs based on various parameters such as level, message, resourceId, timestamp, and more.
Available Filters

   - level
   - message
   - resourceId
   - timestamp
   - traceId
   - spanId
   - commit
   - metadata.parentResourceId

### Advanced Features

   1. Search within specific date ranges (startDate and endDate parameters).
   2. Utilize regular expressions for search.
   3. Combine multiple filters in a single query.

### Setup

 1. Install dependencies:

```bash
npm install
```

2. Start the query interface server:
```bash
  node app.js
```

3. The server will run on http://localhost:3000 by default.

### Sample Queries

1. Retrieve all logs with the level set to "error":

```bash
http://localhost:3000/search?level=error
```

2. Search for logs with the message containing the term "Failed to connect":
```bash
http://localhost:3000/search?message=Failed%20to%20connect
```

3. Retrieve all logs related to resourceId "server-1234":

```bash
http://localhost:3000/search?resourceId=server-1234
```

4. Filter logs between the timestamps "2023-09-10T00:00:00Z" and "2023-09-15T23:59:59Z":

```bash
http://localhost:3000/search?startDate=2023-09-10T00:00:00Z&endDate=2023-09-15T23:59:59Z
```
### Video Explantion 
https://drive.google.com/file/d/13EAKIy9VcKd8AxvnZErZjy3BFTq-IvIE/view?usp=drive_link
