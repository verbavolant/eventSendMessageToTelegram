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

// da attivare per debug messaggi inviati da Pixinsight allo script tramite env
//sendMessageToTelegram("ENV DEBUG:\n" + JSON.stringify(env, null, 2));

// chiamata per l'avvio dei singoli processi avviati da WBPP  (grazie per le integrazioni JS, Roberto Sartori!)
if (env.event == "start") {
    sendMessageToTelegram(env.name);
    if (env.group ) {
        // env.group.activeFrames() available from WBPP 2.8.3
        let totalFramesCount= env.group.fileItems.length;
        let activeFramesCount = env.group.activeFrames().length;

        sendMessageToTelegram(env.name + ": processing " + activeFramesCount + "/" + totalFramesCount + " active frames");


        // da attivare in una futura release di WBPP
        // Calcola la percentuale completata
        //let percentage = Math.round((activeFramesCount / totalFramesCount) * 100);

        // Calcola la barra di avanzamento
        //let barLength = 20; // Lunghezza della barra
        //let completed = Math.round((percentage / 100) * barLength);
        //let progressBar = "[" + "#".repeat(completed) + ".".repeat(barLength - completed) + "]";
        //sendMessageToTelegram(env.name + ": " + progressBar);
    }
}

if (env.event == "done") {
    if (env.status == OperationBlockStatus.DONE) {
        sendMessageToTelegram(env.name + " successfully executed");
    }
    else if (env.status == OperationBlockStatus.FAILED) {
        sendMessageToTelegram(env.name + " failed, " + env.statusMessage);
    }
}

if (env.event == "pipeline start") {
    sendMessageToTelegram(".-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
    sendMessageToTelegram("WBPP started.");
}

if (env.event == "pipeline end") {
    sendMessageToTelegram("WBPP terminated.");
    sendMessageToTelegram(".-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");

}
