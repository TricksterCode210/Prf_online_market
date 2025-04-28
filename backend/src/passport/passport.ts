import {PassportStatic} from "passport";
import {Strategy} from 'passport-local'
import {User} from '../model/User'

export const configurePassport = (passport: PassportStatic): PassportStatic =>
{

	passport.serializeUser((user: Express.User, done) => {
		console.log("Felhasználó szérializálva")
		done(null, user);
	})

	passport.deserializeUser((user: Express.User, done) => {
		console.log("Felhasználó nincs szérializálva már")
		done(null, user);
	})

	passport.use('local', new Strategy(async (username, password, done) =>
	{
		const user = await User.findOne({username: username});
		if(!user){
			return done("Helytelen felhasználónév vagy jelszó");
		}
		user.comparePassword(password, (error, isMatch) => {
			if (error){
				done("Helytelen felhasználónév vagy jelszó");
			} else if (isMatch){
				done(null, user);
			} else{
				done("Helytelen jelszó");
			}
		});
	}))

	return passport
}