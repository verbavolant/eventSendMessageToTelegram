/*
Licenza d'Uso:
Questo script è distribuito gratuitamente e può essere utilizzato, modificato e condiviso per scopi personali e non commerciali.
È vietato l'uso commerciale dello script senza autorizzazione scritta da parte dell'autore.

Autore: Marco Manenti
Anno: 2025

Questa versione non supporta pienamente i codici di errore e di uscita dallo script WBPP

*/

let sendMessageToTelegram = function(message) {
    // Configura il token del bot e il chat ID
    const telegramBotToken = "<INSERISCI_IL_TUO_BOT_TOKEN>"; // Sostituisci con il token del tuo bot Telegram
    const chatId = "<INSERISCI_IL_TUO_CHAT_ID>"; // Sostituisci con l'ID della chat

    // Crea l'URL dell'API di Telegram
    const url = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage";

    // Configura i parametri della richiesta come argomenti
    let args = [
        "-s", // Modalità silenziosa
        "-X", "POST", // Metodo HTTP POST
        url, // URL dell'API Telegram
        "-d", "chat_id=" + chatId, // Parametro chat_id
        "-d", "text=" + message // Parametro text
    ];

    // Esegui il comando curl
    // debug: console.writeln("curl: " + args);
    ExternalProcess.execute("curl", args);
}

// Esempio di utilizzo dello script
if (env.event == "start") {
    sendMessageToTelegram(env.name);
    if (env.group) {
        sendMessageToTelegram("Processing " + env.group.frames.length + " frames");
    }
}

if (env.event == "done") {
    if (env.status == OperationBlockStatus.DONE) {
        sendMessageToTelegram(env.name + " successfully executed");
    } else if (env.status == OperationBlockStatus.FAILED) {
        sendMessageToTelegram(env.name + " failed, " + env.statusMessage);
    }
}
