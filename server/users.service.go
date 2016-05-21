package main

import (
	"log"
	"time"
	"errors"
	"encoding/json"
	ara "github.com/solher/arangolite"
)

// UserService for jsonRPC requests
type UserService struct {
}

// Save the user in database
func (us *UserService) Save(user *User, reply *User) error {
	if user.RegistrationDate.IsZero() {
		user.RegistrationDate = time.Now()
	}
	var q *ara.Query
	if user.Key == nil {
		rd, _ := user.RegistrationDate.MarshalJSON()
		q = ara.NewQuery(`INSERT {
				Username: %q,
				Email: %q,
				Password: %q,
				Age: %d,
				Gender: %q,
				Likes: %q,
				Meets: %q,
				RegistrationDate: %s
			} IN users`,
			user.Username,
			user.Email,
			user.Password,
			user.Age,
			user.Gender,
			user.Likes,
			user.Meets,
			rd,
			)

	} else {
		q = ara.NewQuery(`UPDATE %q WITH {
				Username: %q,
				Email: %q,
				Password: %q,
				Age: %d,
				Gender: %q,
				Likes: %q,
				Meets: %q
			} IN users`,
			*user.Key,
			user.Username,
			user.Email,
			user.Password,
			user.Age,
			user.Gender,
			user.Likes,
			user.Meets,
			)
	}
	log.Println(q)
	_, err := db.Run(q)
	if err != nil {
		log.Println(err)
		return err
	}
	var users []User
	q = ara.NewQuery(`FOR user IN users FILTER user.Username == %q RETURN user`, user.Username).Cache(true).BatchSize(500)
	resp, err := db.Run(q)
	if err != nil {
		log.Println(err)
		return err
	}
	log.Println(string(resp))
	err = json.Unmarshal(resp, &users)
	if err != nil {
		log.Println(err)
		return err
	}
	log.Println(users)
	if len(users) > 0 {
		userTmp := users[0]
		var s string
		call := rpcCall{
			method: "UsersService.updateList",
			args: userTmp,
			reply: &s,
		}
		h.broadcast <- &call
		*reply = userTmp
		return nil
	}
	return errors.New("prout")
}

// Log the user in app
func (us *UserService) Login(userLogin *User, user *User) error {
	q := ara.NewQuery(`FOR user IN users FILTER user.Username == %q RETURN user`, userLogin.Username).Cache(true).BatchSize(500)
	resp, err := db.Run(q)
	if err != nil {
		log.Println(err)
		return err
	}
	var users []User
	err = json.Unmarshal(resp, &users)
	if err != nil {
		log.Println(err)
		return err
	}
	log.Println(users)
	if len(users) > 0 {
		userTmp := users[0]
		if (userTmp.Password != userLogin.Password) {
			return errors.New("wrong password")
		}
		*user = userTmp
		return nil
	}
	return errors.New("unknown username")
}

// Get all users from collection
func (us *UserService) GetAll(_ *string, reply *[]User) error {
	q := ara.NewQuery(`FOR user IN users RETURN user`).Cache(true).BatchSize(500)
	log.Println(q)
	resp, err := db.Run(q)
	if err != nil {
		log.Println(err)
		return err
	}
	var users []User
	err = json.Unmarshal(resp, &users)
	if err != nil {
		log.Println(err)
		return err
	}
	log.Println(users)
	*reply = users
	return nil
}
