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
create_table_sql ="""
	CREATE TABLE IF NOT EXISTS (
	username TEXT
	)
"""

@app.route("/", methods=['GET', 'POST'])
def welcome():
	return redirect("/home")

@app.route("/home", methods=['GET', 'POST'])
def login():
	return render_template("home.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
    app.run(debug=True)
