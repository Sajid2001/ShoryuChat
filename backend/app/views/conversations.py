from flask import Blueprint, request, session, jsonify
from .. import db
from .. models.conversations import Conversation, conversations_schema, conversation_schema
from ..models.messages import Message
from ..middleware.require_login import require_login

conversations = Blueprint('conversations', __name__)

@require_login
@conversations.route('/conversations', methods=['GET', 'POST'])
def get_conversations():
    user_id = session['user']['id']
    if request.method == 'POST':
        name = request.json['name']
        character = request.json['character']
        conversation = Conversation(name=name, user_id=user_id, character=character)
        db.session.add(conversation)
        db.session.commit()
        return conversation_schema.dump(conversation)
    else:
        allConversations = Conversation.query.filter_by(user_id=user_id).all()
        return conversations_schema.dump(allConversations)

@require_login
@conversations.route('/conversations/<id>', methods=['GET', 'DELETE'])
def get_conversation(id):
    if request.method == 'DELETE':
        conversation = Conversation.query.get(id)
        messages = Message.query.filter_by(conversation_id=id).all()
        db.session.delete(conversation)
        if messages and len(messages) > 0:
            for message in messages:
                db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Conversation deleted'})
    else:
        conversation = Conversation.query.get(id)
        return conversation_schema.dump(conversation)
    

    



