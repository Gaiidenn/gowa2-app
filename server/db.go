package main

import (
	"log"

	ara "github.com/diegogub/aranGO"
)

type database struct {
	s *ara.Session
}

//  docTest is my test structure for db connection
type docTest struct {
	ara.Document
	wsID string
}

const ()

func initDB() {
	_, err := ara.Connect("http://localhost:8529", "root", "", false)
	if err != nil {
		log.Println(err)
		return
	}
}
