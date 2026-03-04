# manage.html Documentation

## Purpose
Question management interface - add, view, and delete questions.

## Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>IceBreaker - Manage Questions</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="manage-page">
  <div class="manage-container">
    <header>
      <h1>Manage Questions</h1>
      <a href="index.html">← Back to Card</a>
    </header>

    <section class="add-question-section">
      <input id="new-question-input" type="text" placeholder="Enter your question...">
      <button id="add-question-btn">Add Question</button>
      <p id="input-error" class="error-message"></p>
    </section>

    <section class="questions-list-section">
      <h2>Your Questions (<span id="question-count">0</span>)</h2>
      <div id="questions-list"></div>
      <p id="empty-state">No questions yet...</p>
    </section>
  </div>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

## Key Elements

| Element | ID/Class | Purpose |
|---------|----------|---------|
| `#new-question-input` | `.question-input` | Text input for new questions |
| `#add-question-btn` | `.btn-primary` | Submit button |
| `#input-error` | `.error-message` | Validation error display |
| `#questions-list` | `.questions-list` | Container for question items |
| `#question-count` | - | Displays total question count |
| `#empty-state` | `.empty-state` | Shown when no questions exist |

## Dependencies
- `css/styles.css` - Shared styles with index.html
- `js/main.js` - Handles manage page logic

## Features
- Add new questions (5-200 character validation)
- View all questions with delete buttons
- Delete confirmation dialog
- Empty state message
- Duplicate prevention
- Character limit enforcement
