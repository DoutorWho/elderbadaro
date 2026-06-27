/* Mostra/Esconde seções e fecha menu móvel*/
const linksAba = document.querySelectorAll('.link-aba');
const secoesConteudo = document.querySelectorAll('.secao-conteudo');
const listaLinks = document.getElementById('lista-links');

linksAba.forEach(link => {
    link.addEventListener('click', function(evento) {
        // Evita comportamentos indesejados da âncora padrão
        evento.preventDefault();

        // Remove a classe ativa de todos os botões do menu
        linksAba.forEach(l => l.classList.remove('ativo'));
        // Adiciona a classe ativa apenas no botão clicado
        this.classList.add('ativo');

        // Captura qual seção deve ser exibida através do atributo personalizado data-alvo
        const idAlvo = this.getAttribute('data-alvo');

        // Percorre as seções escondendo-as e ativando apenas a clicada
        secoesConteudo.forEach(secao => {
            if (secao.id === idAlvo) {
                secao.classList.add('ativa');
            } else {
                secao.classList.remove('ativa');
            }
        });

        // Caso esteja no celular, fecha o menu automaticamente após o clique
        listaLinks.classList.remove('menu-visivel');
    });
});

/* Interação de Menu Responsivo (Celular)*/
const botaoMenuCelular = document.getElementById('botao-menu-celular');

botaoMenuCelular.addEventListener('click', function() {
    // Liga/Desliga a classe que força a exibição do menu no CSS
    listaLinks.classList.toggle('menu-visivel');
});

/*Alterar o tema (Claro / Escuro) */
const botaoTema = document.getElementById('botao-tema');
const corpoPagina = document.getElementById('corpo-pagina');

botaoTema.addEventListener('click', function() {
    corpoPagina.classList.toggle('tema-escuro');
    
    if (corpoPagina.classList.contains('tema-escuro')) {
        botaoTema.textContent = "🌙 Modo Claro";
    } else {
        botaoTema.textContent = "☀️ Modo Escuro";
    }
});

/* Validação obrigatória e emissão de confirmação*/
const formularioContato = document.getElementById('formulario-contato');
const modalConfirmacao = document.getElementById('modal-confirmacao');
const fecharModalX = document.getElementById('fechar-modal');
const botaoFecharModal = document.getElementById('botao-fechar-modal');

// Função auxiliar para fechar a caixa modal
function fecharModal() {
    modalConfirmacao.classList.add('modal-oculta');
}

fecharModalX.addEventListener('click', fecharModal);
botaoFecharModal.addEventListener('click', fecharModal);

// Fecha o modal caso o usuário clique fora da caixa branca central
window.addEventListener('click', function(evento) {
    if (evento.target === modalConfirmacao) {
        fecharModal();
    }
});

// Lógica de submissão e validação
formularioContato.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoMensagem = document.getElementById('campo-mensagem');

    const erroNome = document.getElementById('erro-nome');
    const erroEmail = document.getElementById('erro-email');
    const erroMensagem = document.getElementById('erro-mensagem');

    let formularioValido = true;

    // Reseta visibilidade dos alertas de erro nativos
    erroNome.style.display = 'none';
    erroEmail.style.display = 'none';
    erroMensagem.style.display = 'none';

    // Validação de campo vazio: Nome
    if (campoNome.value.trim() === '') {
        erroNome.style.display = 'block';
        formularioValido = false;
    }

    // Validação de formato estrutural: E-mail
    const expressaoRegularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expressaoRegularEmail.test(campoEmail.value.trim())) {
        erroEmail.style.display = 'block';
        formularioValido = false;
    }

    // Validação de campo vazio: Mensagem
    if (campoMensagem.value.trim() === '') {
        erroMensagem.style.display = 'block';
        formularioValido = false;
    }

    // Disparador de resposta visual caso tudo esteja correto
    if (formularioValido) {
        // Remove a classe oculta exibindo a caixa modal customizada na tela
        modalConfirmacao.classList.remove('modal-oculta');
        
        // Executa a limpeza obrigatória pós-envio dos campos do formulário
        formularioContato.reset();
    }
});