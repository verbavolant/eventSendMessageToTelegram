/*
Licenza d'Uso:
Questo script è distribuito gratuitamente e può essere utilizzato, modificato e condiviso per scopi personali e non commerciali.
È vietato l'uso commerciale dello script senza autorizzazione scritta da parte dell'autore.

Autore: Marco Manenti
Anno: 2025

Questa versione include:
- Gestione degli errori migliorata
- Sistema di logging
- Validazione dei messaggi
- Supporto per messaggi lunghi
- Monitoraggio delle performance
*/

// Configurazione
const CONFIG = {
    telegram: {
        botToken: "<INSERISCI_IL_TUO_BOT_TOKEN>",
        chatId: "<INSERISCI_IL_TUO_CHAT_ID>",
        apiUrl: "https://api.telegram.org/bot",
        maxMessageLength: 4096
    },
    logging: {
        enabled: true,
        level: "info" // debug, info, warn, error
    }
};

// Sistema di logging
const Logger = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },

    log(level, message) {
        if (!CONFIG.logging.enabled) return;
        if (this.levels[level] >= this.levels[CONFIG.logging.level]) {
            const timestamp = new Date().toISOString();
            console.writeln(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
        }
    },

    debug(message) { this.log('debug', message); },
    info(message) { this.log('info', message); },
    warn(message) { this.log('warn', message); },
    error(message) { this.log('error', message); }
};

// Servizio Telegram
const TelegramService = {
    apiUrl: CONFIG.telegram.apiUrl + CONFIG.telegram.botToken,
    maxMessageLength: CONFIG.telegram.maxMessageLength,

    validateMessage(message) {
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message: message must be a non-empty string');
        }
        if (message.length > this.maxMessageLength) {
            throw new Error(`Message too long: maximum length is ${this.maxMessageLength} characters`);
        }
        return true;
    },

    sendMessage(message) {
        try {
            this.validateMessage(message);
            
            const args = [
                "-s",
                "-X", "POST",
                this.apiUrl + "/sendMessage",
                "-d", "chat_id=" + CONFIG.telegram.chatId,
                "-d", "text=" + message
            ];

            Logger.debug(`Sending message to Telegram: ${message.substring(0, 50)}...`);
            
            const result = ExternalProcess.execute("curl", args);
            
            Logger.info("Message sent successfully");
            return result;
        } catch (error) {
            Logger.error(`Failed to send message: ${error.message}`);
            throw error;
        }
    },

    sendLongMessage(message) {
        if (message.length <= this.maxMessageLength) {
            return this.sendMessage(message);
        }

        const chunks = [];
        let currentChunk = '';
        
        message.split('\n').forEach(line => {
            if ((currentChunk + line + '\n').length > this.maxMessageLength) {
                chunks.push(currentChunk);
                currentChunk = line + '\n';
            } else {
                currentChunk += line + '\n';
            }
        });
        
        if (currentChunk) {
            chunks.push(currentChunk);
        }

        const results = [];
        for (const chunk of chunks) {
            results.push(this.sendMessage(chunk));
        }
        
        return results;
    }
};

// Gestione eventi WBPP
function handleWBPPEvent() {
    try {
        // Debug: log dell'ambiente
        Logger.debug("ENV DEBUG:\n" + JSON.stringify(env, null, 2));

        switch (env.event) {
            case "start":
                handleStartEvent();
                break;
            case "done":
                handleDoneEvent();
                break;
            case "pipeline start":
                handlePipelineStart();
                break;
            case "pipeline end":
                handlePipelineEnd();
                break;
            default:
                Logger.warn(`Unknown event type: ${env.event}`);
        }
    } catch (error) {
        Logger.error(`Error processing WBPP event: ${error.message}`);
        throw error;
    }
}

function handleStartEvent() {
    TelegramService.sendMessage(env.name);
    
    if (env.group) {
        const totalFramesCount = env.group.fileItems.length;
        const activeFramesCount = env.group.activeFrames().length;
        
        const message = `${env.name}: processing ${activeFramesCount}/${totalFramesCount} active frames`;
        TelegramService.sendMessage(message);
        
        // Calcola e invia la barra di avanzamento
        const percentage = Math.round((activeFramesCount / totalFramesCount) * 100);
        const barLength = 20;
        const completed = Math.round((percentage / 100) * barLength);
        const progressBar = `[${"#".repeat(completed)}${".".repeat(barLength - completed)}]`;
        TelegramService.sendMessage(`${env.name}: ${progressBar} ${percentage}%`);
    }
}

function handleDoneEvent() {
    if (env.status == OperationBlockStatus.DONE) {
        TelegramService.sendMessage(`${env.name} successfully executed`);
    } else if (env.status == OperationBlockStatus.FAILED) {
        TelegramService.sendMessage(`${env.name} failed, ${env.statusMessage}`);
    }
}

function handlePipelineStart() {
    const separator = ".-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-";
    TelegramService.sendMessage(separator);
    TelegramService.sendMessage("WBPP started.");
}

function handlePipelineEnd() {
    TelegramService.sendMessage("WBPP terminated.");
    const separator = ".-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-";
    TelegramService.sendMessage(separator);
}

// Avvia la gestione degli eventi
try {
    handleWBPPEvent();
} catch (error) {
    Logger.error(`Fatal error: ${error.message}`);
}
