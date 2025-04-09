// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	const foldStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	foldStatusBarItem.command = "editor.foldAll";
	foldStatusBarItem.tooltip = "fold all";
	foldStatusBarItem.text = `{$(chevron-right)$(chevron-left)}`;
	subscriptions.push(foldStatusBarItem);
	foldStatusBarItem.show();

	const unfoldStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	unfoldStatusBarItem.command = "editor.unfoldAll";
	unfoldStatusBarItem.tooltip = "unfold all";
	unfoldStatusBarItem.text = `{$(chevron-left)$(chevron-right)}`;
	subscriptions.push(unfoldStatusBarItem);
	unfoldStatusBarItem.show();

	const foldSelectedStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	foldSelectedStatusBarItem.command = "extension.foldSelected";
	foldSelectedStatusBarItem.tooltip = "Fold Selected";
	foldSelectedStatusBarItem.text = "$(chevron-right)$(selection)$(chevron-left)";
	subscriptions.push(foldSelectedStatusBarItem);
	foldSelectedStatusBarItem.show();

	const unfoldSelectedStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	unfoldSelectedStatusBarItem.command = "extension.unfoldSelected";
	unfoldSelectedStatusBarItem.tooltip = "Unfold selected lines";
	unfoldSelectedStatusBarItem.text = `$(chevron-left)$(selection)$(chevron-right)`;
	subscriptions.push(unfoldSelectedStatusBarItem);
	unfoldSelectedStatusBarItem.show();

	// Command 'extension.unfoldSelected' registrieren
	const unfoldSelectedDisposable = vscode.commands.registerCommand('extension.unfoldSelected', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const selections = editor.selections;
		selections.forEach(selection => {
			for (let line = selection.start.line; line <= selection.end.line; line++) {
				vscode.commands.executeCommand('editor.unfold', { levels: 1, direction: 'up', selectionLines: [line] });
			}
		});
	});
	subscriptions.push(unfoldSelectedDisposable);

	const foldSelectedDisposable = vscode.commands.registerCommand('extension.foldSelected', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const selections = editor.selections;
		selections.forEach(selection => {
			for (let line = selection.start.line; line <= selection.end.line; line++) {
				vscode.commands.executeCommand('editor.fold', { levels: 1, direction: 'up', selectionLines: [line] });
			}
		});
	});
	subscriptions.push(foldSelectedDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
