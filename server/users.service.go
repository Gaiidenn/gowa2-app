package main

import "log"

type UserService struct {

}

func (us *UserService) Save(user *User, reply *User) error {
	log.Println(user)
	e := ctx.Save(user)
	if len(e) > 0 {
		log.Println(e)
        //*reply = false
        //return nil
	}
	log.Println(user)
    *reply = *user
    return nil
}
