from middlewares.auth_middleware import token_required
from flask import Blueprint, request, jsonify

reports_bp = Blueprint("reports", __name__)


#Will Add AI generated reports and Insights here in future