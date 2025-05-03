# Installation Guide

## Prerequisites

- PixInsight 1.8.9 or later
- A Telegram account
- Internet connection

## Step-by-Step Installation

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a chat with BotFather
3. Send the command `/newbot`
4. Follow the instructions to create your bot:
   - Choose a name for your bot
   - Choose a username for your bot (must end in 'bot')
5. Save the bot token provided by BotFather

### 2. Get Your Chat ID

1. Start a chat with your new bot
2. Send a message to the bot
3. Visit this URL in your browser (replace BOT_TOKEN with your actual bot token):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Look for the "chat" object in the response and find the "id" field

### 3. Install the Script

1. Download the script file `eventSendMessageToTelegram.js`
2. Copy it to your PixInsight scripts directory:
   - Windows: `C:\Program Files\PixInsight\src\scripts`
   - macOS: `/Applications/PixInsight/src/scripts`
   - Linux: `/opt/PixInsight/src/scripts`

### 4. Configure the Script

1. Open the script file in a text editor
2. Replace the following placeholders:
   - `<INSERISCI_IL_TUO_BOT_TOKEN>` with your bot token
   - `<INSERISCI_IL_TUO_CHAT_ID>` with your chat ID

### 5. Enable the Script in WBPP

1. Open PixInsight
2. Launch the WBPP process
3. Go to the "Pipeline" tab
4. Check "Enable Event Script"
5. Click the "..." button and select the script file
6. Click "OK" to save the settings

## Verification

To verify the installation:
1. Start a WBPP process
2. You should receive notifications in your Telegram chat for:
   - Pipeline start
   - Process start/completion
   - Progress updates
   - Pipeline end

## Troubleshooting

If you don't receive notifications:
1. Verify your bot token and chat ID are correct
2. Check your internet connection
3. Ensure the script is in the correct directory
4. Verify WBPP event script is enabled
5. Check PixInsight's console for error messages

## Support

For support, please:
1. Check the README.md file
2. Visit the PixInsight forum
3. Contact the author via email 