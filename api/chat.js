aiForm.onsubmit = async e => {
  e.preventDefault();
  const question = aiInput.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  aiInput.value = '';

  // Show loading
  const loadingMsg = addMessage('Typing...', 'ai');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        history: [] // ← you can collect previous messages later
      })
    });

    if (!res.ok) throw new Error('API error');

    const data = await res.json();
    chatHistory.removeChild(loadingMsg);
    addMessage(data.content, 'ai');

  } catch (err) {
    chatHistory.removeChild(loadingMsg);
    addMessage('Sorry, something went wrong 😔 Please try again.', 'ai');
  }
};
