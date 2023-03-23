import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToChatGPT } from '../../chatGPTAPI';
import './Chat.css';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { sender: 'Tú', content: userInput }]);
    setUserInput('');

    const chatGPTResponse = await sendMessageToChatGPT(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'Remedybot 👨‍⚕️', content: `${chatGPTResponse} ...` },
    ]);
  }

  return (
    <div className="chat-container">
      <h1>¿En qué te puedo ayudar?</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'chatgpt-message'}`}
          >
            <strong>{message.sender}: </strong>
            <span>{message.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Ingresa el nombre de la medicína o remedio aquí..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
