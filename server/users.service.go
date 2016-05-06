package main

import (
	"log"
	"time"
	"errors"
	"encoding/json"
	ara "github.com/diegogub/aranGO"
)

// UserService for jsonRPC requests
type UserService struct {
}

// Save the user in database
func (us *UserService) Save(user *User, reply *User) error {
	ctx, ae :=  ara.NewContext(db)
	if ae != nil {
		log.Println("Error while created db context : ", ae)
		jsonAE, _ := json.Marshal(ae)
		return errors.New(string(jsonAE))
	}
	if user.RegistrationDate.IsZero() {
		user.RegistrationDate = time.Now();
	}
	log.Println(user)
	e := ctx.Save(user)
	if len(e) > 0 {
		jsonError, _ := json.Marshal(e)
		return errors.New(string(jsonError)) //"problem!"
	}
	log.Println(user)
	*reply = *user
	return nil
}

// Log the user in app
func (us *UserService) Login(userLogin *User, user *User) error {
	var tmpUser struct{
		Username string
	}
	tmpUser.Username = userLogin.Username
	e := db.Col(user.GetCollection()).First(&tmpUser, user)
	if e != nil {
		return errors.New("{Username: 'invalid username'}")
	}

	if user.Password != userLogin.Password {
		return errors.New("{Password: 'wrong password'}")
	}
	return nil
}
