/**
 * IceBreaker - Questions Module
 *
 * Manages question data and operations.
 */

import { storage } from './storage.js';

/**
 * Questions class - High-level question operations
 */
class Questions {
  /**
   * Get a random question (different from the last one if possible)
   * @param {string} lastQuestionId - The ID of the last shown question
   * @returns {string} A random question text
   */
  getRandom(lastQuestionId = null) {
    const all = storage.getAll();
    if (all.length === 0) {
      return "Add some questions to get started!";
    }

    // If we have multiple questions and a last question, try to get a different one
    if (all.length > 1 && lastQuestionId) {
      const available = all.filter(q => q.id !== lastQuestionId);
      if (available.length > 0) {
        const random = available[Math.floor(Math.random() * available.length)];
        return random.text;
      }
    }

    // Fallback to any random question
    return storage.getRandom().text;
  }

  /**
   * Get all questions
   * @returns {Array<{id: string, text: string}>} All questions
   */
  getAll() {
    return storage.getAll();
  }

  /**
   * Add a new question with validation
   * @param {string} text - The question text
   * @returns {{success: boolean, question?: object, error?: string}}
   */
  add(text) {
    const trimmed = text.trim();

    if (!trimmed) {
      return { success: false, error: 'Question cannot be empty' };
    }

    if (trimmed.length < 5) {
      return { success: false, error: 'Question must be at least 5 characters' };
    }

    if (trimmed.length > 200) {
      return { success: false, error: 'Question must be less than 200 characters' };
    }

    // Check for duplicates
    const existing = storage.getAll();
    if (existing.some(q => q.text.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: 'This question already exists' };
    }

    const question = storage.add(trimmed);
    return { success: true, question };
  }

  /**
   * Delete a question with confirmation check
   * @param {string} id - The question ID
   * @returns {{success: boolean, confirmed: boolean}}
   */
  delete(id) {
    // This triggers the browser's confirm dialog
    const confirmed = confirm('Are you sure you want to delete this question?');

    if (!confirmed) {
      return { success: false, confirmed: false };
    }

    const deleted = storage.delete(id);
    return { success: deleted, confirmed: true };
  }

  /**
   * Get question count
   * @returns {number} Number of questions
   */
  getCount() {
    return storage.getCount();
  }
}

// Export singleton instance
export const questions = new Questions();
