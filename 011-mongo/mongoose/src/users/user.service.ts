import { injectable } from "inversify";
import IUser from './user';
import User from './user.model';

interface createUserDto {
    username: IUser['username'],
    displayName: IUser['displayName'],
    password: IUser['password'],
    email: IUser['email']
}

@injectable()
class UserRepository {
    getUser(id: string): any {
        return User.findById(id)
    }
    saveUser(user: createUserDto): Promise<createUserDto> {
        const newUser = new User(user);
        return newUser.save();
    }
    verify (username: string, password: string, done: Function): void {
        User.findOne({ username: username }, (err: string, user: IUser) => {
            if (err) { 
                return done(err) 
            } else if (!user || user.password !== password) { 
                return done(null, false) 
            } else {
                return done(null, user)
            }
        })
    }
}

export default UserRepository;