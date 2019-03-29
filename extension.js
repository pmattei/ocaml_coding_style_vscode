const vscode = require('vscode');

function run() {
	let editor = vscode.window.activeTextEditor;
	//let document = editor.document;
	//let endPositionLastRange = document.lineAt(document.lineCount).range.end;
	//let startPosition = new vscode.Position(0,0);
	//let wholeRange = new Range (startPosition, endPositionLastRange);
	//let wholeText = document.getText(wholeRange)

	// text for test azae:aaz azea: zae azeaz :zae eaz:   zeazea azeaz   :zae
	// text for test azae:aaz azea:	zae azeaz	:zae eaz:			zeazea azeaz			:zae
	// text for test azae::aaz azea::  zae azea  ::zae azea:  :  zae azea  :  :zae
	// text for test azae::aaz azea::		zae azea		::zae azea:		:		zae azea		:		:zae
	// text for test azae:=aaz azea:=  zae azea  :=zae azea:  =  zae azea  :  =zae
	// text for test azae:=aaz azea:=		zae azea		:=zae azea:		=		zae azea		:		=zae

	// text for test azae:
	// aze

	// text for test (    )  (a )  ( a) (a  )  (  a) ( 	(	 ( 	( 	a 	)	 ) 	) 	)
	// text for test (
	//	 	 a
	// 	 )
	let text_parenthese = ` ( (
		activate
		 ) )
		` ;
		let text_parenthese2 = ` (	(
			activate
			azeazc	 )
			 )
			` ;

	// text for test {    }  {a }  { a} {a  }  {  a} { 	{	 { 	{ 	a 	}	 } 	} 	}
	// text for test {
	//	 	 a
	// 	 }

	let selection = editor.selection
	let text = editor.document.getText(selection)
	//vscode.window.showInformationMessage("selection : " + text);
	textreg = text.replace(new RegExp(/(\s)*[\:][^\S\n\r]*/g,'g'),": ")
	//vscode.window.showInformationMessage("selection 3 : " + textreg);
	textreg = textreg.replace(new RegExp(/[\:]\s[\:]\s/g,'g')," :: ")
	//vscode.window.showInformationMessage("selection 4 : " + textreg);
	textreg = textreg.replace(new RegExp(/[\:]\s[\=][^\S\n\r]*/g,'g')," := ")
	//vscode.window.showInformationMessage("selection 5 : " + textreg);
	textreg = textreg.replace(new RegExp(/\([^\S\n\r]*/g,'g'),"(")
	textreg = textreg.replace(new RegExp(/([\S])[^\S\n\r]+\)/g,'g'),"$1)")
	textreg = textreg.replace(new RegExp(/([\S])[^\S\n\r]+\)/g,'g'),"$1)")
	textreg = textreg.replace(new RegExp(/\{[^\S\n\r]*/g,'g'),"{")
	textreg = textreg.replace(new RegExp(/([\S])[^\S\n\r]+\}/g,'g'),"$1}")
	textreg = textreg.replace(new RegExp(/([\S])[^\S\n\r]+\}/g,'g'),"$1}")
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