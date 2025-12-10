import React, { useEffect, useRef } from 'react';
import { EditorView, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import './CodeEditor.css';

const basicSetup = [
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLineGutter(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
  ]),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
];

function CodeEditor({ code, language, onCodeChange, onLanguageChange }) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const isInternalChangeRef = useRef(false);
  const languageCompartment = useRef(new Compartment());

  useEffect(() => {
    if (!editorRef.current) return;

    const languageSupport = language === 'python' 
      ? python() 
      : javascript({ jsx: true });

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        oneDark,
        languageCompartment.current.of(languageSupport),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !isInternalChangeRef.current) {
            const newCode = update.state.doc.toString();
            onCodeChange(newCode);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // Update language when it changes
  useEffect(() => {
    if (viewRef.current) {
      const languageSupport = language === 'python' 
        ? python() 
        : javascript({ jsx: true });
      
      viewRef.current.dispatch({
        effects: languageCompartment.current.reconfigure(languageSupport),
      });
    }
  }, [language]);

  // Update code when it changes externally
  useEffect(() => {
    if (viewRef.current && code !== viewRef.current.state.doc.toString()) {
      isInternalChangeRef.current = true;
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: code,
        },
      });
      isInternalChangeRef.current = false;
    }
  }, [code]);

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div ref={editorRef} className="code-editor"></div>
    </div>
  );
}

export default CodeEditor;
