# The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
# SoftDev
# P04: Forged By Land
# 2022-05-24

from flask import *
from flask_socketio import *
from database import *
import sqlite3

# Socket initialization--
app = Flask(__name__)
app.config['SECRET_KEY'] = 'muffins'
socketio = SocketIO(app, cors_allowed_origins='*')

clients = []

# Flask app routes--
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

# Flask-socketio functions--
# @socketio.on('connect')
# def connecting():
# 	clients.append(request.sid)
# 	room = session.get('room')
# 	join_room(room)
# 	emit('status', {'msg': 'someone has joined.'}, room=clients[0])
	# make status emit on js file

@socketio.on('connect')
def connecting():
	clients.append(request.sid)
	print(clients)
	emit('conjs', {'data': clients}, broadcast=True)

@socketio.on('disconnect')
def disconnecting():
	# index = clients.index(request.sid)
	clients.remove(request.sid)
	print('Client disconnected')
	emit('disconjs', {'msg': "Client disconnected"}, broadcast=True)

@socketio.on('send_mouse')
def message_recieved(data):
    # print(data['text'])
    emit('draw_to_all', data, broadcast=True)

# Run app
if __name__ == "__main__":
    socketio.run(app, port=8000, debug=True)
