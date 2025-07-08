
// Theme management
let currentTheme = localStorage.getItem('lovable-theme') || 'light';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('sun-icon').style.opacity = '0';
    document.getElementById('moon-icon').style.opacity = '1';
    document.getElementById('sun-icon-mobile').classList.add('hidden');
    document.getElementById('moon-icon-mobile').classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    document.getElementById('sun-icon').style.opacity = '1';
    document.getElementById('moon-icon').style.opacity = '0';
    document.getElementById('sun-icon-mobile').classList.remove('hidden');
    document.getElementById('moon-icon-mobile').classList.add('hidden');
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('lovable-theme', currentTheme);
  applyTheme(currentTheme);
}

// Initialize theme
applyTheme(currentTheme);

// Theme toggle event listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    hamburger.classList.remove('hidden');
    close.classList.add('hidden');
  } else {
    mobileMenu.classList.remove('hidden');
    hamburger.classList.add('hidden');
    close.classList.remove('hidden');
  }
});

// Page navigation
let currentPage = 'landing';

function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Show selected page
  document.getElementById(pageName + '-page').classList.remove('hidden');
  currentPage = pageName;
  
  // Close mobile menu if open
  mobileMenu.classList.add('hidden');
  hamburger.classList.remove('hidden');
  close.classList.add('hidden');
  
  // Update active nav buttons
  updateActiveNavButton(pageName);
  
  // Initialize page-specific functionality
  if (pageName === 'feed') {
    loadPosts();
  } else if (pageName === 'create') {
    initializeCreateForm();
  } else if (pageName === 'auth') {
    initializeAuthForm();
  } else if (pageName === 'landing') {
    startQuoteRotation();
  }
}

function updateActiveNavButton(activePage) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-900', 'dark:text-white');
    btn.classList.add('text-gray-600', 'dark:text-gray-300');
  });
}

// Rotating quotes for landing page
const quotes = [
  "You are not alone in this journey. Your story matters. 💜",
  "Every feeling is valid. Every emotion deserves to be heard. 🫂",
  "Healing begins when we share our truth with others. ✨",
  "Your vulnerability is your strength. You are braver than you know. 🌟",
  "In sharing our darkness, we find the light together. 🕯️"
];

let quoteIndex = 0;
let quoteInterval;

function startQuoteRotation() {
  clearInterval(quoteInterval);
  quoteInterval = setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    const quoteElement = document.getElementById('rotating-quote');
    if (quoteElement) {
      quoteElement.textContent = '"' + quotes[quoteIndex] + '"';
    }
  }, 4000);
}

// Auth form functionality
function initializeAuthForm() {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');
  const emailField = document.getElementById('email-field');
  const submitBtn = document.querySelector('#auth-form button[type="submit"]');
  
  let isLogin = true;
  
  loginTab.addEventListener('click', () => {
    isLogin = true;
    loginTab.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm');
    loginTab.classList.remove('text-gray-600', 'dark:text-gray-300');
    registerTab.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm');
    registerTab.classList.add('text-gray-600', 'dark:text-gray-300');
    
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Continue your journey of healing and connection';
    emailField.classList.add('hidden');
    submitBtn.innerHTML = 'Sign In 💜';
  });
  
  registerTab.addEventListener('click', () => {
    isLogin = false;
    registerTab.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm');
    registerTab.classList.remove('text-gray-600', 'dark:text-gray-300');
    loginTab.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm');
    loginTab.classList.add('text-gray-600', 'dark:text-gray-300');
    
    authTitle.textContent = 'Join Our Community';
    authSubtitle.textContent = 'Your voice matters. Let\'s create your safe space together.';
    emailField.classList.remove('hidden');
    submitBtn.innerHTML = 'Create Account 🫂';
  });
  
  document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value || 'Anonymous';
    
    // Simple success simulation
    alert(isLogin ? 'Welcome back! 💜' : 'Account created successfully! 🫂');
    showPage('feed');
  });
}

// Sample posts data
const samplePosts = [
  {
    id: '1',
    content: 'Today was really hard. I feel like I\'m drowning in my own thoughts and I don\'t know how to come up for air. Everything feels overwhelming and I just want someone to understand that it\'s okay to not be okay sometimes.',
    mood: 'Overwhelmed',
    moodEmoji: '😔',
    author: 'Sarah',
    isAnonymous: false,
    timestamp: '2 hours ago',
    reactions: { hugs: 12, strong: 8, prayers: 5 },
    commentCount: 7
  },
  {
    id: '2',
    content: 'I wanted to share something positive today. After months of therapy and small daily changes, I finally felt a moment of genuine happiness yesterday. It was brief, but it reminded me that healing is possible.',
    mood: 'Hopeful',
    moodEmoji: '🌱',
    author: 'Anonymous',
    isAnonymous: true,
    timestamp: '4 hours ago',
    reactions: { hugs: 23, strong: 18, prayers: 15 },
    commentCount: 12
  },
  {
    id: '3',
    content: 'Some days I feel like I\'m carrying the weight of the world on my shoulders. The smallest tasks feel impossible, and I question whether I\'m strong enough to keep going.',
    mood: 'Heavy',
    moodEmoji: '💔',
    author: 'Alex',
    isAnonymous: false,
    timestamp: '6 hours ago',
    reactions: { hugs: 15, strong: 22, prayers: 9 },
    commentCount: 18
  }
];

