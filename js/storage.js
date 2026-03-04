/**
 * IceBreaker - Storage Module
 *
 * Handles localStorage operations for question persistence.
 */

const STORAGE_KEY = 'icebreaker_questions';

/**
 * Default questions to load on first visit
 */
const DEFAULT_QUESTIONS = [
  "What's something you learned today?",
  "What would you do if you weren't afraid?",
  "What made you smile this week?",
  "What's a small win you've had recently?",
  "What are you grateful for right now?",
  "What's a skill you'd like to develop?",
  "What's been on your mind lately?",
  "What's something you're looking forward to?",
  "What challenge are you currently facing?",
  "What's the best advice you've ever received?"
];

/**
 * QuestionStorage class - Manages question data in localStorage
 */
class QuestionStorage {
  /**
   * Get all questions from localStorage
   * @returns {Array<{id: string, text: string}>} Array of question objects
   */
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.initialize();
        return this.getAll(); // Recursive call after initialization
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Add a new question
   * @param {string} text - The question text
   * @returns {{id: string, text: string}} The newly created question object
   */
  add(text) {
    const questions = this.getAll();
    const newQuestion = {
      id: this.generateId(),
      text: text.trim()
    };
    questions.push(newQuestion);
    this.save(questions);
    return newQuestion;
  }

  /**
   * Delete a question by ID
   * @param {string} id - The question ID to delete
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const questions = this.getAll();
    const filtered = questions.filter(q => q.id !== id);
    if (filtered.length === questions.length) {
      return false; // Nothing was deleted
    }
    this.save(filtered);
    return true;
  }

  /**
   * Get a random question
   * @returns {{id: string, text: string}} A random question object
   */
  getRandom() {
    const questions = this.getAll();
    if (questions.length === 0) {
      return { id: 'default', text: "Add some questions to get started!" };
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  /**
   * Initialize storage with default questions
   * Called automatically when storage is empty
   */
  initialize() {
    const defaultQuestions = DEFAULT_QUESTIONS.map(text => ({
      id: this.generateId(),
      text
    }));
    this.save(defaultQuestions);
  }

  /**
   * Save questions array to localStorage
   * @param {Array<{id: string, text: string}>} questions - Questions to save
   * @private
   */
  save(questions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Generate a unique ID for a question
   * @returns {string} Unique ID
   * @private
   */
  generateId() {
    return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get the count of questions
   * @returns {number} Number of questions
   */
  getCount() {
    return this.getAll().length;
  }

  /**
   * Clear all questions (useful for testing/debugging)
   */
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Export singleton instance
export const storage = new QuestionStorage();
