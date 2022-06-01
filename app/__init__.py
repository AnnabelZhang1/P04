# The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
# SoftDev
# P04: Forged By Land
# 2022-05-24

from flask import Flask, request, render_template, redirect, session, jsonify
import sqlite3
app = Flask(__name__)

db = sqlite3.connect('USERSd.db')
cursor = db.cursor()

# TODO: Make SQL statement to create table
create_users_table_sql ="""
	CREATE TABLE IF NOT EXISTS users(
	rowid INTEGER PRIMARY KEY,
	user_name TEXT NOT NULL,
	hash_string TEXT NOT NULL,
	wins INTEGER NOT NULL
	);
"""

cursor.execute(create_users_table_sql)

db.commit()
db.close()

#insertNewUser has not been tested yet
def insertNewUser(user, hash, wins):
	db = sqlite3.connect('USERSd.db')
	cursor = db.cursor()

	cursor.execute("""
	INSERT INTO users (user_name, hash_string, wins) VALUES
	("""+ user +""","""+ hash +""",""" + wins + """);
	""")

	db.commit()
	db.close()

#getWins has not been tested yet
def getWins(user):
	db = sqlite3.connect('USERSd.db')
	cursor = db.cursor()

	cursor.execute("""
	SELECT * FROM users WHERE user_name = """ + user + """
	""")

	row = cursor.fetchone()

	db.commit()
	db.close()

	return row['wins']

#addWin has not been tested yet
def addWin(user):
	db = sqlite3.connect('USERSd.db')
	cursor = db.cursor()

	cursor.execute("""
	UPDATE users
	SET wins = """ + (getWins(user)+1) + """

	""")

	db.commit()
	db.close()


@app.route("/", methods=['GET', 'POST'])
def welcome():
	return redirect("/home")

@app.route("/home", methods=['GET', 'POST'])
def home():
	return render_template("home.html")

@app.route("/lobby", methods=['GET', 'POST'])
def lobby():
    return render_template("lobby.html")

@app.route("/game", methods=['GET', 'POST'])
def game():
    return render_template("game.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template("login.html")

@app.route("/register", methods=['GET', 'POST'])
def register():
    return render_template("register.html")


if __name__ == "__main__":
    app.run(debug=True)
