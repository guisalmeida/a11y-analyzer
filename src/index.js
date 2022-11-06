require('cypress-axe')
require('cypress-terminal-report/src/installLogsCollector')();

// Hide all fetch/XHR requests in Cy console, toggle via cypress.json
if (Cypress.env('hideElements')) {
    const app = window.top;

    if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
        const style = app.document.createElement('style');
        style.innerHTML =
            'li.command.command-name-request,.li.command.command-name-xhr,.li.command.command-name-readFile,li.command.command-name-a11y-error\! {display: none;} .reporter .command-type-child .command-method:before {content: none;}'
        style.setAttribute('data-hide-command-log-request', '');

        app.document.head.appendChild(style);
    }
}

const severityIndicators = {
    minor:    '⚪️',
    moderate: '🟡',
    serious:  '🟠',
    critical: '🔴',
}

const impactsPTBR = {
    minor:    'Menor',
    moderate: 'Moderado',
    serious:  'Sério',
    critical: 'Crítico',
}

function callback(violations) {
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join(','))
        Cypress.log({
            name: `\n`,
            message: `\n`
        })

        Cypress.log({
            name: `⚠️ Erro: `,
            consoleProps: () => violation,
            $el: nodes,
            message: `${violation.help}`
        })

        Cypress.log({
            name: `${severityIndicators[violation.impact]} Impacto:`,
            message: `${impactsPTBR[violation.impact]}`
        })

        Cypress.log({
            name: `📚 Documentação:`,
            message: `[Link](${violation.helpUrl})`
        })

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '🔧 Elemento HTML:',
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message: target
            })
        })
    });
}

