import React, { useState, useEffect } from 'react';
import { loadPyodide } from 'pyodide';
import './CodeExecutor.css';

function CodeExecutor({ code, language }) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [pyodideLoading, setPyodideLoading] = useState(false);

  useEffect(() => {
    if (language === 'python' && !pyodide && !pyodideLoading) {
      setPyodideLoading(true);
      loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      }).then((py) => {
        setPyodide(py);
        setPyodideLoading(false);
      });
    }
  }, [language, pyodide, pyodideLoading]);

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (language === 'javascript') {
        // Capture console.log output
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          // Use Function constructor for safer execution
          const func = new Function(code);
          func();
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalLog;
        }
      } else if (language === 'python' && pyodide) {
        try {
          pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
          pyodide.runPython(code);
          const result = pyodide.runPython('sys.stdout.getvalue()');
          setOutput(result || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        }
      } else if (language === 'python' && !pyodide) {
        setOutput('Loading Python runtime...');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="code-executor">
      <div className="executor-header">
        <h3>Output</h3>
        <button
          onClick={executeCode}
          disabled={isRunning || (language === 'python' && !pyodide)}
          className="run-button"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <div className="output-container">
        {language === 'python' && !pyodide && (
          <div className="loading-message">
            Loading Python runtime (Pyodide)...
          </div>
        )}
        <pre className="output">{output || 'No output yet. Click "Run Code" to execute.'}</pre>
      </div>
    </div>
  );
}

export default CodeExecutor;


