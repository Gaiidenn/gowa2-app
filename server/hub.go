// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import "log"

// hub maintains the set of active connections and broadcasts messages to the
// connections.
type hub struct {
	// Inbound messages from the connections.
	broadcast chan *rpcCall

	// Register requests from the connections.
	register chan *connection

	// Unregister requests from connections.
	unregister chan *connection

	// Registered connections.
	connections map[*connection]bool
}

var h = hub{
	broadcast:   make(chan *rpcCall),
	register:    make(chan *connection),
	unregister:  make(chan *connection),
	connections: make(map[*connection]bool),
}

func (h *hub) run() {
	for {
		select {
		case c := <-h.register:
			h.connections[c] = true
		case c := <-h.unregister:
			if _, ok := h.connections[c]; ok {
				delete(h.connections, c)
				close(c.call)
			}
		case m := <-h.broadcast:
			log.Println("trying to broadcast")
			log.Println(m)
			for c := range h.connections {
				select {
				case c.call <- m:
				default:
					close(c.call)
					delete(h.connections, c)
				}
			}
		}
	}
}
