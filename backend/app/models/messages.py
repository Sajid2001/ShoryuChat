from .. import db
from .. import ma
#from langchain.schema.messages import HumanMessage, AIMessage, SystemMessage

class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000))
    role = db.Column(db.String(100))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # def as_lc_message(self) -> HumanMessage | AIMessage | SystemMessage:
    #     if self.role == "human":
    #         return HumanMessage(content=self.text)
    #     elif self.role == "ai":
    #         return AIMessage(content=self.text)
    #     elif self.role == "system":
    #         return SystemMessage(content=self.text)
    #     else:
    #         raise Exception(f"Unknown message role: {self.role}")

class MessageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'text', 'role', 'conversation_id', 'created_at')

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)