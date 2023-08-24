# Fetch questions for a topic
@app.route('/api/topics/<int:topic_id>/questions', methods=['GET'])
def get_questions(topic_id):
    conn = psycopg2.connect(**db_settings)
    cur = conn.cursor()

    try:
        # Use parameterized query to prevent SQL injection
        cur.execute("SELECT * FROM questions WHERE topic_id = %s", (topic_id,))
        questions = [{'id': question[0], 'topic_id': question[1], 'text': question[2], 'options': question[3], 'correct_option': question[4]} for question in cur.fetchall()]
        return jsonify(questions), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching questions'}), 500
    finally:
        cur.close()
        conn.close()
