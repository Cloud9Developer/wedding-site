# Coding Assistant

**Description**  
A versatile coding assistant that helps you write, review, and debug code.  
Supports Python and Node.js (JavaScript/TypeScript) with a *hybrid* interaction style (both command‑line prompts and conversational Q&A).

---

## 📖 About

This skill is ideal for developers who need instant help with:

- **Code generation** (boilerplate, full modules, or snippets)  
- **Code review** (style, performance, best practices)  
- **Debugging assistance** (identify bugs, propose fixes)  
- **Concept explanations** (generators, async/await, Promises, etc.)

> *Hybrid mode* – use either a single‑line command (`> Generate a Python function…`) or a chat‑style conversation.

---

## ⚙️ Setup

1. Create a new skill folder (e.g., `coding-assistant`).  
2. Place this `SKILL.md` in that folder.  
3. Add a `handler.py` (or `main.py`) – the file will be executed when a request matches an intent.  
4. Add `requirements.txt` if you need third‑party packages (e.g., `black`, `prettier`, `openai`).

---

## 🧩 Supported Languages

| Language | File Extension | Typical Use Cases |
|----------|----------------|-------------------|
| **Python** | `.py` | Data science, web (Flask/Django), scripting |
| **Node.js** (JavaScript/TypeScript) | `.js`, `.ts` | Web servers, CLI tools, micro‑services |

---

## 💬 Interaction Style

| Mode | Example |
|------|---------|
| **Command‑line** | `> Generate a Node.js async function that fetches JSON from a URL` |
| **Conversational** | `Assistant: Do you prefer JavaScript or TypeScript for this?` |

---

## 🧠 Intent & Prompt Templates

| Intent | Sample Prompt | Description |
|--------|---------------|-------------|
| `GenerateCode` | `Generate a Node.js function that reads a file and logs its contents` | Generates new code (Python or Node). |
| `DebugCode` | `Find the bug in this Node.js snippet: <paste>` | Analyzes Node/Python code and suggests fixes. |
| `ExplainConcept` | `Explain async/await in JavaScript.` | Provides a concise explanation. |
| `ReviewCode` | `Review this Python/Node code for style and performance: <paste>` | Performs a quick review. |

> **Tip:** In your framework’s skill configuration, map each intent to the handler’s function name (`handle_generate_code`, `handle_debug_code`, etc.).

---

## 📦 Sample `handler.py`

```python
"""
coding_assistant.handler
~~~~~~~~~~~~~~~~~~~~~~~~
Entry point for the Coding Assistant skill.

The file defines an entry‑point `handle(request)` that receives a dict
containing at least `intent` and `text`.  It dispatches to helper
functions that generate, debug, review, or explain code in Python or Node.

Replace the stub logic with your preferred LLM provider (OpenAI, Anthropic,
etc.) inside the helper functions.
"""

import json
from typing import Dict, Any

# ----------------------------------------------------------------------
# Dispatcher
# ----------------------------------------------------------------------
def handle(request: Dict[str, Any]) -> Dict[str, Any]:
    """Main entry point – route the request to the proper handler."""
    intent = request.get("intent")
    text   = request.get("text", "")

    if intent == "GenerateCode":
        return handle_generate_code(text)
    elif intent == "DebugCode":
        return handle_debug_code(text)
    elif intent == "ExplainConcept":
        return handle_explain_concept(text)
    elif intent == "ReviewCode":
        return handle_review_code(text)
    else:
        return {"error": f"Unknown intent: {intent}"}

# ----------------------------------------------------------------------
# Helpers – replace the logic with real LLM calls
# ----------------------------------------------------------------------
def handle_generate_code(query: str) -> Dict[str, Any]:
    """Generate a code snippet in Python or Node based on the query."""
    # Very simple language detection – you may use a smarter heuristic
    is_node = any(tok in query.lower() for tok in ["node", "js", "javascript", "typescript"])
    is_py   = any(tok in query.lower() for tok in ["python", "py"])

    # ------------------------------------------------------------------
    # Python example
    # ------------------------------------------------------------------
    if is_py:
        if "factorial" in query.lower():
            code = (
                "def factorial(n: int) -> int:\n"
                "    \"\"\"Return the factorial of n (non‑negative).\"\"\"\n"
                "    if n < 0:\n"
                "        raise ValueError(\"n must be non‑negative\")\n"
                "    result = 1\n"
                "    for i in range(2, n + 1):\n"
                "        result *= i\n"
                "    return result\n"
            )
            return {"response": code}

    # ------------------------------------------------------------------
    # Node.js example
    # ------------------------------------------------------------------
    if is_node:
        if "fetch" in query.lower() and "json" in query.lower():
            code = (
                "const fetch = require('node-fetch');\n\n"
                "async function fetchJson(url) {\n"
                "    const response = await fetch(url);\n"
                "    if (!response.ok) {\n"
                "        throw new Error(`HTTP ${response.status}`);\n"
                "    }\n"
                "    return await response.json();\n"
                "}\n\n"
                "// Example usage:\n"
                "// fetchJson('https://api.example.com/data')\n"
                "//     .then(console.log)\n"
                "//     .catch(console.error);\n"
            )
            return {"response": code}

    return {"response": "Sorry, I couldn't generate the requested snippet."}

# ----------------------------------------------------------------------
def handle_debug_code(snippet: str) -> Dict[str, Any]:
    """Find obvious bugs in the snippet (Python or Node)."""
    # Very naive checks – replace with actual analysis/LLM logic
    bugs = []

    # Check for unmatched parentheses/braces
    if snippet.count("(") != snippet.count(")"):
        bugs.append("Unbalanced parentheses.")
    if snippet.count("{") != snippet.count("}"):
        bugs.append("Unbalanced curly braces.")

    # Node‑specific quick check
    if "require(" in snippet and "});" not in snippet:
        bugs.append("Missing closing brace after require statement.")

    # Python‑specific quick check
    if "def " in snippet and ":" not in snippet:
        bugs.append("Missing colon after function definition.")

    if bugs:
        return {"response": "Potential bugs:\n- " + "\n- ".join(bugs)}
    else:
        return {"response": "No obvious bugs detected."}

# ----------------------------------------------------------------------
def handle_explain_concept(query: str) -> Dict[str, Any]:
    """Return a short explanation of a programming concept."""
    q = query.lower()
    if "generator" in q and "python" in q:
        return {
            "response": (
                "In Python, a *generator* is a function that yields a sequence of values.\n"
                "You define it with the `yield` keyword, and it returns an iterator."
            )
        }
    if "async" in q and "js" in q:
        return {
            "response": (
                "`async` functions in JavaScript return a Promise.\n"
                "Inside an `async` function, you can use `await` to pause execution until a Promise resolves."
            )
        }
    return {"response": "I'm not sure about that concept."}

# ----------------------------------------------------------------------
def handle_review_code(snippet: str) -> Dict[str, Any]:
    """Quick style review for Python or Node code."""
    issues = []

    # Example: warn about using `print` in production code
    if "print(" in snippet and not snippet.strip().startswith("#"):
        issues.append("Consider using a logger instead of `print`.")

    # Node: recommend semicolons (depends on style guide)
    if "const " in snippet and not snippet.strip().endswith(";"):
        issues.append("Missing semicolon after statement (depending on your style guide).")

    if issues:
        return {"response": "Code review suggestions:\n- " + "\n- ".join(issues)}
    return {"response": "No issues detected."}
```