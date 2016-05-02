// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	//"log"
	//"net/http"
	"golang.org/x/net/websocket"
	"net/rpc"
	"net/rpc/jsonrpc"
	"log"
	//"time"
)

func jsonrpcHandler(ws *websocket.Conn) {
	log.Println("connection websocket on jsonrpcHandler")
	jsonrpc.ServeConn(ws)
}

func pushHandler(ws *websocket.Conn) {
	log.Println("connection websocket on pushHandler")
	rc := jsonrpc.NewClient(ws)

	c := &connection{
		rc: rc,
		send: make(chan []byte),
	}
	h.register <- c

	var reply bool

	err := rc.Call("App.log", "My test", &reply)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println(reply)
}
/*
const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}
*/
// connection is an middleman between the websocket connection and the hub.
type connection struct {
	// The rpc client
	rc *rpc.Client

	// Buffered channel of outbound messages.
	send chan []byte
}
/*
// readPump pumps messages from the websocket connection to the hub.
func (c *connection) readPump() {
	defer func() {
		h.unregister <- c
		c.ws.Close()
	}()
	//c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	//c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		log.Println("Message received from client : ", string(message))
		h.broadcast <- message
	}
}

// write writes a message with the given message type and payload.
func (c *connection) write(mt int, payload []byte) error {
	c.ws.SetWriteDeadline(time.Now().Add(writeWait))
	return c.ws.WriteMessage(mt, payload)
}

// writePump pumps messages from the hub to the websocket connection.
func (c *connection) writePump() {
	//ticker := time.NewTicker(pingPeriod)
	defer func() {
		//ticker.Stop()
		c.ws.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				//c.write(websocket.CloseMessage, []byte{})
				return
			}
			//if err := c.write(websocket.TextMessage, message); err != nil {
			if err := websocket.Message.Send(c.ws, message); err != nil {
				return
			}
		/*case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

// serveWs handles websocket requests from the peer.
//func serveWs(w http.ResponseWriter, r *http.Request) {
func serveWs(ws *websocket.Conn) {

	rc := jsonrpc.NewClient(ws)
	c := &connection{
		send: make(chan []byte, 256),
		ws: ws,
		rc: rc,
	}
	h.register <- c

	go c.writePump()
	jsonrpc.ServeConn(c.ws)
	//c.readPump()
}
*/
