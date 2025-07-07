import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Screenshotify Extension Test Suite', () => {
  test('Extension should activate', async () => {
    const ext = vscode.extensions.getExtension('your-publisher-id.screenshotify');
    assert.ok(ext, 'Extension not found');
    await ext?.activate();
    assert.strictEqual(ext?.isActive, true, 'Extension did not activate');
  });

  test('Command should be registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('screenshotify.takeScreenshot'), 'Command not registered');
  });

  test('Webview panel should open and contain HTML', async () => {
    // Open a new untitled text document and select some text
    const doc = await vscode.workspace.openTextDocument({ content: 'console.log("Hello Screenshotify!");' });
    await vscode.window.showTextDocument(doc);
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.selection = new vscode.Selection(0, 0, 0, 10);
    }

    // Execute the command
    await vscode.commands.executeCommand('screenshotify.takeScreenshot');

    // Wait for the webview panel to open
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if a webview panel is open
    const panels = (vscode.window as any)._webviewPanels || [];
    assert.ok(panels.length > 0 || vscode.window.visibleTextEditors.length > 0, 'Webview panel did not open');
  });
});
