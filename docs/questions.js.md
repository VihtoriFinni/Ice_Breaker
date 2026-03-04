# questions.js Documentation

## Purpose
High-level question operations with validation and duplicate checking.

## Dependencies
- `./storage.js` - Raw localStorage operations

## Class: Questions

### Methods

#### `getRandom(lastQuestionId = null)`
Get a random question, avoiding the last one if possible.

**Parameters:**
- `lastQuestionId` (string, optional) - ID of last shown question

**Returns:** Question text (string)

**Logic:**
1. If multiple questions exist and lastQuestionId provided → filter it out
2. Return random from available pool
3. Fallback to any random if filtering not possible

#### `getAll()`
Get all questions.

**Returns:** Array of `{id, text}` objects

#### `add(text)`
Add a new question with validation.

**Parameters:**
- `text` (string) - Question text

**Returns:** `{success, question?, error?}`

**Validation Rules:**
- Not empty
- At least 5 characters
- Less than 200 characters
- No duplicates (case-insensitive)

#### `delete(id)`
Delete a question with confirmation dialog.

**Parameters:**
- `id` (string) - Question ID to delete

**Returns:** `{success, confirmed}`

**Note:** Uses browser's `confirm()` dialog.

#### `getCount()`
Get the total number of questions.

**Returns:** Number (count)

## Export
```javascript
export const questions = new Questions();
```

Singleton instance - import and use directly:
```javascript
import { questions } from './questions.js';
```

## Usage Examples

```javascript
// Get random question
const q = questions.getRandom();

// Add new question
const result = questions.add("What's your favorite color?");
if (result.success) {
  console.log("Added:", result.question);
}

// Delete question
questions.delete("q_1234567890_abc123");

// Get count
const count = questions.getCount();
```
