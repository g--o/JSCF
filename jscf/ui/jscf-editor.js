
/**
 * creates customized ace editor
 *
 * @param editor_id id of the editor element
 * @param script_object a script to edit
 * @param useWebWorker set to false to prevent using worker, for local html file due to browser security restritions
 */
function createEditor(editor_id, script_object, useWebWorker)
{
	// fetch script
	document.getElementById(editor_id).innerHTML = script_object.update;

	//create editor
	var editor = ace.edit(editor_id);
	editor.getSession().setMode("ace/mode/javascript");

	// editor styling
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setUseWrapMode(true);
	editor.getSession().setWrapLimitRange(null, null);
	editor.$blockScrolling = Infinity; //prevents ace from logging annoying warnings
	//editor.setShowPrintMargin(false);

	// tern settings
	ace.config.loadModule('ace/ext/tern', function () {
		editor.setOptions({
			enableTern: {
				defs: ['browser', 'ecma5'],		// http://ternjs.net/doc/manual.html#option_defs
				plugins: {						// http://ternjs.net/doc/manual.html#plugins
					doc_comment: {
						fullDocs: true
					}
				},
				useWorker: useWebWorker,
				switchToDoc: function (name, start) {
					// tern can use file switching when jump to defnition of function in another file is called
				},
				startedCb: function () {
					//once tern is enabled, it can be accessed via editor.ternServer
				},
			},
			enableSnippets: true,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
		});
	});

	// beautify settings
	ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
		editor.setOptions({
			// beautify when closing bracket typed in javascript or css mode
			autoBeautify: true,
			// this enables the plugin to work with hotkeys (ctrl+b to beautify)
			htmlBeautify: true,
		});

		//modify beautify options as needed:
		window.beautifyOptions = beautify.options;
	});

	return editor;
}
