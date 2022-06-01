import asyncio
import json
import websockets

import itertools

USERS = []
JOINED = {}

# returns how many users are logged in
def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})

# parse data from clients about where to draw rects and circles
def value_event(message):
    return message

async def send_data(websocket):
    try:
        # Register user if enter tab
        USERS.append(websocket)
        print("New user entered!")
        # Tell all the clients about the new user.
        websockets.broadcast(USERS, users_event())

        # Tell clients about somebody clicking on canvas.
        async for message in websocket:
            websockets.broadcast(USERS, value_event(message))

    finally:
        # Unregister user if exit tab
        USERS.remove(websocket)
        print("Some user exited.")
        websockets.broadcast(USERS, users_event())


async def start(websocket):
    """
    Handle a connection from the first player: start a new game.
    """
    # Initialize a Connect Four game, the set of WebSocket connections
    # receiving moves from this game, and secret access tokens.
    game = Grid()
    # or
    game = Hexagon()
    connected = {websocket}
    # replace with random string gen
    join_key = secrets.token_urlsafe(12)
    JOIN[join_key] = game, connected

    try:
        # Send the secret access tokens to the browser of the first player,
        # where they'll be used for building "join" and "watch" links.
        event = {
            "type": "init",
            "join": join_key,
        }

        await websocket.send(json.dumps(event))
        # Receive and process moves from the first player.
        await play(websocket, game, PLAYER1, connected)

    finally:
        # game finished
        del JOIN[join_key]


async def main():
    # server at localhost 6789
    async with websockets.serve(send_data, "localhost", 6789):
        await asyncio.Future() # run forever

if __name__ == "__main__":
    asyncio.run(main())