function createPostCard(post) {
  const truncatedContent = post.content.length > 300 
    ? post.content.substring(0, 300) + '...' 
    : post.content;

  return `
    <div class="lovable-card p-6 animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
            ${post.isAnonymous ? 
              '<span class="text-gray-500 dark:text-gray-400">👤</span>' : 
              `<span class="text-sm font-medium">${post.author.charAt(0).toUpperCase()}</span>`
            }
          </div>
          <div>
            <p class="text-sm font-medium">${post.isAnonymous ? 'Anonymous' : post.author}</p>
            <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>🕐</span>
              <span>${post.timestamp}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
          <span class="text-sm">${post.moodEmoji}</span>
          <span class="text-xs font-medium text-gray-600 dark:text-gray-300">${post.mood}</span>
        </div>
      </div>

      <!-- Content -->
      <div class="mb-4">
        <p class="leading-relaxed">
          ${truncatedContent}
        </p>
        ${post.content.length > 300 ? 
          '<button class="text-blue-500 hover:text-blue-400 text-sm font-medium mt-2 transition-colors duration-300">Read more...</button>' : 
          ''
        }
      </div>

      <!-- Reactions -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <div class="flex items-center space-x-4">
          <button onclick="reactToPost('${post.id}', 'hugs')" class="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
            <span>🫂</span>
            <span class="text-sm font-medium">${post.reactions.hugs}</span>
          </button>
          <button onclick="reactToPost('${post.id}', 'strong')" class="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
            <span>❤️</span>
            <span class="text-sm font-medium">${post.reactions.strong}</span>
          </button>
          <button onclick="reactToPost('${post.id}', 'prayers')" class="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
            <span>✨</span>
            <span class="text-sm font-medium">${post.reactions.prayers}</span>
          </button>
        </div>
        
        <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <span>💬</span>
          <span class="text-sm">${post.commentCount}</span>
        </div>
      </div>
    </div>
  `;
}

function loadPosts() {
  const container = document.getElementById('posts-container');
  container.innerHTML = samplePosts.map(post => createPostCard(post)).join('');
}

function reactToPost(postId, reactionType) {
  // Find and update the post
  const post = samplePosts.find(p => p.id === postId);
  if (post) {
    post.reactions[reactionType]++;
    loadPosts(); // Reload posts to show updated reactions
  }
}

// Create post form functionality
const moods = [
  { value: 'broken', label: 'Broken', emoji: '💔' },
  { value: 'numb', label: 'Numb', emoji: '😶' },
  { value: 'lost', label: 'Lost', emoji: '🫥' },
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😔' },
  { value: 'hopeful', label: 'Hopeful', emoji: '🌱' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'confused', label: 'Confused', emoji: '😕' },
  { value: 'empty', label: 'Empty', emoji: '🕳️' },
  { value: 'heavy', label: 'Heavy', emoji: '⚡' },
  { value: 'peaceful', label: 'Peaceful', emoji: '🕊️' }
];

let selectedMood = '';

function initializeCreateForm() {
  const moodSelector = document.getElementById('mood-selector');
  const postContent = document.getElementById('post-content');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');
  
  // Generate mood buttons
  moodSelector.innerHTML = moods.map(mood => `
    <button type="button" onclick="selectMood('${mood.value}')" 
            class="mood-btn p-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700" 
            data-mood="${mood.value}">
      <div class="text-2xl mb-1">${mood.emoji}</div>
      <div class="text-sm font-medium">${mood.label}</div>
    </button>
  `).join('');
  
  // Character counter
  postContent.addEventListener('input', () => {
    const length = postContent.value.length;
    charCount.textContent = `${length} characters`;
    updateSubmitButton();
  });
  
  // Form submission
  document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!postContent.value.trim() || !selectedMood) return;
    
    // Simulate posting
    submitBtn.innerHTML = `
      <div class="flex items-center justify-center space-x-2">
        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Sharing your heart...</span>
      </div>
    `;
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Your story has been shared. Thank you for being brave. 💜');
      showPage('feed');
      
      // Reset form
      postContent.value = '';
      selectedMood = '';
      charCount.textContent = '0 characters';
      updateSubmitButton();
      document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'border-blue-400', 'dark:border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.add('border-gray-200', 'dark:border-gray-600');
      });
    }, 1500);
  });
}

function selectMood(mood) {
  selectedMood = mood;
  
  // Update button styles
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'border-blue-400', 'dark:border-blue-500', 'text-blue-600', 'dark:text-blue-400');
    btn.classList.add('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-gray-800');
  });
  
  const selectedBtn = document.querySelector(`[data-mood="${mood}"]`);
  selectedBtn.classList.remove('border-gray-200', 'dark:border-gray-600', 'bg-white', 'dark:bg-gray-800');
  selectedBtn.classList.add('bg-blue-100', 'dark:bg-blue-900', 'border-blue-400', 'dark:border-blue-500', 'text-blue-600', 'dark:text-blue-400');
  
  updateSubmitButton();
}

function updateSubmitButton() {
  const postContent = document.getElementById('post-content');
  const submitBtn = document.getElementById('submit-btn');
  
  if (postContent.value.trim() && selectedMood) {
    submitBtn.disabled = false;
    submitBtn.className = 'w-full lovable-button bg-gradient-to-r from-rose-400 to-purple-400 text-white hover:shadow-lg text-lg py-4 transition-all duration-300';
    submitBtn.innerHTML = `
      <div class="flex items-center justify-center space-x-2">
        <span>✉️</span>
        <span>Let It Out 🖤</span>
      </div>
    `;
  } else {
    submitBtn.disabled = true;
    submitBtn.className = 'w-full lovable-button bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed text-lg py-4';
    submitBtn.innerHTML = 'Let It Out 🖤';
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  showPage('landing');
});
