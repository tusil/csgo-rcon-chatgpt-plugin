require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {connect, send} = require('source-rcon-lib');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');  // import cors

// Create a new winston logger that outputs to a file
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'CSGO RCON Controller' },
    transports: [
        new winston.transports.File({ filename: 'logfile.log' }),
    ],
});

const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use morgan to log HTTP requests and pipe them to winston
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

const server = connect(process.env.RCON_HOST, process.env.RCON_PORT || 27015, process.env.RCON_PASSWORD);

app.post('/rcon', async (req, res) => {
    const commands = req.body.commands;
    if (!commands || !Array.isArray(commands)) {
        return res.status(400).json({ error: 'No commands provided' });
    }

    try {
        const responses = [];
        for (const command of commands) {
            const response = await send(command);
            responses.push({
                command,
                response
            });
            logger.info(`Command sent: ${command}, Response received: ${response}`);
        }
        res.json(responses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('CSGO RCON Controller is running on port 3000');
});
