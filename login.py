# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    conn = psycopg2.connect(**db_settings)
    cur = conn.cursor()

    try:
        cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (data['username'], data['password']))
        user = cur.fetchone()
        if user:
            access_token = create_access_token(identity=user[1])
            return jsonify({'access_token': access_token}), 200
        return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'message': 'Error during login'}), 500
    finally:
        cur.close()
        conn.close()
