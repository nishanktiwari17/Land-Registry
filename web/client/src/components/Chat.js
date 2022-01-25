import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { useEffect } from 'react';
import 'react-chat-widget/lib/styles.css';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

function Chat() {
	useEffect(() => {
		addResponseMessage('Welcome to this awesome chat!');
		socket.on('receive-message', (message) => {
			addResponseMessage(message);
		});
	}, []);

	const handleNewUserMessage = (newMessage, chatId) => {
		console.log(`New message incoming! ${newMessage}`);
		socket.emit('send-message', newMessage);
	};

	return (
		<Widget
			className="rcw-conversation-container"
			handleNewUserMessage={handleNewUserMessage}
			emojis={true}
			subtitle="Chat wtih buyer/seller to negotiate a deal"
		/>
	);
}

export default Chat;
