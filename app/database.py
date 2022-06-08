# The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
# SoftDev
# P04: Forged By Land
# 2022-05-24

import sqlite3

# Database things--
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

# create_lobbytable ="""
# 	CREATE TABLE IF NOT EXISTS lobbies(
# 	rowid INTEGER PRIMARY KEY,
# 	lobbycode TEXT NOT NULL,
# 	p1 TEXT NOT NULL,
# 	p2 TEXT NOT NULL,
# 	p3 TEXT NOT NULL,
# 	p4 TEXT NOT NULL
# 	);
# """

cursor.execute(create_users_table_sql)
# cursor.execute(create_lobbytable)

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
