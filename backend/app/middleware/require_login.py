from functools import wraps
from flask import session,jsonify

def require_login(view_func):
    @wraps(view_func)
    def wrapped_view(*args, **kwargs):
        if 'user' not in session:
            # Redirect to login page if user is not logged in
            return jsonify({'error': 'Unauthorized'}), 401
        return view_func(*args, **kwargs)
    return wrapped_view