# storage.js Documentation

## Purpose
Low-level localStorage wrapper for question persistence.

## Dependencies
None - pure JavaScript, no external dependencies.

## Constants

### `STORAGE_KEY`
```javascript
const STORAGE_KEY = 'icebreaker_questions';
```
localStorage key for storing questions.

### `DEFAULT_QUESTIONS`
Array of 10 default questions loaded on first visit.

## Class: QuestionStorage

### Methods

#### `getAll()`
Retrieve all questions from localStorage.

**Returns:** `Array<{id: string, text: string}>`

**Behavior:**
- Returns cached data if available
- Auto-initializes with defaults if empty (recursive call)
- Returns empty array on error

#### `add(text)`
Add a new question.

**Parameters:**
- `text` (string) - Question text

**Returns:** `{id: string, text: string}` - The newly created question

**Side Effect:** Trims whitespace from text.

#### `delete(id)`
Delete a question by ID.

**Parameters:**
- `id` (string) - Question ID to delete

**Returns:** `boolean` - True if deleted, false if not found

#### `getRandom()`
Get a random question.

**Returns:** `{id: string, text: string}`

**Note:** Returns default message if no questions exist.

#### `initialize()`
Load default questions into storage.

**Behavior:**
- Creates question objects with unique IDs
- Overwrites existing storage
- Called automatically by `getAll()` when empty

#### `getCount()`
Get the number of stored questions.

**Returns:** `number`

#### `clear()`
Delete all questions from localStorage.

**Note:** Useful for testing/debugging.

### Private Methods

#### `save(questions)`
Save questions to localStorage.

**Parameters:**
- `questions` (Array) - Questions array to save

**Error Handling:** Catches and logs storage errors.

#### `generateId()`
Generate a unique ID.

**Returns:** `q_{timestamp}_{random}`

**Example:** `q_1699123456789_abc123def`

## Export
```javascript
export const storage = new QuestionStorage();
```

Singleton instance - import and use directly:
```javascript
import { storage } from './storage.js';
```

## Usage Examples

```javascript
// Get all questions
const all = storage.getAll();

// Add question
const newQ = storage.add("What's your dream?");

// Delete question
storage.delete(newQ.id);

// Get random
const random = storage.getRandom();

// Get count
const count = storage.getCount(); // e.g., 10
```

## Error Handling
All methods that access localStorage catch errors and log to console.
`getAll()` returns empty array on error to prevent app crashes.
