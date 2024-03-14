from flask import Blueprint, jsonify, session
from ...middleware.require_login import require_login

auth = Blueprint('auth', __name__)

@auth.route('/logout')
@require_login
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Successfully logged out'})

@auth.route('/current_user')
@require_login
def current_user():
    user = session.get('user')
    return jsonify(user)
