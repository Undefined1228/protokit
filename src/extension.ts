import * as vscode from 'vscode';
import { RequestEditorPanel } from './panels/RequestEditorPanel';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('protokit.newRequest', () => {
    RequestEditorPanel.create(context);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
