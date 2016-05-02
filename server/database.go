package main

import (
	"log"
	ara "github.com/diegogub/aranGO"
)

var db *ara.Database
var ctx *ara.Context

func initDB() {
	// Initialize database connection
	s, err := ara.Connect("http://localhost:8529", "root", "", false)
	if err != nil {
		log.Println(err)
		return
	}

	// Try to create the database if it doesn't exists
	err = s.CreateDB("test", nil)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("DataBase successfully created")
	}
	db = s.DB("test")

	initCollections()

	ctx, err =  ara.NewContext(db)
	if err != nil {
		log.Println("Error while created db context : ", err)
		return
	}
}

func initCollections() {
	cols := []string{
		"users",
		"docs",
	}

	for _, col := range cols {
		createCollection(col)
	}
}

func createCollection(colName string) {
	// Try to create the collection
	if db.ColExist(colName) {
		log.Println("Collection", colName, "already exists")
		return
	}
	col := ara.NewCollectionOptions(colName, true)
	db.CreateCollection(col)
	log.Println("Collection", colName, "successfully created")
}
