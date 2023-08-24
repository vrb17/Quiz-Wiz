# Submit quiz
@app.route('/api/submit_quiz', methods=['POST'])
@jwt_required()
def submit_quiz():
    data = request.json
    current_user = get_jwt_identity()

    conn = psycopg2.connect(**db_settings)
    cur = conn.cursor()

    try:
        # Calculate the score and store in the database
        correct_answers = 0
        for submission in data:
            question_id = submission['question_id']
            selected_option = submission['selected_option']
            
            cur.execute("SELECT correct_option FROM questions WHERE id = %s", (question_id,))
            correct_option = cur.fetchone()[0]
            
            if selected_option == correct_option:
                correct_answers += 1
        
        percentage_score = (correct_answers / len(data)) * 100
        cur.execute("INSERT INTO quiz_submissions (user_id, topic_id, score) VALUES (%s, %s, %s)", (current_user, data[0]['topic_id'], percentage_score))
        conn.commit()
        return jsonify({'message': 'Quiz submitted successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'message': 'Error submitting quiz'}), 500
    finally:
        cur.close()
        conn.close()
