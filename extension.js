const vscode = require('vscode');

function run() {
	let editor = vscode.window.activeTextEditor;
	console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');
	//let document = editor.document;
	//let endPositionLastRange = document.lineAt(document.lineCount).range.end;
	//let startPosition = new vscode.Position(0,0);
	//let wholeRange = new Range (startPosition, endPositionLastRange);
	//let wholeText = document.getText(wholeRange)

	// text for test val 	fun 	: 	x val 	fun:x
	// text for test val 	fun 	:
	// x
	// text for test ({az}:aa) (aze: zae) (eaz :zae) (aze:	zae) (eaz	:zae) (eaz: 	 zeazea) (azeaz	  :zae)
	let text_typage_with_chariot_return_do_not_change = `(	 x:
		y	 )`;
	// text for test ({(a:z);_}:aa)  ({a : z;_}:aa) ({a: 	z;_}: 	aa) ({a 	:z;_} 	:aa) ({a 	:		 z;_} 	: 	 	aa)
	// type t = {foo: int; bar: float}
	//    let f (x:t):unit =
	//    let {foo=(a:int);_}:t = (x:t) in
	//    let {foo=(a 	: 	int);_} 	:	 t = (x 	: 	t) in
	//    let ( 	{ 	foo 	= 	(a 	: 	int) 	; 	_ 	} 	: 	t 	) = ( 	x 	: 	t 	) in
	//    ()
	// objectif
	// type t = {foo: int; bar: float}
	//    let f (x : t) : unit =
	//    let {foo=(a : int);_} : t = (x : t) in
	//    let {foo=(a : int);_} : t = (x : t) in
	//    let ({ 	foo 	= 	(a : int) 	; 	_ 	} : t) = (x : t) in
	//    ()
	// text for test type aze = {azez : vlk ;  qsds : blabla}
	// text for test type aze = {azez 	: vlk ;  qsds	:	 blabla;}
	// text for test type aze = {azez 	: vlk; qsds	: blabla ; }
	// text for test type aze = {aaa : rrr ;  bbb : sss; ccc : tttt}
	// text for test type aze = {aaa : rrr ;  bbb : sss; ccc : tttt; ddd : uuuuu}
	// text for test type aze{azez : vlk ;  qsds : blabla}
	let text_type = ` type azeaz =
	{
		aaa : rrr.azeaz list;
		bbb : sss;
		ccc : tttt;
		ddd : uuuuu
	}`

	// text for test let x = f ~x:y ()  (* no whitespace *)
	// text for test azae:
	// aze
	// text for test azae::aaz azea::  zae azea  ::zae azea:  :  zae azea  :  :zae
	// text for test azae::aaz azea::		zae azea		::zae azea:		:		zae azea		:		:zae
	// text for test azae:=aaz azea:=  zae azea  :=zae azea:  =  zae azea  :  =zae
	// text for test azae:=aaz azea:=		zae azea		:=zae azea:		=		zae azea		:		=zae


	// text for test (    )  (a )  ( a) (a  )  (  a) ( 	(	 ( 	( 	a 	)	 ) 	) 	) ( : )
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
	// aaahgfj{zae}

	let selection = editor.selection
	let text = editor.document.getText(selection)
	//vscode.window.showInformationMessage("selection : " + text);
	textreg = text.replace(new RegExp(/[^\S\n\r]*\:[^\S\n\r]*/g,'g')," : ")
	//vscode.window.showInformationMessage("selection 2 : " + textreg);
	textreg = textreg.replace(new RegExp(/val[^\S\n\r]+([^\s\:]+) \: /g,'g'),"val $1: ")
	//vscode.window.showInformationMessage("selection 3 : " + textreg);
	textreg = textreg.replace(new RegExp(/(?<=type.*[\s]*{[\s]*)([\S]+) \: ([\S]+)/g,'g'),"$1: $2")
	textreg = textreg.replace(new RegExp(/(?<=type.*[\s]*{(?:[\s]*[^\;]*;){1,}[\s]*)([\S]+) \: ([\S]+)/g,'g'),"$1: $2")
	//vscode.window.showInformationMessage("selection 4 : " + textreg);
	textreg = textreg.replace(new RegExp(/\~([\S]+) \: /g,'g'),"\~$1:")
	//vscode.window.showInformationMessage("selection 5 : " + textreg);
	textreg = textreg.replace(new RegExp(/[^\S\n\r]*[\:]\s*[\:][^\S\n\r]*/g,'g')," :: ")
	//vscode.window.showInformationMessage("selection 6 : " + textreg);
	textreg = textreg.replace(new RegExp(/[^\S\n\r]*[\:]\s[\=][^\S\n\r]*/g,'g')," := ")
	//vscode.window.showInformationMessage("selection 7 : " + textreg);
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