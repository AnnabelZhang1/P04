# The Convicts: Annabel Zhang, Alif Abdullah, Sophie Liu, Qina Liu (Mang, The Eagle In The Sand, Quacky, Nyx)
# SoftDev
# P04: Forged By Land
# 2022-05-24

from flask import *
from flask_socketio import *

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

@app.route("/game", methods=['GET', 'POST'])
def game():
    return render_template("game.html")

# Flask-socketio functions--
@socketio.on('connect')
def connecting():
	clients.append(request.sid)
	print(clients)
	emit('conjs', {'data': clients}, broadcast=True)
	emit('setid', {'data': clients}, broadcast=True)

@socketio.on('disconnect')
def disconnecting():
	# index = clients.index(request.sid)
	clients.remove(request.sid)
	print('Client disconnected')
	emit('disconjs', {'msg': "Client disconnected"}, broadcast=True)

@socketio.on('send_mouse_all')
def message_recieved_all(data):
	# prints request id of the user who clicks
	# print("Request ID is: " + request.sid)
	emit('draw_to_all', data, broadcast=True)

# useless rn
@socketio.on('turn_red')
def playTurn():
	emit('action', {'player':'Red'}, to=clients[0])
	emit('hide', broadcast=True, include_self=False)

@socketio.on('update_turn')
def update(data):
	emit('update_html', data, broadcast=True)

# useless rn
@socketio.on('deny_options_everyone_else')
def deny():
	emit('deny_options', data, broadcast=True, include_self=False)

# Run app--
if __name__ == "__main__":
    socketio.run(app, port=8000, debug=True)
