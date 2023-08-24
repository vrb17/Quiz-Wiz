import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/quiz/:topicId" component={Quiz} />
      </Switch>
    </Router>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registrationForm');
  const loginForm = document.getElementById('loginForm');
  const errorContainer = document.getElementById('errorContainer'); 

  registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('regUsername').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      if (!validateRegistrationInputs(username, email, password)) {
          showError('Please fill out all fields.');
          return;
      }

      try {
          const response = await registerUser(username, email, password);
          if (response.success) {
              showSuccess('Registration successful! You can now log in.');
          } else {
              showError(response.message || 'Registration failed. Please try again.');
          }
      } catch (error) {
          showError('An error occurred while registering. Please try again later.');
          console.error('Registration error:', error);
      }
  });

  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      if (!validateLoginInputs(email, password)) {
          showError('Please fill out all fields.');
          return;
      }

      try {
          const response = await loginUser(email, password);
          if (response.success) {
              showSuccess('Login successful! Redirecting...');
          } else {
              showError(response.message || 'Login failed. Please check your credentials.');
          }
      } catch (error) {
          showError('An error occurred while logging in. Please try again later.');
          console.error('Login error:', error);
      }
  });

  function showSuccess(message) {
      errorContainer.textContent = message;
      errorContainer.classList.remove('error');
      errorContainer.classList.add('success');
      errorContainer.style.display = 'block';
  }

  function showError(message) {
      errorContainer.textContent = message;
      errorContainer.classList.remove('success');
      errorContainer.classList.add('error');
      errorContainer.style.display = 'block';
  }
});


export default App;
