import * as vscode from 'vscode';
import { getWebviewContent } from './webviewContent';

function getLangId(): string {
  return vscode.window.activeTextEditor?.document.languageId ?? 'plaintext';
}

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand(
  'screenshotify.takeScreenshot',
  async () => {

    const lang = getLangId();
    const code = vscode.window.activeTextEditor?.document.getText(
      vscode.window.activeTextEditor.selection
    ) ?? '';

    const panel = vscode.window.createWebviewPanel(
      'screenshotify',
      'Screenshotify',
      vscode.ViewColumn.One,
      { enableScripts: true, retainContextWhenHidden: true }
    );

  const ratioPick = await vscode.window.showQuickPick(
  [
    { label: 'Twitter (16:9)',   value: '16/9'  },
    { label: 'Square (1:1)',     value: '1/1'   },
    { label: 'Instagram (4:5)',  value: '4/5'   },
    { label: 'LinkedIn (1.91:1)',value: '1.91/1'}
  ],
  { placeHolder: 'Select aspect ratio for your screenshot' }
);

const ratio = ratioPick?.value ?? '16/9';   // default

    panel.webview.html = getWebviewContent(code, lang, ratio);
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
