# main.js Documentation

## Purpose
Application entry point - initializes the correct page logic.

## Dependencies
- `./storage.js` - localStorage operations
- `./questions.js` - Question management
- `./three-card.js` - Card 3D effects

## Functions

### `initMainPage()`
Initializes the main card page.

**Logic:**
1. Finds card and question text elements
2. Creates ThreeCard instance with flip callback
3. Loads questions from storage
4. Returns early if elements not found

### `initManagePage()`
Initializes the question management page.

**Features:**
- Render questions list
- Add new question (click + Enter key)
- Delete with confirmation
- Validate input (5-200 chars)
- Update question count
- Show/hide empty state

### `escapeHtml(text)`
Prevents XSS attacks by escaping HTML characters.

**Parameters:**
- `text` (string) - Text to escape

**Returns:** Escaped string

### `init()`
Determines which page to initialize based on body class.

**Logic:**
```javascript
if (document.body.classList.contains('manage-page')) {
  initManagePage();
} else {
  initMainPage();
}
```

## Event Listeners

| Event | Target | Handler |
|-------|--------|---------|
| `DOMContentLoaded` | document | `init()` |
| `click` | #add-question-btn | `handleAddQuestion()` |
| `keypress` | #new-question-input | Enter → `handleAddQuestion()` |
| `input` | #new-question-input | Clear error message |
| `click` | .btn-delete | `questions.delete()` |

## Usage
The module auto-initializes when loaded. No manual setup needed.

## Page Detection
Pages are detected by checking `document.body.classList`:
- Main page: No special class
- Manage page: `manage-page` class
