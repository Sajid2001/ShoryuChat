from flask import redirect, url_for, session, Blueprint
from ...models.user import User, userSchema  # Import your User model
from ... import db 
from .authlib import google

google_auth = Blueprint('google_auth', __name__)

@google_auth.route('/login/google')
def login_google():
    return google.authorize_redirect(redirect_uri=url_for('google_auth.authorize_google', _external=True))

@google_auth.route('/login/google/callback')
def authorize_google():
    token = google.authorize_access_token()
    user_info = google.get('https://www.googleapis.com/oauth2/v3/userinfo').json()
    # Example: check if user exists in your database
    user = User.query.filter_by(provider_id=user_info['sub']).first()
    if user is None:
        # Create new user
        user = User(username=user_info['name'], provider_id=user_info['sub'], avatar=user_info.get('picture'))
        db.session.add(user)
        db.session.commit()
    session['user'] = userSchema.dump(user)
    return redirect('/')