let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "python",
    theme: "dracula",
    indentUnit: 4,
    smartIndent: true,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: { "Tab": "indentMore", "Shift-Tab": "indentLess" }
});

function getThemeColors(theme) {
    const themes = {
        'dracula': { background: '#282a36', text: '#f8f8f2' },
        'monokai': { background: '#272822', text: '#f8f8f2' },
        'solarized dark': { background: '#002b36', text: '#839496' },
        'material': { background: '#2f2f2f', text: '#eee' }
    };
    return themes[theme] || themes['dracula'];
}

function generateStyledHTML() {
    const code = editor.getValue();
    const language = document.getElementById('language').value;
    const theme = document.getElementById('theme').value;
    const prismLanguage = language === 'htmlmixed' ? 'markup' :
        language === 'text/x-c++src' ? 'cpp' :
            language === 'text/x-java' ? 'java' : language;
    const highlightedCode = Prism.highlight(code, Prism.languages[prismLanguage], prismLanguage);
    
    const themeColors = getThemeColors(theme);

    return `
<div class="snippetease-container" style="all: initial; pointer-events: none; font-family: "JetBrains Mono", monospace;">
<head><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet"></head>
  <style>
    .snippetease-container,
    .snippetease-container * {
      all: revert;
      box-sizing: border-box;
      pointer-events: auto;
    }
    .snippetease-container {
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    .snippetease-window {
      background-color: ${themeColors.background};
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      margin: 0;
    }
    .snippetease-header {
      background-color: ${themeColors.background};
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .snippetease-buttons {
      display: flex;
      gap: 5px;
    }
    .snippetease-button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .snippetease-close { background-color: #ff5f56; }
    .snippetease-minimize { background-color: #ffbd2e; }
    .snippetease-maximize { background-color: #27c93f; }
    .snippetease-title {
        font-family: "JetBrains Mono", monospace;
      font-size: 0px;
      color: ${themeColors.text};
    }
    .snippetease-code {
      overflow-x: auto;
      margin: 0;
      padding: 0;
    }
    .snippetease-code pre {
      background-color: ${themeColors.background} !important;
      margin: 0;
      padding: 16px;
      border-radius: 0;
    }
    .snippetease-code code {
      font-family: "JetBrains Mono", monospace;
      line-height: inherit;
      tab-size: 4;
    }
    ${getPrismThemeCSS(theme)}
  </style>
  <div class="snippetease-container">
    <div class="snippetease-window">
      <div class="snippetease-header">
        <div class="snippetease-buttons">
          <div class="snippetease-button snippetease-close"></div>
          <div class="snippetease-button snippetease-minimize"></div>
          <div class="snippetease-button snippetease-maximize"></div>
        </div>
        <span class="snippetease-title">${language}</span>
      </div>
      <div class="snippetease-code">
        <pre style="font-family: "JetBrains Mono", monospace;" class="language-${prismLanguage}"><code style="font-family: "JetBrains Mono", monospace;" class="language-${prismLanguage}">${highlightedCode}</code></pre>
      </div>
    </div>
  </div>
</div>`;
}


