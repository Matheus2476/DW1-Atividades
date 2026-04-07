/* ===================================
   SCRIPT - Calculadora de Estacionamento
   Lógica de cálculo com comentários
   =================================== */

// ===== CONSTANTES DE PREÇO =====
// Defini as tarifas como constantes para facilitar mudanças futuras
const PRECO_PRIMEIRA_HORA = 5.00;      // Primeira hora
const PRECO_HORA_ADICIONAL = 2.50;     // Cada hora adicional
const PRECO_DIARIA = 60.00;            // Valor de 24 horas completas

// Modificadores (percentuais)
const ACRESCIMO_CARRO_GRANDE = 0.25;   // +25%
const DESCONTO_CLIENTE_FREQUENTE = 0.05; // -5%

/* ===================================
   FUNÇÃO: calcularTarifa
   
   EXPLICAÇÃO DIDÁTICA:
   Esta função calcula o valor total de estacionamento seguindo a ordem correta
   
   ORDEM DOS CÁLCULOS (MUITO IMPORTANTE):
   1️⃣ Calcular tarifa base (primeira hora + horas adicionais ou diária)
   2️⃣ Se carro é grande: adicionar 25%
   3️⃣ Se cliente é frequente: remover 5% (do valor FINAL, já com acréscimo)
   
   Por que a ordem importa?
   - Se fizéssemos o desconto primeiro, o cliente economizaria mais!
   - Fazendo na ordem correta, o sistema segue as regras do estacionamento
   
   =================================== */
function calcularTarifa(horas, ehCarroGrande, ehClienteFrequente) {
    // Passo 1: Calcular tarifa base
    // ================================
    let tarifaBase = 0;
    
    // Caso 1: Estacionamento menor que 24 horas
    if (horas < 24) {
        // A primeira hora sempre custa R$ 5,00
        tarifaBase = PRECO_PRIMEIRA_HORA;
        
        // Se tem mais de 1 hora, adicionar o resto a R$ 2,50 cada
        if (horas > 1) {
            let horasAdicionais = horas - 1;
            tarifaBase += horasAdicionais * PRECO_HORA_ADICIONAL;
        }
    }
    // Caso 2: Estacionamento de 24 horas ou mais
    else {
        // Quantas diárias completas (grupos de 24h)?
        let diariasCompletas = Math.floor(horas / 24);
        tarifaBase = diariasCompletas * PRECO_DIARIA;
        
        // Quantas horas RESTARAM depois das diárias completas?
        let horasRestantes = horas % 24;
        
        // Se tem horas restantes, calcular como horas adicionais
        if (horasRestantes > 0) {
            // Primeira hora das restantes custa R$ 5,00
            tarifaBase += PRECO_PRIMEIRA_HORA;
            
            // Suas da primeira hora custam R$ 2,50 cada
            if (horasRestantes > 1) {
                let horasAdicionaisRestantes = horasRestantes - 1;
                tarifaBase += horasAdicionaisRestantes * PRECO_HORA_ADICIONAL;
            }
        }
    }
    
    // Passo 2: Aplicar acréscimo de CARRO GRANDE (+25%)
    // ================================
    let tarrifaComAcrescimo = tarifaBase;
    
    if (ehCarroGrande) {
        let acrescimo = tarifaBase * ACRESCIMO_CARRO_GRANDE;
        tarrifaComAcrescimo = tarifaBase + acrescimo;
    }
    
    // Passo 3: Aplicar desconto de CLIENTE FREQUENTE (-5%)
    // IMPORTANTE: O desconto é aplicado APÓS o acréscimo!
    // ================================
    let tarifaFinal = tarrifaComAcrescimo;
    
    if (ehClienteFrequente) {
        let desconto = tarrifaComAcrescimo * DESCONTO_CLIENTE_FREQUENTE;
        tarifaFinal = tarrifaComAcrescimo - desconto;
    }
    
    // Retornar um objeto com todas as informações
    return {
        tarifaBase: tarifaBase,
        tarifaComAcrescimo: tarrifaComAcrescimo,
        tarifaFinal: tarifaFinal,
        acrescimo: tarrifaComAcrescimo - tarifaBase,
        desconto: tarrifaComAcrescimo - tarifaFinal
    };
}

