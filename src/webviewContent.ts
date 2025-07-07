export function getWebviewContent(
  code : string,
  lang : string,
  ratio : string
): string {
    const encoded = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Screenshotify</title>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>
  <style>
  body {
    background: #111;
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Fira Code', monospace;
    color: white;
}

  #wrapper {
  background: linear-gradient(160deg, #1c1c2a, #2a2a40);
  border-radius: 20px;
  padding: 2rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  width: 900px;
  max-width: 95vw;
  aspect-ratio: ${ratio};
}
    .mac-header {
      height: 12px;
      display: flex;
      gap: 8px;
      margin-bottom: 1rem;
    }

    .mac-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .red { background: #ff5f56; }
    .yellow { background: #ffbd2e; }
    .green { background: #27c93f; }

    pre {
      margin: 0;
      overflow-x: auto;
    }

    code {
      font-size: 1rem;
      line-height: 1.6;
    }

    button {
      margin-top: 2rem;
      padding: 10px 24px;
      background: #007acc;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #005a9e;
    }
  </style>
</head>
<body>
  <div id="content">
    <div id="wrapper">
      <div class="mac-header">
        <div class="mac-dot red"></div>
        <div class="mac-dot yellow"></div>
        <div class="mac-dot green"></div>
      </div>
      <pre><code class="language-${lang}">${encoded}</code></pre>
    </div>
    <button id="capture">📸 Download Screenshot</button>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script>
    document.getElementById('capture').addEventListener('click', () => {
      html2canvas(document.getElementById('wrapper'), {
        backgroundColor: null,
        scale: 2
      }).then(canvas => {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const link = document.createElement('a');
        link.download = 'screenshotify_' + ts + '.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  </script>
</body>
</html>`;
}
