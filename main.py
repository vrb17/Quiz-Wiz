from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/quizzy_db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Topic(db.Model):
    __tablename__ = 'topics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON, nullable=False)
    correct_option = db.Column(db.Integer, nullable=False)

class QuizSubmission(db.Model):
    __tablename__ = 'quiz_submissions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)

@app.route('/api/questions', methods=['GET'])
def get_questions():
    # Retrieve and return questions from the database
    questions = Question.query.all()
    questions_list = [{
        'id': question.id,
        'topic_id': question.topic_id,
        'text': question.text,
        'options': question.options,
        'correct_option': question.correct_option
    } for question in questions]
    return jsonify(questions_list)

# Add more routes and logic as needed for registration, login, quiz submission, etc.

if __name__ == '__main__':
    app.run(debug=True)
