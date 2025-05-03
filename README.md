# Telegram Notifications for WBPP

A PixInsight script that sends real-time notifications to Telegram during WBPP (Weighted Batch Preprocessing) execution.

![PixInsight Logo](https://pixinsight.com/images/pixinsight-logo.png)

## Features

- Real-time notifications during WBPP execution
- Pipeline start/end notifications
- Process start/completion updates
- Progress bar visualization
- Error notifications
- Support for long messages
- Configurable logging system

## Requirements

- PixInsight 1.8.9 or later
- A Telegram account
- Internet connection

## Installation

Detailed installation instructions are available in the [Installation Guide](docs/installation.md).

### Quick Start

1. Download the script file `eventSendMessageToTelegram.js`
2. Copy it to your PixInsight scripts directory
3. Configure your Telegram bot token and chat ID
4. Enable the script in WBPP's Pipeline settings

## Configuration

The script can be configured by editing the following parameters in the script file:

```javascript
const CONFIG = {
    telegram: {
        botToken: "<YOUR_BOT_TOKEN>",
        chatId: "<YOUR_CHAT_ID>",
        apiUrl: "https://api.telegram.org/bot",
        maxMessageLength: 4096
    },
    logging: {
        enabled: true,
        level: "info" // debug, info, warn, error
    }
};
```

## Usage

1. Open PixInsight
2. Launch WBPP
3. Go to the Pipeline tab
4. Enable "Event Script"
5. Select the script file
6. Start processing

The script will automatically send notifications for:
- Pipeline start/end
- Process start/completion
- Progress updates
- Error notifications

## Support

For support, please:
1. Check the [Installation Guide](docs/installation.md)
2. Visit the [PixInsight Forum](https://pixinsight.com/forum/)
3. Contact the author

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under a custom license:
- Free for personal and non-commercial use
- Commercial use requires written authorization from the author

See the [LICENSE](LICENSE) file for details.

## Author

Marco Manenti - 2025

## Acknowledgments

- PixInsight Team for the amazing software
- Telegram for their API
- All contributors and users
