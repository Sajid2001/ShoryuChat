from flask import Blueprint, request, jsonify
from .. import db
from .. models.messages import Message, messages_schema, message_schema
from ..chat.chat import chain
from ..middleware.require_login import require_login

messages = Blueprint('messages', __name__)

@require_login
@messages.route('/messages/<conversation_id>', methods=['GET','POST'])
def get_messages(conversation_id):
    # this is where the langchain prompt goes
    if request.method == 'POST':
        text = request.json['text']
        role = request.json['role']
        human_message = Message(text=text, role=role, conversation_id=conversation_id)
        db.session.add(human_message)
        chain_message_text = chain.invoke(text)
        bot_message = Message(text=chain_message_text['result'], role="ai", conversation_id=conversation_id)
        db.session.add(bot_message)
        db.session.commit()
        return message_schema.dump(bot_message)
    else:
        messages = Message.query.filter(Message.conversation_id == conversation_id).all()
        return messages_schema.dump(messages)