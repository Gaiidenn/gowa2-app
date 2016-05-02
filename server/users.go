package main

import (
	//"log"

	ara "github.com/diegogub/aranGO"
)

type User struct {
    ara.Document // Must include arango Document in every struct you want to save id, key, rev after saving it
    Username string `unique:"users"`
    Age int
    Gender string `enum:"M,F"`
    Likes []string // TODO Change for an array of key => value for "UserId" => bool (dislike option)
    Meets []string // Users already met
}

/**
 *  Methods needed for Model
 */

func (d *User) GetKey() string {
    return d.Key
}

func (d *User) GetCollection() string {
    return "users"
}

func (d *User) GetError() (string, bool) {
    // default error bool and messages. Could be any kind of error
    return d.Message, d.Error
}

/**
 *  Custom methods
 */

 func (user *User) init() {
 	user.Gender = "M"
 	var likes []string
 	user.Likes = likes
 	var meets []string
 	user.Meets = meets
 }
