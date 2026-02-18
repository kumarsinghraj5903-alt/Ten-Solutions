async function sendMsg() {
  const input = document.getElementById("userMsg");
  const msg = input.value.trim();
  if (!msg) return;

  addMsg(msg, "You");
  input.value = "";

  addMsg("Thinking...", "AI");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    if (data.reply) {
      chatMessages.lastChild.innerHTML = `<b>AI:</b> ${data.reply}`;
    } else {
      chatMessages.lastChild.innerHTML = `<b>AI:</b> Error: ${data.error}`;
    }

  } catch (error) {
    chatMessages.lastChild.innerHTML = `<b>AI:</b> Network error.`;
  }
}
