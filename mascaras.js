function aplicarMascara(input, mascara) {
    input.addEventListener('input', (event) => {
        const valorAtual = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        const valorAnterior = input.dataset.valorAnterior || ''; // Ajuda a determinar a direção da digitação
        const cursorPos = input.selectionStart || 0;
        const direcao = valorAtual.length > valorAnterior.length ? 'adicionar' : 'remover'; // Direção da digitação

        let novoValor = ''; 
        let posicaoNaMascara = 0;

        // Itera sobre cada caractere do valor atual
        for (const char of valorAtual) {
            while (posicaoNaMascara < mascara.length && mascara[posicaoNaMascara] !== '#') {
                novoValor += mascara[posicaoNaMascara++];
            }
            if (posicaoNaMascara < mascara.length) {
                novoValor += char;
                posicaoNaMascara++;
            }
        }

        // Adiciona os caracteres restantes da máscara
        while (posicaoNaMascara < mascara.length && mascara[posicaoNaMascara] !== '#') {
            novoValor += mascara[posicaoNaMascara++]; 
        }

        input.value = novoValor;

        // Move o cursor para a posição correta
        // Correção para o caso de o usuário apagar um caractere no meio do valor
        if (direcao === 'adicionar') {
            input.setSelectionRange(cursorPos + (novoValor.length - valorAtual.length), cursorPos + (novoValor.length - valorAtual.length));
        } else {
            input.setSelectionRange(cursorPos, cursorPos);
        }

        input.dataset.valorAnterior = valorAtual;
    });

    // Aplica a máscara ao valor inicial do input, caso um valor já esteja presente
    if (input.value.trim() !== '') {
        const valorInicial = input.value.replace(/\D/g, '');
        let valorMascarado = '';
        let indiceValor = 0;

        for (let i = 0; i < mascara.length; i++) {
            if (mascara[i] === '#' && indiceValor < valorInicial.length) {
                valorMascarado += valorInicial[indiceValor];
                indiceValor++;
            } else if (mascara[i] !== '#') {
                valorMascarado += mascara[i];
            }
        }

        input.value = valorMascarado;
    }
}

// Adicione o id aos inputs que você deseja aplicar a máscara
// Exemplo: <input type="text" id="CPF">
// E adicione as máscaras desejadas no evento DOMContentLoaded, como mostrado abaixo

document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('CPF');
    const CNPJinput = document.getElementById('CNPJ');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('CEP');
    const dataInput = document.getElementById('data');
    const CTPSinput = document.getElementById('CTPS');

    if (cpfInput) {
        aplicarMascara(cpfInput, '###.###.###-##');
    }
    if (CNPJinput) {
        aplicarMascara(CNPJinput, '##.###.###/####-##');
    }
    if (telefoneInput) {
        aplicarMascara(telefoneInput, '(##) #####-####');
    }
    if (cepInput) {
        aplicarMascara(cepInput, '#####-###');
    }
    if (dataInput) {
        aplicarMascara(dataInput, '##/##/####');
    }
    if (CTPSinput) {
        aplicarMascara(CTPSinput, '##.#####.##-#');
    }
});