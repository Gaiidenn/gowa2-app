// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"log"
	"net/http"
	"golang.org/x/net/websocket"
	"os"
	"strings"
	"text/template"
)

var addr = flag.String("addr", ":8080", "http service address")
var clientDir = flag.String("clientDir", "/../client", "client app directory")
var homeTempl = template.Must(template.ParseFiles("../client/index.html"))

func serveIndex(w http.ResponseWriter, r *http.Request) {

	if validFileRequest(r.URL.Path) {
		pwd, _ := os.Getwd()
		filePath := pwd + *clientDir + r.URL.Path
		http.ServeFile(w, r, filePath)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", 405)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	homeTempl.Execute(w, r.Host)
}

func main() {
	flag.Parse()

	// Initialize websocket hub
	go h.run()

	// Initialize DataBase
	initDB()

	// Define requests handlers
	http.Handle("/jsonrpc", websocket.Handler(jsonrpcHandler))
	http.Handle("/push", websocket.Handler(pushHandler))
	http.HandleFunc("/", serveIndex)

	// Start server
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func validFileRequest(path string) bool {
	if path == "/" {
		return false
	}

	s := strings.Split(path, "/")
	file := strings.Split(s[len(s)-1], ".")

	if len(file) < 2 {
		return false
	}

	if fileExt := file[len(file)-1]; fileExt == "js" || fileExt == "html" || fileExt == "css" {
		return true
	}

	return false
}
