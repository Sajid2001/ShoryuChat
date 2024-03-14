from flask import redirect, url_for, session, Blueprint
from ...models.user import User, userSchema  # Import your User model
from ... import db 
from .authlib import facebook

facebook_auth = Blueprint('facebook_auth', __name__)

@facebook_auth.route('/login/facebook')
def login_facebook():
    return facebook.authorize_redirect(redirect_uri=url_for('facebook_auth.authorize_facebook', _external=True))

@facebook_auth.route('/login/facebook/callback')
def authorize_facebook():
    token = facebook.authorize_access_token()
    user_info = facebook.get('https://graph.facebook.com/me?fields=id,name,email,picture').json()
    user = User.query.filter_by(provider_id=user_info['id']).first()
    if user is None:
        # Create new user
        user = User(username=user_info['name'], provider_id=user_info['id'], avatar=user_info['picture']['data']['url'])
        db.session.add(user)
        db.session.commit()
    session['user'] = userSchema.dump(user)
    return redirect('/')