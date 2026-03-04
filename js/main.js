/**
 * IceBreaker - Main Entry Point
 *
 * Initializes the application based on the current page.
 */

import { storage } from './storage.js';
import { questions } from './questions.js';
import { initCard } from './three-card.js';

/**
 * Initialize the main card page
 */
function initMainPage() {
  let lastQuestionId = null;

  // Initialize the card with flip callback
  const card = initCard((updateTexture) => {
    // Called when flipping TO question side
    const allQuestions = questions.getAll();
    let questionText;

    if (allQuestions.length === 0) {
      questionText = "Add some questions to get started!";
    } else {
      // Get random question, avoiding the last one if possible
      let available = allQuestions;
      if (allQuestions.length > 1 && lastQuestionId) {
        available = allQuestions.filter(q => q.id !== lastQuestionId);
      }
      const random = available[Math.floor(Math.random() * available.length)];
      questionText = random.text;
      lastQuestionId = random.id;
    }

    // Update the 3D card's back texture with the question
    updateTexture(questionText);
  });

  // Initialize storage with defaults if empty (runs silently)
  storage.getAll();
}

/**
 * Initialize the manage page
 */
function initManagePage() {
  const questionsList = document.getElementById('questions-list');
  const emptyState = document.getElementById('empty-state');
  const inputField = document.getElementById('new-question-input');
  const addBtn = document.getElementById('add-question-btn');
  const errorMessage = document.getElementById('input-error');
  const questionCount = document.getElementById('question-count');

  if (!questionsList) return; // Not on manage page

  /**
   * Render all questions to the list
   */
  function renderQuestions() {
    const allQuestions = questions.getAll();
    questionsList.innerHTML = '';

    if (allQuestions.length === 0) {
      emptyState.style.display = 'block';
      questionCount.textContent = '0';
      return;
    }

    emptyState.style.display = 'none';
    questionCount.textContent = allQuestions.length;

    allQuestions.forEach(q => {
      const item = document.createElement('div');
      item.className = 'question-item';
      item.innerHTML = `
        <span class="question-item-text">${escapeHtml(q.text)}</span>
        <button class="btn-delete" data-id="${q.id}">Delete</button>
      `;
      questionsList.appendChild(item);
    });

    // Attach delete handlers
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const result = questions.delete(id);
        if (result.success) {
          renderQuestions();
        }
      });
    });
  }

  /**
   * Handle adding a new question
   */
  function handleAddQuestion() {
    const text = inputField.value;
    const result = questions.add(text);

    if (result.success) {
      inputField.value = '';
      errorMessage.textContent = '';
      renderQuestions();
    } else {
      errorMessage.textContent = result.error;
    }
  }

  // Add question on button click
  addBtn.addEventListener('click', handleAddQuestion);

  // Add question on Enter key
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddQuestion();
    }
  });

  // Clear error when typing
  inputField.addEventListener('input', () => {
    errorMessage.textContent = '';
  });

  // Initial render
  renderQuestions();
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Application initialization
 */
function init() {
  // Check which page we're on
  const isManagePage = document.body.classList.contains('manage-page');

  if (isManagePage) {
    initManagePage();
  } else {
    initMainPage();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