const configurationOptions = {
    locale:
    {
        "lang": "pt_BR",
        "rules": {
            "accesskeys": {
                "description": "Certifique-se de que cada valor do atributo 'acesskey' é único",
                "help": "O valor do atributo 'accesskey' deve ser único"
            },
            "area-alt": {
                "description": "Certifique-se de que elementos <area> de mapas de imagem tenham um texto alternativo",
                "help": "Elementos <area> ativos devem ter um texto alternativo"
            },
            "aria-allowed-attr": {
                "description": "Certifique-se de que os atributos ARIA são permitidos para a função de um elemento",
                "help": "Os elementos devem usar apenas atributos ARIA permitidos"
            },
            "aria-allowed-role": {
                "description": "Certifique-se de que o atributo 'role' tem um valor apropriado para o elemento",
                "help": "A função ARIA deve ser apropriada para o elemento"
            },
            "aria-command-name": {
                "description": "Certifique-se de que cada botão, link e item de menu ARIA tenha um nome acessível",
                "help": "Comandos ARIA devem ter um nome acessível"
            },
            "aria-dialog-name": {
                "description": "Certifique-se de que cada nó de diálogo e diálogo de alerta ARIA tenha um nome acessível",
                "help": "Nós de diálogo e diálogo de alerta ARIA devem ter um nome acessível"
            },
            "aria-hidden-body": {
                "description": "Certifique-se de que aria-hidden='true' não está presente no elemento <body>.",
                "help": "aria-hidden='true' não deve estar presente no elemento <body>"
            },
            "aria-hidden-focus": {
                "description": "Certifique-se de que elementos com aria-hidden não contenham elementos focalizáveis",
                "help": "Elementos ocultados através de ARIA não devem conter elementos focalizáveis"
            },
            "aria-input-field-name": {
                "description": "Certifique-se de que cada campo de entrada ARIA tenha um nome acessível",
                "help": "Campos de entrada ARIA tenham um nome acessível"
            },
            "aria-meter-name": {
                "description": "Certifique-se de que cada nó de medição ARIA tenha um nome acessível",
                "help": "Nós de medição ARIA devem ter um nome acessível"
            },
            "aria-progressbar-name": {
                "description": "Certifique-se de que cada nó de barra de progresso ARIA tenha um nome acessível",
                "help": "Nós de barra de progresso ARIA devem ter um nome acessível"
            },
            "aria-required-attr": {
                "description": "Certifique-se de que elementos com funções ARIA tenham todos os atributos ARIA necessários",
                "help": "Os atributos ARIA necessários devem ser fornecidos"
            },
            "aria-required-children": {
                "description": "Certifique-se de que elementos com uma função ARIA que requer funções filhas as contenham",
                "help": "Certas funções ARIA devem conter filhos específicos"
            },
            "aria-required-parent": {
                "description": "Certifique-se de que elementos com uma função ARIA que requer funções pais estejam contidas nestas",
                "help": "Certas funções ARIA devem estar contidas em pais específicos"
            },
            "aria-roledescription": {
                "description": "Certifique-se de que 'aria-roledescription' somente é utilizado em elementos com uma função implícita ou explícita",
                "help": "Use 'aria-roledescription' em elementos com função semântica"
            },
            "aria-roles": {
                "description": "Certifique-se de que todos os elementos com um atributo 'role' utilizem um valor válido",
                "help": "Os ARIA 'roles' utilizados devem ter valores válidos"
            },
            "aria-text": {
                "description": "Certifique-se de que \"role=text\" é usado em elementos sem descendentes focalizáveis",
                "help": "\"role=text\" não deve ter descendentes focalizáveis"
            },
            "aria-toggle-field-name": {
                "description": "Certifique-se de que cada botão de alternância ARIA tenha um nome acessível",
                "help": "Botões de alternância ARIA tenham um nome acessível"
            },
            "aria-tooltip-name": {
                "description": "Certifique-se de que cada nó de dica de tela ARIA tenha um nome acessível",
                "help": "Nós de dica de tela ARIA devem ter um nome acessível"
            },
            "aria-treeitem-name": {
                "description": "Certifique-se de que cada nó de 'treeitem' ARIA deve ter um nome acessível",
                "help": "Nós de 'treeitem' ARIA devem ter um nome acessível"
            },
            "aria-valid-attr-value": {
                "description": "Certifique-se de que cada atributo ARIA tenha um valor válido",
                "help": "Atributos ARIA devem ter valores válidos"
            },
            "aria-valid-attr": {
                "description": "Certifique-se de que atributos que se iniciem com aria- são atributos ARIA válidos",
                "help": "Atributos ARIA devem ter nomes válidos"
            },
            "audio-caption": {
                "description": "Certifique-se de que elementos <audio> tenham legendas",
                "help": "Elementos <audio> devem ter uma trilha de legenda"
            },
            "autocomplete-valid": {
                "description": "Certifique-se de que o atributo 'autocomplete' esteja correto e adequado para o campo de formulário",
                "help": "Atributo 'autocomplete' deve ser usado corretamente"
            },
            "avoid-inline-spacing": {
                "description": "Certifique-se de que o espaçamento de texto definido via atributos de estilo pode ser ajustado com folhas de estilo personalizadas",
                "help": "O espaçamento de texto 'inline' deve ser ajustável com folhas de estilo personalizadas"
            },
            "blink": {
                "description": "Certifique-se de que elementos <blink> não são utilizados",
                "help": "Elementos <blink> foram descontinuados e não devem ser utilizados"
            },
            "button-name": {
                "description": "Certifique-se de que botões tenham texto discernível",
                "help": "Botões devem ter texto discernível"
            },
            "bypass": {
                "description": "Certifique-se de que cada página tenha ao menos um mecanismo para o usuário ignorar a navegação e ir direto ao conteúdo",
                "help": "A página deve ter meios para ignorar blocos repetidos"
            },
            "color-contrast": {
                "description": "Certifique-se de que o contraste entre as cores de primeiro plano e de fundo atenda aos limites de relação de contraste WCAG 2 AA",
                "help": "Os elementos devem ter contraste de cor suficiente"
            },
            "color-contrast-enhanced": {
                "description": "Certifique-se de que o contraste entre as cores de primeiro plano e de fundo atenda aos limites de relação de contraste WCAG 2 AAA",
                "help": "Os elementos devem ter contraste de cor suficiente"
            },
            "css-orientation-lock": {
                "description": "Certifique-se de que o conteúdo não está bloqueado para nenhuma orientação de tela específica, e que o mesmo seja operável em todas as orientações de tela",
                "help": "CSS Media queries não são usadas para bloquear a orientação de tela"
            },
            "definition-list": {
                "description": "Certifique-se de que elementos <dl> estão estruturados corretamente",
                "help": "Elementos <dl> devem conter diretamente apenas grupos <dt> e <dd> propriamente ordenados, ou elementos <script> ou <template>"
            },
            "dlitem": {
                "description": "Certifique-se de que elementos <dt> e <dd> estão contidos em um elemento <dl>",
                "help": "Elementos <dt> e <dd> devem estar contidos em um elemento <dl>"
            },
            "document-title": {
                "description": "Certifique-se de que cada documento HTML contenha um elemento <title> não vazio",
                "help": "Documentos devem ter um elemento <title> para ajudar na navegação"
            },
            "duplicate-id-active": {
                "description": "Certifique-se de que cada valor do atributo 'id' de elementos ativos seja único",
                "help": "IDs de elementos ativos devem ser únicos"
            },
            "duplicate-id-aria": {
                "description": "Certifique-se de que cada valor do atributo 'id' usado no ARIA e em rótulos seja único",
                "help": "IDs usados no ARIA e em 'labels' devem ser únicos"
            },
            "duplicate-id": {
                "description": "Certifique-se de que cada valor do atributo 'id' seja único",
                "help": "O valor do atributo 'id' deve ser único"
            },
            "empty-heading": {
                "description": "Certifique-se de que os títulos tenham texto discernível",
                "help": "Os títulos não devem ser vazios"
            },
            "empty-table-header": {
                "description": "Certifique-se de que cabeçalhos de tabela tenham texto discernível",
                "help": "O texto do cabeçalho de tabela não deve ser vazio"
            },
            "focus-order-semantics": {
                "description": "Certifique-se de que os elementos na ordem de foco tenham uma função apropriada",
                "help": "Elementos na ordem de foco necessitam de uma função apropriada para conteúdo interativo"
            },
            "form-field-multiple-labels": {
                "description": "Certifique-se de que campos de formulários não tenham múltiplos elementos 'label'",
                "help": "Campos de formulário não devem ter múltiplos elementos 'label'"
            },
            "frame-focusable-content": {
                "description": "Certifique-se de que elementos <frame> e <iframe> com tabindex=-1 não tenham conteúdo focalizável",
                "help": "Quadros com tabindex=-1 não devem ter conteúdo focalizável"
            },
            "frame-tested": {
                "description": "Certifique-se de que elementos <iframe> e <frame> contenham o script axe-core",
                "help": "Os 'frames' devem ser testados com o axe-core"
            },
            "frame-title-unique": {
                "description": "Certifique-se de que os elementos <iframe> e <frame> contenham um atributo 'title' único",
                "help": "Os 'frames' devem ter um atributo 'title' único"
            },
            "frame-title": {
                "description": "Certifique-se de que os elementos <iframe> e <frame> contenham um atributo 'title' não vazio",
                "help": "Os 'frames' devem ter um atributo 'title'"
            },
            "heading-order": {
                "description": "Certifique-se de que a hierarquia dos níveis de títulos seja semanticamente correta",
                "help": "Níveis dos títulos devem aumentar de um em um"
            },
            "hidden-content": {
                "description": "Informar aos usuários sobre conteúdo oculto.",
                "help": "O conteúdo oculto na página não pode ser analisado"
            },
            "html-has-lang": {
                "description": "Certifique-se de que cada documento HTML tenha um atributo 'lang'",
                "help": "O elemento <html> deve ter um atributo 'lang'"
            },
            "html-lang-valid": {
                "description": "Certifique-se de que o atributo 'lang' do elemento <html> tenha um valor válido",
                "help": "O elemento <html> deve ter um valor válido para o atributo 'lang'"
            },
            "html-xml-lang-mismatch": {
                "description": "Certifique-se de que elementos HTML com ambos os atributos 'lang' e 'xml:lang' válidos concordem entre si sobre o idioma base da página",
                "help": "Elementos HTML com 'lang' e 'xml:lang' devem ter o mesmo idioma base"
            },
            "identical-links-same-purpose": {
                "description": "Certifique-se de que links com o mesmo nome acessível servem a um propósito similar",
                "help": "Links com o mesmo nome devem ter um propósito similar"
            },
            "image-alt": {
                "description": "Certifique-se de que elementos <img> tenham texto alternativo ou um 'role' igual a 'none' ou 'presentation'",
                "help": "Imagens devem ter texto alternativo"
            },
            "image-redundant-alt": {
                "description": "Certifique-se de que a alternativa de imagem não seja repetida como texto",
                "help": "O texto alternativo de imagens não deve ser repetido como texto"
            },
            "input-button-name": {
                "description": "Certifique-se de que botões tenham um texto discernível",
                "help": "Botões de controle devem ter um texto discernível"
            },
            "input-image-alt": {
                "description": "Certifique-se de que elementos <input type=\"image\"> tenham um texto alternativo",
                "help": "Botões de imagem devem ter um texto alternativo"
            },
            "label-content-name-mismatch": {
                "description": "Certifique-se de que elementos nomeados por meio de seu conteúdo tenham seu texto visível como parte de seu nome acessível",
                "help": "Elementos devem ter seu texto visível como parte de seu nome acessível"
            },
            "label-title-only": {
                "description": "Certifique-se de que cada elemento de formulário não seja rotulado apenas usando os atributos 'title' ou 'aria-describedby'",
                "help": "Elementos de formulário devem ter um rótulo visível"
            },
            "label": {
                "description": "Certifique-se de que cada elemento de formulário tenha um rótulo",
                "help": "Elementos de formulário devem ter rótulos"
            },
            "landmark-banner-is-top-level": {
                "description": "Certifique-se de que a região 'banner' esteja no nível principal",
                "help": "A região 'banner' não deve estar contida em outra região"
            },
            "landmark-complementary-is-top-level": {
                "description": "Certifique-se de que a região 'complementary' ou 'aside' estejam no nível principal",
                "help": "'Aside' não deve estar contido em outra região"
            },
            "landmark-contentinfo-is-top-level": {
                "description": "Certifique-se de que a região 'contentinfo' esteja no nível principal",
                "help": "A região 'contentinfo' não deve estar contida em outra região"
            },
            "landmark-main-is-top-level": {
                "description": "Certifique-se de que a região 'main' esteja no nível principal",
                "help": "A região 'main' não deve estar contida em outra região"
            },
            "landmark-no-duplicate-banner": {
                "description": "Certifique-se de que o documento tenha no máximo uma região 'banner'",
                "help": "O documento não deve ter mais do que uma região 'banner'"
            },
            "landmark-no-duplicate-contentinfo": {
                "description": "Certifique-se de que o documento tenha no máximo uma região 'contentinfo'",
                "help": "O documento não deve ter mais do que uma região 'contentinfo'"
            },
            "landmark-no-duplicate-main": {
                "description": "Certifique-se de que o documento tenha, no máximo, uma região 'main'",
                "help": "O documento não deve ter mais de uma região 'main'"
            },
            "landmark-one-main": {
                "description": "Certifique-se de que o documento tenha apenas uma região 'main' e que cada 'iframe' na página tenha no náximo uma região 'main'",
                "help": "O documento deve ter uma região 'main'"
            },
            "landmark-unique": {
                "help": "Certifique-se de que as regiões são únicas",
                "description": "As regiões devem ter um 'role' ou combinação de 'role'/'label'/'title' (ou seja, um nome acessível) únicos"
            },
            "link-in-text-block": {
                "description": "Links podem ser distinguidos sem depender da cor",
                "help": "Links devem ser distinguidos do texto ao redor de uma maneira que não dependa da cor"
            },
            "link-name": {
                "description": "Certifique-se de que links tenham um texto discernível",
                "help": "Links devem ter um texto discernível"
            },
            "list": {
                "description": "Certifique-se de que listas sejam estruturadas corretamente",
                "help": "Elementos <ul> e <ol> devem conter diretamente apenas elementos <li>, <script> ou <template>"
            },
            "listitem": {
                "description": "Certifique-se de que elementos <li> são usados semanticamente",
                "help": "Elementos <li> devem estar contidos em um <ul> ou <ol>"
            },
            "marquee": {
                "description": "Certifique-se de que elementos <marquee> não são utilizados",
                "help": "Elementos <marquee> foram descontinuados e não devem ser utilizados"
            },
            "meta-refresh": {
                "description": "Certifique-se de que <meta http-equiv=\"refresh\"> não é utilizado",
                "help": "Atualização temporizada não deve existir"
            },
            "meta-viewport-large": {
                "description": "Certifique-se de que <meta name=\"viewport\"> permite ampliar de maneira significativa",
                "help": "Os usuários devem poder dar zoom e ampliar o texto em até 500%"
            },
            "meta-viewport": {
                "description": "Certifique-se de que <meta name=\"viewport\"> não desabilite a ampliação de texto e o zoom",
                "help": "O zoom e a ampliação de texto não devem ser desabilitados"
            },
            "nested-interactive": {
                "description": "Controles interativos aninhados não são anunciados por leitores de tela",
                "help": "Certifique-se de que controles interativos não estejam aninhados"
            },
            "no-autoplay-audio": {
                "description": "Certifique-se de que elementos <video> ou <audio> não reproduzam áudio automaticamente por mais de 3 segundos sem um mecanismo de controle para parar ou silenciar o áudio",
                "help": "Elementos <video> ou <audio> não reproduzam áudio automaticamente"
            },
            "object-alt": {
                "description": "Certifique-se de que elementos <object> tenham um texto alternativo",
                "help": "Elementos <object> devem ter um texto alternativo"
            },
            "p-as-heading": {
                "description": "Certifique-se de que elementos <p> não sejam utilizados para estilizar títulos",
                "help": "Negrito, itálico e 'font-size' não sejam utilizados para estilizar elementos <p> como um título"
            },
            "page-has-heading-one": {
                "description": "Certifique-se de que a página, ou pelo menos um dos seus 'frames', contenha um título de primeiro nível",
                "help": "A página deve conter um título de primeiro nível"
            },
            "presentation-role-conflict": {
                "description": "Sinaliza elementos cuja função é 'none' ou 'presentation', e que causam o acionamento da resolução de conflito de funções.",
                "help": "Elementos com função 'none' ou 'presentation' devem ser sinalizados"
            },
            "region": {
                "description": "Certifique-se de todo o conteúdo da página esteja contido em regiões (landmarks)",
                "help": "Todo o conteúdo da página deve estar contido em regiões (landmarks)"
            },
            "role-img-alt": {
                "description": "Certifique-se de que elementos com [role='img'] tenham texto alternativo",
                "help": "Elementos com [role='img'] tenham um texto alternativo"
            },
            "scope-attr-valid": {
                "description": "Certifique-se de que o atributo 'scope' é utilizado corretamente em tabelas",
                "help": "O atributo 'scope' deve ser utilizado corretamente"
            },
            "scrollable-region-focusable": {
                "description": "Elementos que tenham conteúdo rolável devem ser acessíveis via teclado",
                "help": "Certificar-se de que regiões roláveis tenham acesso via teclado"
            },
            "select-name": {
                "description": "Certifique-se que o elemento 'select' tenha um nome acessível",
                "help": "O elemento 'select' deve ter um nome acessível"
            },
            "server-side-image-map": {
                "description": "Certifique-se de que mapas de imagem do lado do servidor não são utilizados",
                "help": "Mapas de imagem do lado do servidor não devem ser utilizados"
            },
            "skip-link": {
                "description": "Certifique-se de que todos os links de escape tenham um destino focalizável",
                "help": "O destino de um link de escape deve existir e ser focalizável"
            },
            "svg-img-alt": {
                "description": "Certifique-se de que elementos svg com um 'role' de 'img', 'graphics-document' ou 'graphics-symbol' tenham um texto acessível",
                "help": "Elementos svg com um 'role' de 'img' tenham um texto alternativo"
            },
            "tabindex": {
                "description": "Certifique-se de que os valores do atributo 'tabindex' não são maiores do que 0",
                "help": "Elementos não devem ter um 'tabindex' maior do que zero"
            },
            "table-duplicate-name": {
                "description": "Certifique-se de que tabelas não tenham 'summary' e <caption> iguais",
                "help": "O elemento <caption> não deve conter o mesmo texto que o atributo 'summary'"
            },
            "table-fake-caption": {
                "description": "Certifique-se de que tabelas com uma legenda usem o elemento <caption>.",
                "help": "Células de dados ou cabeçalhos não devem ser usadas para exibir uma legenda para uma tabela de dados."
            },
            "td-has-header": {
                "description": "Certifique-se de que cada célula de dados não vazia em uma tabela grande tenha um ou mais cabeçalhos",
                "help": "Todos os elementos 'td' não vazios em uma tabela maior que 3 por 3 devem ter um cabeçalho associado"
            },
            "td-headers-attr": {
                "description": "Certifique-se de que cada célula em uma tabela usando o atributo 'headers' se refira a outra célula nesta tabela",
                "help": "Todas as células em uma tabela que utilizem o atributo 'headers' devem se referir apenas a outras células desta mesma tabela"
            },
            "th-has-data-cells": {
                "description": "Certifique-se de cada cabeçalho em uma tabela de dados se refira a células de dados",
                "help": "Todos os elementos 'th' e elementos com role=columnheader/rowheader devem ter células de dados que eles descrevem"
            },
            "valid-lang": {
                "description": "Certifique-se de que os atributos 'lang' tenham valores válidos",
                "help": "O atributo 'lang' deve ter um valor válido"
            },
            "video-caption": {
                "description": "Certifique-se de que elementos <video> tenham legendas",
                "help": "Elementos <video> devem ter legendas"
            }
        },
        "checks": {
            "abstractrole": {
                "pass": "As funções abstratas não são utilizadas",
                "fail": {
                    "singular": "A função abstrata não pode ser diretamente utilizada: ${data.values}",
                    "plural": "As funções abstratas não podem ser diretamente utilizadas: ${data.values}"
                }
            },
            "aria-allowed-attr": {
                "pass": "Atributos ARIA são usados corretamente para a função definida",
                "fail": {
                    "singular": "O atributo ARIA não é permitido: ${data.values}",
                    "plural": "Os atributos ARIA não são permitidos: ${data.values}"
                }
            },
            "aria-allowed-role": {
                "pass": "O ARIA 'role' é permitido para o elemento dado",
                "fail": {
                    "singular": "O ARIA 'role' ${data.values} não é permitido para o elemento dado",
                    "plural": "Os ARIA 'roles' ${data.values} não são permitidos para o elemento dado"
                },
                "incomplete": {
                    "singular": "O ARIA 'role' ${data.values} deve ser removido quando o elemento é tornado visível, uma vez que não é permitido para o elemento",
                    "plural": "Os ARIA 'roles' ${data.values} devem ser removidos quando o elemento é tornado visível, uma vez que não são permitidos para o elemento"
                }
            },
            "aria-errormessage": {
                "pass": "Usa uma técnica de 'aria-errormessage' suportada",
                "fail": {
                    "singular": "O valor de 'aria-errormessage' `${data.values}` deve usar uma técnica para anunciar a mensagem (por exemplo, 'aria-live', 'aria-describedby', role=alert, etc.)",
                    "plural": "Os valores de 'aria-errormessage' `${data.values}` devem usar uma técnica para anunciar a mensagem (por exemplo, 'aria-live', 'aria-describedby', role=alert, etc.)"
                },
                "incomplete": {
                    "singular": "certifique-se de que o valor de 'aria-errormessage' `${data.values}` referencia um elemento existente",
                    "plural": "certifque-se de que os valores de 'aria-errormessage' `${data.values}` referenciem elementos existentes"
                }
            },
            "aria-hidden-body": {
                "pass": "Nenhum atributo 'aria-hidden' está presente no elemento <body>",
                "fail": "'aria-hidden=true' não deve estar presente no elemento <body>"
            },
            "aria-prohibited-attr": {
                "pass": "O atributo ARIA é permitido",
                "fail": "O atributo ARIA não pode ser utilizado: ${data.values}",
                "incomplete": "O atributo ARIA não é bem suportado no elemento e o conteúdo de texto será usado em seu lugar: ${data.values}"
            },
            "aria-required-attr": {
                "pass": "Todos os atributos ARIA necessários estão presentes",
                "fail": {
                    "singular": "Atributo ARIA necessário ausente: ${data.values}",
                    "plural": "Atributos ARIA necessários ausentes: ${data.values}"
                }
            },
            "aria-required-children": {
                "pass": "Os ARIA filhos necessários estão presentes",
                "fail": {
                    "singular": "Função ARIA filha necessária ausente: ${data.values}",
                    "plural": "Funções ARIA filhas necessárias ausentes: ${data.values}"
                },
                "incomplete": {
                    "singular": "Esperando função ARIA filha a ser adicionada: ${data.values}",
                    "plural": "Esperando funções ARIA filhas a serem adicionadas: ${data.values}"
                }
            },
            "aria-required-parent": {
                "pass": "A função ARIA pai necessária está presente",
                "fail": {
                    "singular": "Função ARIA pai necessária ausente: ${data.values}",
                    "plural": "Funções ARIA pais necessárias ausentes: ${data.values}"
                }
            },
            "aria-roledescription": {
                "pass": "'aria-roledescription' usado em função semântica suportada",
                "incomplete": "Garanta que o 'aria-roledescription' é anunciado pelos leitores de tela suportados",
                "fail": "Dê ao elemento uma função que suporte 'aria-roledescription'"
            },
            "aria-unsupported-attr": {
                "pass": "O atributo ARIA é suportado",
                "fail": "O atributo ARIA não é amplamente suportado em leitores de tela e tecnologias assistivas:  ${data.values}"
            },
            "aria-valid-attr-value": {
                "pass": "Os valores dos atributos ARIA são válidos",
                "fail": {
                    "singular": "Valor de atributo ARIA inválido: ${data.values}",
                    "plural": "Valores de atributos ARIA inválidos: ${data.values}"
                },
                "incomplete": {
                    "noId": "O ID do atributo ARIA do elemento não existe na página: ${data.needsReview}",
                    "ariaCurrent": "O valor do atributo ARIA é inválido e será tratado como \"aria-current=true\": ${data.needsReview}"
                }
            },
            "aria-valid-attr": {
                "pass": {
                    "singular": "Os nomes dos atributos ARIA são válidos",
                    "plural": "O nome do atributo ARIA é valido"
                },
                "fail": {
                    "singular": "Nome de atributo ARIA inválido: ${data.values}",
                    "plural": "Nomes de atributos ARIA inválidos: ${data.values}"
                }
            },
            "fallbackrole": {
                "pass": "Apenas um valor de 'role' deve ser utilizado",
                "fail": "Use apenas um valor de 'role', uma vez que funções 'fallback' não são suportadas em navegadores mais antigos"
            },
            "has-global-aria-attribute": {
                "pass": {
                    "singular": "O elemento tem um atributo ARIA global: ${data.values}",
                    "plural": "O elemento tem atributos ARIA globais: ${data.values}"
                },
                "fail": "O elemento não tem atributo ARIA global"
            },
            "has-widget-role": {
                "pass": "Elemento tem um 'role' de 'widget'.",
                "fail": "Elemento não tem um 'role' de 'widget'."
            },
            "invalidrole": {
                "pass": "O ARIA 'role' é válido",
                "fail": {
                    "singular": "O 'role' deve ser um dos ARIA 'roles' válidos: ${data.values}",
                    "plural": "Os 'roles' devem ser um dos ARIA 'roles' válidos: ${data.values}"
                }
            },
            "is-element-focusable": {
                "pass": "O elemento é focalizável.",
                "fail": "O elemento não é focalizável."
            },
            "no-implicit-explicit-label": {
                "pass": "Não há nenhuma divergência entre <label> e o nome acessível",
                "incomplete": "Verifique se o <label> não precisa fazer parte do nome do campo ARIA ${data}"
            },
            "unsupportedrole": {
                "pass": "O ARIA 'role' é suportado",
                "fail": "O 'role' usado não é amplamente suportado em leitores de tela e tecnologias assistivas: ${data.values}"
            },
            "valid-scrollable-semantics": {
                "pass": "O elemento possui semântica válida para um elemento na ordem de foco.",
                "fail": "O elemento possui semântica inválida para um elemento na ordem de foco."
            },
            "color-contrast": {
                "pass": "O elemento tem contraste suficiente no valor de ${data.contrastRatio}",
                "fail": "O elemento tem contraste insuficiente no valor de ${data.contrastRatio} (cor do primeiro plano: ${data.fgColor}, cor de fundo: ${data.bgColor}, tamanho da fonte: ${data.fontSize}, normal/negrito: ${data.fontWeight}). Contraste esperado no valor de ${data.expectedContrastRatio}",
                "incomplete": {
                    "default": "Impossível determinar o contraste",
                    "bgImage": "A cor de fundo do elemento não pôde ser determinada devido a uma imagem de fundo",
                    "bgGradient": "A cor de fundo do elemento não pôde ser determinada devido a um gradiente de fundo",
                    "imgNode": "A cor de fundo do elemento não pôde ser determinada porque o elemento contém um nó de imagem",
                    "bgOverlap": "A cor de fundo do elemento não pôde ser determinada porque está sobreposta por outro elemento",
                    "fgAlpha": "A cor do primeiro plano do elemento não pôde ser determinada devido à transparência alfa",
                    "elmPartiallyObscured": "A cor de fundo do elemento não pôde ser determinada porque está parcialmente obscurecida por outro elemento",
                    "elmPartiallyObscuring": "A cor de fundo do elemento não pôde ser determinada porque está parcialmente sobreposta a outros elementos",
                    "outsideViewport": "A cor de fundo do elemento não pôde ser determinada porque está fora da 'viewport'",
                    "equalRatio": "O elemento tem um contraste de 1:1 com plano de fundo",
                    "shortTextContent": "O conteúdo do elemento é muito curto para determinar se é conteúdo de texto real",
                    "nonBmp": "O conteúdo do elemento contém apenas caracteres não textuais",
                    "pseudoContent": "A cor de fundo do elemento não pode ser determinada devido a um pseudo-elemento"
                }
            },
            "color-contrast-enhanced": {
                "pass": "O elemento tem contraste suficiente no valor de ${data.contrastRatio}",
                "fail": "O elemento tem contraste insuficiente no valor de ${data.contrastRatio} (cor do primeiro plano: ${data.fgColor}, cor de fundo: ${data.bgColor}, tamanho da fonte: ${data.fontSize}, normal/negrito: ${data.fontWeight}). Contraste esperado no valor de ${data.expectedContrastRatio}",
                "incomplete": {
                    "default": "Impossível determinar o contraste",
                    "bgImage": "A cor de fundo do elemento não pôde ser determinada devido a uma imagem de fundo",
                    "bgGradient": "A cor de fundo do elemento não pôde ser determinada devido a um gradiente de fundo",
                    "imgNode": "A cor de fundo do elemento não pôde ser determinada porque o elemento contém um nó de imagem",
                    "bgOverlap": "A cor de fundo do elemento não pôde ser determinada porque está sobreposta por outro elemento",
                    "fgAlpha": "A cor do primeiro plano do elemento não pôde ser determinada devido à transparência alfa",
                    "elmPartiallyObscured": "A cor de fundo do elemento não pôde ser determinada porque está parcialmente obscurecida por outro elemento",
                    "elmPartiallyObscuring": "A cor de fundo do elemento não pôde ser determinada porque está parcialmente sobreposta a outros elementos",
                    "outsideViewport": "A cor de fundo do elemento não pôde ser determinada porque está fora da 'viewport'",
                    "equalRatio": "O elemento tem um contraste de 1:1 com plano de fundo",
                    "shortTextContent": "O conteúdo do elemento é muito curto para determinar se é conteúdo de texto real",
                    "nonBmp": "O conteúdo do elemento contém apenas caracteres não textuais",
                    "pseudoContent": "A cor de fundo do elemento não pode ser determinada devido a um pseudo-elemento"
                }
            },
            "link-in-text-block": {
                "pass": "Links pode ser distinguidos do texto ao redor de outra maneira além da cor",
                "fail": "Links precisam ser distinguidos do texto ao redor de outra maneira além da cor",
                "incomplete": {
                    "default": "Impossível determinar o contraste",
                    "bgContrast": "O contraste do elemento não pôde ser determinado. Verifique se há um estilo distinto para 'hover'/'focus'.",
                    "bgImage": "O contraste do elemento não pôde ser determinado devido a uma imagem de fundo",
                    "bgGradient": "O contraste do elemento não pôde ser determinado devido a um gradiente de fundo",
                    "imgNode": "O contraste do elemento não pôde ser determinado porque o elemento contém um nó de imagem",
                    "bgOverlap": "O contraste do elemento não pôde ser determinado devido a uma sobreposição do elemento"
                }
            },
            "autocomplete-appropriate": {
                "pass": "o valor 'autocomplete' está em um elemento apropriado",
                "fail": "o valor 'autocomplete' está em um elemento inapropriado para este tipo de entrada"
            },
            "autocomplete-valid": {
                "pass": "o atributo 'autocomplete' está corretamente formatado",
                "fail": "o atributo 'autocomplete' está incorretamente formatado"
            },
            "accesskeys": {
                "pass": "O valor do atributo 'accesskey' é único",
                "fail": "O documento tem múltiplos elementos com a mesma 'accesskey'"
            },
            "focusable-content": {
                "pass": "O elemento contém elementos focalizáveis",
                "fail": "O elemento deveria ter conteúdo focalizável"
            },
            "focusable-disabled": {
                "pass": "Nenhum elemento focalizável contido no elemento",
                "fail": "Conteúdo focalizável deve ser desabilitado ou removido do DOM"
            },
            "focusable-element": {
                "pass": "O elemento é focalizável",
                "fail": "O elemento deveria ser focalizável"
            },
            "focusable-modal-open": {
                "pass": "Nenhum elemento focalizável enquanto um modal está aberto",
                "incomplete": "Garanta que os elementos focalizáveis não estejam na ordem de tabulação no estado atual"
            },
            "focusable-no-name": {
                "pass": "O elemento não está na ordem de tabulação ou tem texto acessível",
                "fail": "O elemento está na ordem de tabulação e não tem nome acessível",
                "incomplete": "Não foi possível determinar se o elemento tem um nome acessível"
            },
            "focusable-not-tabbable": {
                "pass": "Nenhum elemento focalizável contido no elemento",
                "fail": "Conteúdo focalizável deve ter tabindex='-1' ou ser removido do DOM"
            },
            "frame-focusable-content": {
                "pass": "O elemento não tem descendentes focalizáveis",
                "fail": "O elemento tem descendentes focalizáveis",
                "incomplete": "Não foi possível determinar se o elemento tem descendentes"
            },
            "landmark-is-top-level": {
                "pass": "A região ${data.role} está no nível principal.",
                "fail": "A região ${data.role} está contida em outra região."
            },
            "no-focusable-content": {
                "pass": "O elemento não tem descendentes focalizáveis",
                "fail": "O elemento tem descendentes focalizáveis",
                "incomplete": "Não foi possível determinar se o elemento tem descendentes"
            },
            "page-has-heading-one": {
                "pass": "A página tem pelo menos um título de primeiro nível",
                "fail": "A página deve ter pelo menos um título de primeiro nível"
            },
            "page-has-main": {
                "pass": "O documento tem pelo menos uma região 'main'",
                "fail": "O documento não tem uma região 'main'"
            },
            "page-no-duplicate-banner": {
                "pass": "O documento não tem mais de uma região 'banner'",
                "fail": "O documento tem mais de uma região 'banner'"
            },
            "page-no-duplicate-contentinfo": {
                "pass": "O documento não tem mais de uma região 'contentinfo'",
                "fail": "O documento tem mais de uma região 'contenteinfo'"
            },
            "page-no-duplicate-main": {
                "pass": "O documento não tem mais de uma região 'main'",
                "fail": "O documento tem mais de uma região 'main'"
            },
            "tabindex": {
                "pass": "O elemento não tem um 'tabindex' maior do que 0",
                "fail": "O elemento tem um 'tabindex' maior do que 0"
            },
            "alt-space-value": {
                "pass": "O elemento tem um valor válido para o atributo 'alt'",
                "fail": "O elemento tem um atributo 'alt' contendo apenas um caracter de espaço, o que não é ignorado por todos os leitores de tela"
            },
            "duplicate-img-label": {
                "pass": "O elemento não duplica um texto existente no atributo 'alt' do elemento <img>",
                "fail": "O elemento contém o elemento <img> com texto alternativo duplicando um texto existente"
            },
            "explicit-label": {
                "pass": "O elemento de formulário tem um <label> explícito",
                "fail": "O elemento de formulário não tem um <label> explícito",
                "incomplete": "Não foi possível determinar se o elemento de formulário tem um <label> explícito"
            },
            "help-same-as-label": {
                "pass": "O texto de ajuda ('title' ou 'aria-describedby') não duplica o texto do rótulo",
                "fail": "O texto de ajuda ('title' ou 'aria-describedby') é o igual ao texto do rótulo"
            },
            "hidden-explicit-label": {
                "pass": "O elemento de formulário tem um <label> explícito visível",
                "fail": "O elemento de formulário tem um <label> explícito que está oculto",
                "incomplete": "Não foi possível determinar se o elemento de formulário tem um <label> explícito que está oculto"
            },
            "implicit-label": {
                "pass": "O elemento de formulário tem um <label> implícito (envolvido)",
                "fail": "O elemento de formulário não tem <label> implícito (envolvido)",
                "incomplete": "Não foi possível determinar se o elemento de formulário tem um <label> implícito (envolvido)"
            },
            "label-content-name-mismatch": {
                "pass": "O elemento contém o texto visível como parte do seu nome acessível",
                "fail": "O texto dentro do elemento não está incluído no nome acessível"
            },
            "multiple-label": {
                "pass": "O campo de formulário não tem múltiplos elementos <label>",
                "incomplete": "O uso de múltiplos elementos <label> não é amplamente suportado pelas tecnologias assistivas. Certifique-se de que o primeiro <label> contém toda a informação necessária."
            },
            "title-only": {
                "pass": "Elementos de formulário não usam somente o atributo 'title' como seu rótulo",
                "fail": "Apenas 'title' usado para gerar o rótulo do elemento de formulário"
            },
            "landmark-is-unique": {
                "pass": "As regiões devem ter um 'role' ou combinação de 'role'/'label'/'title' (ou seja, nome acessível) únicos",
                "fail": "A região deve ter um 'aria-label', 'aria-labelledby', ou 'title' único para tornar as regiões distinguíveis"
            },
            "has-lang": {
                "pass": "O elemento <html> tem um atributo 'lang'",
                "fail": {
                    "noXHTML": "O atributo 'xml:lang' não é válido em páginas HTML, use o atributo 'lang'.",
                    "noLang": "O elemento <html> não possui um atributo 'lang'"
                }
            },
            "valid-lang": {
                "pass": "O valor do atributo 'lang' está incluso na lista de idiomas válidos",
                "fail": "O valor do atributo 'lang' não está incluso na lista de idiomas válidos"
            },
            "xml-lang-mismatch": {
                "pass": "Os atributos 'lang' e 'xml:lang' têm o mesmo idioma base",
                "fail": "Os atributos 'lang' e 'xml:lang' não têm o mesmo idioma base"
            },
            "dlitem": {
                "pass": "O item da lista de descrição tem um elemento pai <dl>",
                "fail": "O item da lista de descrição não tem um elemente pai <dl>"
            },
            "listitem": {
                "pass": "O item de lista tem um elemento pai <ul>, <ol> ou role=\"list\"",
                "fail": {
                    "default": "O item de lista não tem um elemento pai <ul> ou <ol>",
                    "roleNotValid": "O item de lista não tem um elemento pai <ul> ou <ol> sem um 'role', ou um role=\"list\""
                }
            },
            "only-dlitems": {
                "pass": "O elemento de lista tem somente filhos diretos que são permitidos dentro de elementos <dt> ou <dd>",
                "fail": "O elemento de lista tem filhos diretos que não são permitidos dentro de elementos <dt> ou <dd>"
            },
            "only-listitems": {
                "pass": "O elemento de lista tem somente filhos diretos que são permitidos dentro de elementos <li>",
                "fail": {
                    "default": "O elemento de lista tem filhos diretos que não são permitidos dentro de elementos <li>",
                    "roleNotValid": "O elemento de lista tem filhos diretos com um 'role' que não é permitido: ${data.roles}"
                }
            },
            "structured-dlitems": {
                "pass": "Quando não vazio, o elemento tem ambos elementos <dt> e <dd>",
                "fail": "Quando não vazio, o elemento não tem nem ao menos um elemento <dt> seguindo de pelo menos um elemento <dd>"
            },
            "caption": {
                "pass": "O elemento multimídia tem uma trilha de legendas",
                "incomplete": "Verifique se legendas estão disponíveis para o elemento"
            },
            "frame-tested": {
                "pass": "O 'iframe' foi testado com o 'axe-core'",
                "fail": "O 'iframe' não pôde ser testado com o 'axe-core'",
                "incomplete": "O 'iframe' ainda tem que ser testado com o 'axe-core'"
            },
            "no-autoplay-audio": {
                "pass": "Elementos <video> ou <audio> não reproduzem áudio por mais do que a duração permitida ou possuem mecanismos de controle",
                "fail": "Elementos <video> ou <audio> reproduzem áudio por uma duração maior que a permitida ou não possuem mecanismos de controle",
                "incomplete": "Garanta que elementos <video> ou <audio> não reproduzam áudio por mais do que a duração permitida ou disponibilize mecanismos de controle"
            },
            "css-orientation-lock": {
                "pass": "A tela é operável, e o bloqueio da orientação não existe",
                "fail": "Bloqueio de orientação CSS aplicado, o que torna a tela inoperável",
                "incomplete": "Bloqueio de orientação CSS não pode ser determinado"
            },
            "meta-viewport-large": {
                "pass": "A tag <meta> não impede o zoom significativo em dispositivos móveis",
                "fail": "A tag <meta> limita o zoom em dispositivos móveis"
            },
            "meta-viewport": {
                "pass": "A tag <meta> não desabilita o zoom em dispositivos móveis",
                "fail": "${data} na tag <meta> desabilita o zoom em dispositivos móveis"
            },
            "header-present": {
                "pass": "A página tem um cabeçalho (header)",
                "fail": "A página não tem um cabeçalho (header)"
            },
            "heading-order": {
                "pass": "Hierarquia de títulos válida",
                "fail": "Hierarquia de títulos inválida"
            },
            "identical-links-same-purpose": {
                "pass": "Não há outros links com o mesmo nome, que direcionem para uma URL diferente",
                "incomplete": "Verifique se os links têm o mesmo propósito ou são intencionalmente ambíguos."
            },
            "internal-link-present": {
                "pass": "Link de escape válido encontrado",
                "fail": "Nenhum link de escape válido encontrado"
            },
            "landmark": {
                "pass": "A página tem uma região (landmark)",
                "fail": "A página não tem nenhuma região (landmark)"
            },
            "meta-refresh": {
                "pass": "A tag <meta> não atualiza a página imediatamente",
                "fail": "A tag <meta> força atualizações temporizadas da página"
            },
            "p-as-heading": {
                "pass": "Elementos <p> não são estilizados como títulos",
                "fail": "Elementos de título devem ser utilizados no lugar de elementos <p> estilizados"
            },
            "region": {
                "pass": "Todo o conteúdo da página está contido em regiões (landmarks)",
                "fail": "Algum conteúdo da página não está contido em regiões (landmarks)"
            },
            "skip-link": {
                "pass": "Destino do link de escape existe",
                "incomplete": "Destino do link de escape deve se tornar visível na ativação",
                "fail": "Nenhum destino para o link de escape"
            },
            "unique-frame-title": {
                "pass": "O atributo 'title' do elemento é único",
                "fail": "O atributo 'title' do elemento não é único"
            },
            "duplicate-id-active": {
                "pass": "O documento não tem elementos ativos que compartilham o mesmo atributo 'id'",
                "fail": "O documento tem elementos ativos com o mesmo atributo 'id': ${data}"
            },
            "duplicate-id-aria": {
                "pass": "O documento não tem elementos referenciados com ARIA ou rótulos que compartilham o mesmo atributo 'id'",
                "fail": "O documento tem múltiplos elementos referenciados com ARIA com o mesmo atributo 'id': ${data}"
            },
            "duplicate-id": {
                "pass": "O documento não tem elementos estáticos que compartilham o mesmo atributo 'id'",
                "fail": "O documento tem múltiplos elementos estáticos com o mesmo atributo 'id'"
            },
            "aria-label": {
                "pass": "O atributo 'aria-label' existe e não está vazio",
                "fail": "O atributo 'aria-label' não existe ou está vazio"
            },
            "aria-labelledby": {
                "pass": "O atributo 'aria-labelledby' existe e referencia elementos que são visíveis aos leitores de tela",
                "fail": "O atributo 'aria-labelledby' não existe, referencia elementos que não existem ou são vazios",
                "incomplete": "certifique-se de que 'aria-labelledby' referencie um elemento existente"
            },
            "avoid-inline-spacing": {
                "pass": "Nenhum estilo 'inline' com '!important' que afete o espaçamento do texto foi especificado",
                "fail": {
                    "singular": "Remova '!important' do estilo 'inline' ${data.values}, uma vez que sobrepor isto não é suportado pela maioria dos navegadores",
                    "plural": "Remova '!important' dos estilos 'inline' ${data.values}, uma vez que sobrepor isto não é suportado pela maioria dos navegadores"
                }
            },
            "button-has-visible-text": {
                "pass": "O elemento tem texto interno que é visível aos leitores de tela",
                "fail": "O elemento não tem texto interno que seja visível aos leitores de tela",
                "incomplete": "Não foi possível determinar se o elemento tem filhos"
            },
            "doc-has-title": {
                "pass": "O documento tem um elemento <title> não vazio",
                "fail": "O documento não tem um elemento <title> não vazio"
            },
            "exists": {
                "pass": "O elemento não existe",
                "incomplete": "O elemento existe"
            },
            "has-alt": {
                "pass": "O elemento tem um atributo 'alt'",
                "fail": "O elemento não tem um atributo 'alt'"
            },
            "has-visible-text": {
                "pass": "O elemento tem texto que é visível aos leitores de tela",
                "fail": "O elemento não tem texto que seja visível aos leitores de tela",
                "incomplete": "Não foi possível determinar se o elemento tem filhos"
            },
            "is-on-screen": {
                "pass": "O elemento não é visível",
                "fail": "O elemento é visível"
            },
            "non-empty-alt": {
                "pass": "O elemento tem um atributo 'alt' não vazio",
                "fail": {
                    "noAttr": "O elemento não tem um atributo 'alt'",
                    "emptyAttr": "O elemento tem um atributo 'alt' vazio"
                }
            },
            "non-empty-if-present": {
                "pass": {
                    "default": "O elemento tem um atributo 'value",
                    "has-label": "O elemento tem um atributo 'value' não vazio"
                },
                "fail": "O elemento tem um atributo 'value' e ele está vazio"
            },
            "non-empty-placeholder": {
                "pass": "O elemento tem um atributo 'placeholder'",
                "fail": {
                    "noAttr": "O elemento não tem um atributo 'placeholder'",
                    "emptyAttr": "O elemento tem um atributo 'placeholder' vazio"
                }
            },
            "non-empty-title": {
                "pass": "O elemento tem um atributo 'title'",
                "fail": {
                    "noAttr": "O elemento não tem um atributo 'title'",
                    "emptyAttr": "O elemento tem um atributo 'title' vazio"
                }
            },
            "non-empty-value": {
                "pass": "O elemento tem um atributo 'value' não vazio",
                "fail": {
                    "noAttr": "O elemento não tem um atributo 'value'",
                    "emptyAttr": "O elemento tem um atributo 'value' vazio"
                }
            },
            "presentational-role": {
                "pass": "A semântica padrão do elemento foi sobrescrita com role=\"${data.role}\"",
                "fail": {
                    "default": "A semântica padrão do elemento não foi sobrescrita com role=\"none\" or role=\"presentation\"",
                    "globalAria": "A função do elemento não é de apresentação pois ele tem um atributo ARIA global",
                    "focusable": "A função do elemento não é de apresentação pois ele é focalizável",
                    "both": "A função do elemento não é de apresentação pois ele tem um atributo ARIA global e é focalizável"
                }
            },
            "role-none": {
                "pass": "A semântica padrão do elemento foi sobrescrita com role=\"none\"",
                "fail": "A semântica padrão do elemento não foi sobrescrita com role=\"none\""
            },
            "role-presentation": {
                "pass": "A semântica padrão do elemento foi sobrescrita com role=\"presentation\"",
                "fail": "A semântica padrão do elemento não foi sobrescrita com role=\"presentation\""
            },
            "svg-non-empty-title": {
                "pass": "O elemento tem um filho <title>",
                "fail": {
                    "noTitle": "O elemento não tem um filho que seja 'title'",
                    "emptyTitle": "O 'title' filho do elemento está vazio"
                },
                "incomplete": "Não foi possível determinar se o elemento tem um filho que seja um 'title'"
            },
            "caption-faked": {
                "pass": "A primeira linha de uma tabela não é usada como legenda",
                "fail": "O primeiro elemento da tabela deve ser um <caption> em vez de uma célula da tabela"
            },
            "html5-scope": {
                "pass": "O atributo 'scope' só é utilizado em elementos de cabeçalho de tabela (<th>)",
                "fail": "No HTML 5, os atributos 'scope' só devem ser utilizados em elementos de cabeçalho de tabela (<th>)"
            },
            "same-caption-summary": {
                "pass": "O conteúdo do atributo 'summary' e <caption> não estão duplicados",
                "fail": "O conteúdo do atributo 'summary' e <caption> são idênticos"
            },
            "scope-value": {
                "pass": "O atributo 'scope' é usado corretamente",
                "fail": "O valor do atributo 'scope' pode ser apenas 'row' ou 'col'"
            },
            "td-has-header": {
                "pass": "Todos as células de dados não vazias possuem cabeçalhos",
                "fail": "Algumas células de dados não vazias não possuem cabeçalho"
            },
            "td-headers-attr": {
                "pass": "O atributo 'headers' é usado exclusivamente para referenciar outras células da tabela",
                "incomplete": "O atributo 'headers' está vazio",
                "fail": "O atributo 'headers' não é usado exclusivamente para referenciar outras células da tabela"
            },
            "th-has-data-cells": {
                "pass": "Todas as células de cabeçalho da tabela se referem a células de dados",
                "fail": "Nem todas as células de cabeçalho da tabela se referem a células de dados",
                "incomplete": "Células de dados da tabela estão ausentes ou vazias"
            },
            "hidden-content": {
                "pass": "Todo o conteúdo da página foi analisado.",
                "fail": "Houve problemas ao analisar o conteúdo desta página.",
                "incomplete": "Existe conteúdo oculto na página que não foi analisado. Será preciso provocar a exibição deste conteúdo para poder analisá-lo."
            }
        },
        "failureSummaries": {
            "any": {
                "failureMessage": "Corrija qualquer um dos itens a seguir:{{~it:value}}\n  {{=value.split('\\n').join('\\n  ')}}{{~}}"
            },
            "none": {
                "failureMessage": "Corrija todos os itens a seguir:{{~it:value}}\n  {{=value.split('\\n').join('\\n  ')}}{{~}}"
            }
        },
        "incompleteFallbackMessage": "Corrija todos os itens a seguir:{{~it:value}}\n  {{=value.split('\\n').join('\\n  ')}}{{~}}"
    }
}

Cypress.Commands.add("analyseA11y", (path, arg1 = null, arg2 = null) => {
    cy.visit(path);
    cy.injectAxe();
    cy.configureAxe(configurationOptions);
    cy.checkA11y(arg1, arg2, callback);
})