let chatContainerEl = null;
let chatFormEl = null;
let userInputEl = null;

function obterHoraAtual() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    if (!chatContainerEl) return;
    chatContainerEl.scrollTo({ top: chatContainerEl.scrollHeight, behavior: 'smooth' });
}

function gerarRespostaLocal(mensagem) {
    const texto = mensagem.toLowerCase();

    if (texto.includes('horario') || texto.includes('horário') || texto.includes('horas')) {
        return "Você pode consultar os horários das linhas na aba **Horários** do aplicativo.";
    }
    if (texto.includes('rota') || texto.includes('onde') || texto.includes('localização') || texto.includes('ônibus')) {
        return "Para acompanhar a localização do ônibus em tempo real, acesse o menu **Mapa**.";
    }
    if (texto.includes('carteira') || texto.includes('estudante') || texto.includes('passe')) {
        return "Dúvidas sobre a carteirinha do estudante? Verifique o status na aba **Perfil**.";
    }
    if (texto.includes('criou') || texto.includes('criador') || texto.includes('desenvolvedor')) {
        return "Eu sou o assistente virtual do TrackBus, desenvolvido por **Moisés GMS**!";
    }

    return "Olá! Sou o assistente do TrackBus. Posso ajudar com dúvidas sobre **horários**, **rotas** ou **carteirinha**.";
}

function renderMensagemUsuario(texto) {
    const msgUser = document.createElement('div');
    msgUser.className = 'orion-msg orion-msg-user';
    msgUser.innerHTML = `
        <div class="orion-bubble-group orion-bubble-group-user">
            <div class="orion-bubble orion-bubble-user"><p>${texto}</p></div>
            <span class="orion-msg-time">${obterHoraAtual()}</span>
        </div>
    `;
    chatContainerEl.appendChild(msgUser);
    scrollToBottom();
}

function renderMensagemBot(texto) {
    const msgBot = document.createElement('div');
    msgBot.className = 'orion-msg orion-msg-bot';
    msgBot.innerHTML = `
        <div class="orion-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="orion-bubble-group">
            <div class="orion-bubble">${texto}</div>
            <span class="orion-msg-time">${obterHoraAtual()}</span>
        </div>
    `;
    chatContainerEl.appendChild(msgBot);
    scrollToBottom();
}

export function enviarMensagemOrion() {
    if (!userInputEl || !chatContainerEl) return;
    const texto = userInputEl.value.trim();
    if (!texto) return;

    renderMensagemUsuario(texto);
    userInputEl.value = '';

    setTimeout(() => {
        const resposta = gerarRespostaLocal(texto);
        renderMensagemBot(resposta);
    }, 300);
}

export function initOrion() {
    chatContainerEl = document.getElementById('chat-container');
    chatFormEl = document.getElementById('chat-form');
    userInputEl = document.getElementById('user-input-orion');

    const horaInicialEl = document.getElementById('orion-hora-inicial');
    if (horaInicialEl) horaInicialEl.textContent = obterHoraAtual();

    chatFormEl?.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarMensagemOrion();
    });
}

window.enviarMensagemOrion = enviarMensagemOrion