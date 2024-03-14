from .. import db
from .. import ma

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.String(100))
    username = db.Column(db.String(100))
    avatar = db.Column(db.String(1000))


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'provider_id', 'username', 'avatar')

userSchema = UserSchema()