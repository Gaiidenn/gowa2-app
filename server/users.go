package main

import (
	//"log"

	ara "github.com/diegogub/aranGO"
)

// User struct
type User struct {
	ara.Document        // Must include arango Document in every struct you want to save id, key, rev after saving it
	Username     string `unique:"users"`
	Password     string
	Age          int
	Gender       string   `enum:"M,F"`
	Likes        []string // TODO Change for an array of key => value for "UserId" => bool (dislike option)
	Meets        []string // Users already met
}

/**
 *  Methods needed for Model
 */

// GetKey return the key of user in db
func (user *User) GetKey() string {
	return user.Key
}

// GetCollection returns the collection name
func (user *User) GetCollection() string {
	return "users"
}

// GetError returns error
func (user *User) GetError() (string, bool) {
	// default error bool and messages. Could be any kind of error
	return user.Message, user.Error
}

/**
 *  Custom methods
 */
// init user for specific fields
func (user *User) init() {
	user.Gender = "M"
	var likes []string
	user.Likes = likes
	var meets []string
	user.Meets = meets
}
