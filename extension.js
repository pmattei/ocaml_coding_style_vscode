const vscode = require('vscode');

function run() {
	let editor = vscode.window.activeTextEditor;
	//let document = editor.document;
	//let endPositionLastRange = document.lineAt(document.lineCount).range.end;
	//let startPosition = new vscode.Position(0,0);
	//let wholeRange = new Range (startPosition, endPositionLastRange);
	//let wholeText = document.getText(wholeRange)


	let selection = editor.selection
	let text = editor.document.getText(selection)
	//vscode.window.showInformationMessage("selection : " + text);
	let textreg = text.replace(new RegExp(/(\s|\t)*[\:](\s|\t)*/g,'gi'),": ")
	//vscode.window.showInformationMessage(`textreg: ${textreg}`);
	editor.edit(builder => builder.replace(selection, textreg));
}

function activate(context) {
	let disposable = vscode.commands.registerCommand('ocamlCodingStyle.run', () => {run();});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}