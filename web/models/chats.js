const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
	text: String,
});

module.exports = mongoose.model('Chat', chatSchema);
