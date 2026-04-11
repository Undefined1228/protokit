import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('protokit.open', () => {
		const panel = vscode.window.createWebviewPanel(
			'protokit',
			'ProtoKit',
			vscode.ViewColumn.One,
			{}
		);
		panel.webview.html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProtoKit</title>
</head>
<body>
</body>
</html>`;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