/* ===================================
   FUNÇÃO: exibirResultado
   
   Exibe o resultado de forma visual e didática
   Mostra todos os passos do cálculo
   
   =================================== */
function exibirResultado(resultado, horas, ehCarroGrande, ehClienteFrequente) {
    // Pegar elementos do HTML
    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('result-text');
    const resultDetails = document.getElementById('result-details');
    
    // Formatar o valor em Real (R$ com 2 casas decimais)
    const valorFormatado = resultado.tarifaFinal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    // Exibir o valor final
    resultText.textContent = valorFormatado;
    
    // Construir detalhes do cálculo (linhas explicativas)
    let detalhesHTML = '';
    
    // Linha 1: Horas estacionadas
    detalhesHTML += `
        <div class="detail-line">
            <span class="detail-label">Tempo estacionado:</span>
            <span class="detail-value">${horas}h</span>
        </div>
    `;
    
    // Linha 2: Tarifa base
    detalhesHTML += `
        <div class="detail-line">
            <span class="detail-label">Tarifa base:</span>
            <span class="detail-value">${resultado.tarifaBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
    `;
    
    // Linha 3: Acréscimo (se houver)
    if (ehCarroGrande) {
        detalhesHTML += `
            <div class="detail-line">
                <span class="detail-label">Carro grande (+25%):</span>
                <span class="detail-value">+${resultado.acrescimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        `;
        detalhesHTML += `
            <div class="detail-line">
                <span class="detail-label">Subtotal:</span>
                <span class="detail-value">${resultado.tarifaComAcrescimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        `;
    }
    
    // Linha 4: Desconto (se houver)
    if (ehClienteFrequente) {
        detalhesHTML += `
            <div class="detail-line">
                <span class="detail-label">Cliente frequente (-5%):</span>
                <span class="detail-value">-${resultado.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        `;
    }
    
    // Atualizar conteúdo e exibir
    resultDetails.innerHTML = detalhesHTML;
    resultArea.classList.remove('result-hidden');
}

/* ===================================
   FUNÇÃO: executarCalculo
   
   Gerencia o fluxo principal:
   1. Capturar dados do formulário
   2. Validar entrada
   3. Calcular tarifa
   4. Exibir resultado
   
   =================================== */
function executarCalculo() {
    // Pega os valores dos inputs
    const horasInput = document.getElementById('hours');
    const ehCarroGrandeInput = document.getElementById('large-car');
    const ehClienteFrequenteInput = document.getElementById('frequent-client');
    
    // Converte para os tipos corretos
    const horas = parseFloat(horasInput.value);
    const ehCarroGrande = ehCarroGrandeInput.checked;
    const ehClienteFrequente = ehClienteFrequenteInput.checked;
    
    // Validação: verificar se o valor é válido
    if (isNaN(horas) || horas < 0) {
        alert('Por favor, insira um número válido de horas!');
        return;
    }
    
    if (horas === 0) {
        alert('Insira um tempo maior que 0 horas');
        return;
    }
    
    // Calcular
    const resultado = calcularTarifa(horas, ehCarroGrande, ehClienteFrequente);
    
    // Exibir resultado
    exibirResultado(resultado, horas, ehCarroGrande, ehClienteFrequente);
}

/* ===================================
   INICIALIZAÇÃO
   
   Espera a página carregar completamente,
   depois conecta os eventos
   
   =================================== */
document.addEventListener('DOMContentLoaded', function() {

    const botaoCalcular = document.getElementById('calculate-btn');
    

    botaoCalcular.addEventListener('click', executarCalculo);
    
   
    document.getElementById('hours').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            executarCalculo();
        }
    });
});