package main

import "log"

// UserService for jsonRPC requests
type UserService struct {
}

// Save the user in database
func (us *UserService) Save(user *User, reply *User) error {
	log.Println(user)
	e := ctx.Save(user)
	if len(e) > 0 {
		log.Println(e)
		//*reply = *user
		//return e
	}
	log.Println(user)
	*reply = *user
	return nil
}
