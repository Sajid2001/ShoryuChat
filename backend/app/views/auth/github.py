from flask import blueprints,redirect, url_for, session
from app import db
from ...models.user import User, userSchema
from .authlib import github

github_auth = blueprints.Blueprint('github_auth', __name__)

@github_auth.route('/login/github')
def login_github():
    return github.authorize_redirect(redirect_uri=url_for('github_auth.authorize_github', _external=True))

@github_auth.route('/login/github/callback')
def authorize_github():
    token = github.authorize_access_token()
    user_info = github.get('https://api.github.com/user').json()
    # Example: check if user exists in your database
    user = User.query.filter_by(provider_id=user_info['id']).first()
    if user is None:
        # Create new user
        user = User(username=user_info['login'], provider_id=user_info['id'], avatar=user_info['avatar_url'])
        db.session.add(user)
        db.session.commit()
    session['user'] = userSchema.dump(user)
    #env this later
    return redirect('/')

