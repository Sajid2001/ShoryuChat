from .. import db
from .. import ma

class Conversation(db.Model):
    __tablename__ = 'conversation'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(100))
    character = db.Column(db.String(100))

class ConversationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'name', 'character')

conversation_schema = ConversationSchema()
conversations_schema = ConversationSchema(many=True)