CSGO RCON Controller
====================

This is a simple Express.js API that allows you to control a Counter-Strike: Global Offensive (CSGO) server using Remote Console (RCON) commands.

Getting Started
---------------

1. Make sure you have Node.js and npm installed on your system.

2. Clone the repository:

git clone https://github.com/tusil/csgo-rcon-chatgpt-plugin.git

3. Navigate to the project directory:

cd csgo-rcon-chatgpt-plugin

4. Install the dependencies:

npm install


5. Create a `.env` file in the root directory of the project and add your RCON server settings:

RCON_HOST=your_rcon_server_host
RCON_PORT=your_rcon_server_port
RCON_PASSWORD=your_rcon_server_password


6. Start the server:

npm start

## Using as a OpenAI ChatGPT Plugin

To use this API as a OpenAI ChatGPT plugin, follow these steps:

1. In the OpenAI interface, create a new chat.

2. Select the "GPT-4 with plugins" model.

3. Open the plugin store.

4. Click on "Develop your own plugin".

5. In the plugin domain field, enter the URL of your server. If you are running the server locally, this would be `localhost:3000`.

6. Finish adding the plugin according to the instructions in the OpenAI interface.

With these steps, the CSGO RCON Controller is added as a plugin to your ChatGPT model, and you can use it in your chats.


## API Usage

The API has a single endpoint (`/rcon`), which accepts POST requests. The request body must be a JSON object with a `commands` property, which is an array of strings. Each string is an RCON command.

The API responds with an array of objects. Each object has a `command` property (the command that was executed) and a `response` property (the response from the server).

For more information, refer to the OpenAPI specification at `http://localhost:3000/openapi.yaml`.