# MinecraftFishingBot

A node minecraft bot that uses https://github.com/PrismarineJS/node-minecraft-protocol to log into the server and fish for you.

Your character (I suggest an alt character) needs to be holding a fishing rod in its main hand while facing a fishing spot. I recommend having a hopper system to collect all the items. You need to be logged off and then run this script:

```node gofish.js <servername> <port> <login> <password>```

Alternatively, if you wish to keep the script running forever:

```forever start gofish.js <servername> <port> <login> <password>```

If you want to ask the bot how many items it has caught, type the following into the chat:

```how's the fishing?```
