# The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (add your duckies)
# SoftDev
# P04: Forged By Land
# 2022-05-24

from flask import Flask, request, render_template, redirect, session, jsonify
app = Flask(__name__)

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
