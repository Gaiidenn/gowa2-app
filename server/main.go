package main

import (
	"flag"
	"log"
	"net/http"
	"net/rpc"
	"io/ioutil"
	"os"
	"strings"
	"text/template"
	"encoding/json"
	"golang.org/x/net/websocket"
)

type Configuration struct {
	ClientPath string `json: "clientPath"`
}
var config = Configuration{}

var addr *string
var clientDir *string
var homeTempl *template.Template

func init() {
	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(file, &config)
	if err != nil {
		panic(err)
	}
	addr = flag.String("addr", ":8080", "http service address")
	clientDir = flag.String("clientDir", config.ClientPath, "client app directory")
	homeTempl = template.Must(template.ParseFiles(config.ClientPath + "/index.html"))
}

func main() {
	flag.Parse()

	// Initialize websocket hub
	go h.run()

	// Initialize DataBase
	initDB()

	// Register rpc methods
	initRPCRegistration()

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

func initRPCRegistration() {
	userRPCService := new(UserRPCService)
	rpc.Register(userRPCService)
}

/*
// Msg type
type Msg string

// Echo just response with the same msg as received
func (msg *Msg) Echo(str string, reply *string) error {
	log.Println("Msg.Echo(", str, ")")
	*reply = str
	return nil
}
*/
