# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = psycopg2.connect(**db_settings)
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (data['username'], data['password']))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'message': 'Error registering user'}), 500
    finally:
        cur.close()
        conn.close()