function getPrismThemeCSS(theme) {
    const themes = {
        'dracula': `code[class*="language-"],pre[class*="language-"]{color:#f8f8f2;background:none;text-shadow:0 1px rgba(0,0,0,.3);font-family: "JetBrains Mono", monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*="language-"]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*="language-"],pre[class*="language-"]{background:#282a36}:not(pre)>code[class*="language-"]{padding:.1em;border-radius:.3em;white-space:normal}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#6272a4}.token.punctuation{color:#f8f8f2}.namespace{opacity:.7}.token.property,.token.tag,.token.constant,.token.symbol,.token.deleted{color:#ff79c6}.token.boolean,.token.number{color:#bd93f9}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted{color:#50fa7b}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.function,.token.class-name{color:#f1fa8c}.token.keyword{color:#8be9fd}.token.regex,.token.important{color:#ffb86c}.token.important,.token.bold{font-weight:bold}.token.italic{font-style:italic}.token.entity{cursor:help}`,
        'monokai': `code[class*="language-"],pre[class*="language-"]{color:#f8f8f2;background:none;text-shadow:0 1px rgba(0,0,0,.3);font-family: "JetBrains Mono", monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*="language-"]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*="language-"],pre[class*="language-"]{background:#272822}:not(pre)>code[class*="language-"]{padding:.1em;border-radius:.3em;white-space:normal}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#8292a2}.token.punctuation{color:#f8f8f2}.token.namespace{opacity:.7}.token.property,.token.tag,.token.constant,.token.symbol,.token.deleted{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted{color:#a6e22e}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.function,.token.class-name{color:#e6db74}.token.keyword{color:#66d9ef}.token.regex,.token.important{color:#fd971f}.token.important,.token.bold{font-weight:bold}.token.italic{font-style:italic}.token.entity{cursor:help}`,
        'solarized dark': `code[class*="language-"],pre[class*="language-"]{color:#839496;text-shadow:0 1px rgba(0,0,0,.3);font-family: "JetBrains Mono", monospace;direction:ltr;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*="language-"]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*="language-"],pre[class*="language-"]{background:#002b36}:not(pre)>code[class*="language-"]{padding:.1em;border-radius:.3em}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#586e75}.token.punctuation{color:#93a1a1}.namespace{opacity:.7}.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted{color:#268bd2}.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.url,.token.inserted{color:#2aa198}.token.entity{color:#657b83;background:#eee8d5}.token.atrule,.token.attr-value,.token.keyword{color:#859900}.token.function,.token.class-name{color:#b58900}.token.regex,.token.important,.token.variable{color:#cb4b16}.token.important,.token.bold{font-weight:bold}.token.italic{font-style:italic}.token.entity{cursor:help}`,
        'material': `code[class*="language-"],pre[class*="language-"]{text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;color:#eee;background:#2f2f2f;font-family: "JetBrains Mono", monospace;font-size:1em;line-height:1.5em;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*="language-"]::-moz-selection,pre[class*="language-"]::-moz-selection,code[class*="language-"] ::-moz-selection,pre[class*="language-"] ::-moz-selection{background:#363636}code[class*="language-"]::selection,pre[class*="language-"]::selection,code[class*="language-"] ::selection,pre[class*="language-"] ::selection{background:#363636}:not(pre)>code[class*="language-"]{white-space:normal;border-radius:.2em;padding:.1em}pre[class*="language-"]{overflow:auto;position:relative;margin:.5em 0;padding:1.25em 1em}.language-css>code,.language-sass>code,.language-scss>code{color:#fd9170}[class*="language-"] .namespace{opacity:.7}.token.atrule{color:#c792ea}.token.attr-name{color:#ffcb6b}.token.attr-value{color:#a5e844}.token.attribute{color:#a5e844}.token.boolean{color:#c792ea}.token.builtin{color:#ffcb6b}.token.cdata{color:#80cbc4}.token.char{color:#80cbc4}.token.class{color:#ffcb6b}.token.class-name{color:#f2ff00}.token.comment{color:#616161}.token.constant{color:#c792ea}.token.deleted{color:#ff6666}.token.doctype{color:#616161}.token.entity{color:#ff6666}.token.function{color:#c792ea}.token.hexcode{color:#f2ff00}.token.id{color:#c792ea;font-weight:bold}.token.important{color:#c792ea;font-weight:bold}.token.inserted{color:#80cbc4}.token.keyword{color:#c792ea}.token.number{color:#fd9170}.token.operator{color:#89ddff}.token.prolog{color:#616161}.token.property{color:#80cbc4}.token.pseudo-class{color:#a5e844}.token.pseudo-element{color:#a5e844}.token.punctuation{color:#89ddff}.token.regex{color:#f2ff00}.token.selector{color:#ff6666}.token.string{color:#a5e844}.token.symbol{color:#c792ea}.token.tag{color:#ff6666}.token.unit{color:#fd9170}.token.url{color:#ff6666}.token.variable{color:#ff6666}`
    };
    return themes[theme] || themes['dracula']; // Default to dracula if theme not found
}

function generateAndCopy() {
    const styledHTML = generateStyledHTML();
    navigator.clipboard.writeText(styledHTML).then(() => {
        const messageEl = document.getElementById('message');
        messageEl.textContent = 'Styled HTML copied to clipboard!';
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 2000);
    });
    document.getElementById('preview').innerHTML = `<div class="preview-container">${styledHTML}</div>`;
}


// Update preview on input
editor.on('change', updatePreview);

document.getElementById('language').addEventListener('change', (e) => {
    editor.setOption("mode", e.target.value);
    updatePreview();
});

document.getElementById('theme').addEventListener('change', (e) => {
    editor.setOption("theme", e.target.value);
    updatePreview();
});

function updatePreview() {
    document.getElementById('preview').innerHTML = `<div class="preview-container">${generateStyledHTML()}</div>`;
    Prism.highlightAll();
}

// Initial preview
updatePreview();

// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
    }
});
