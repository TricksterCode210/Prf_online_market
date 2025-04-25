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

	passport.use('local', new Strategy((username, password, done) =>
	{
		const query = User.findOne({username: username});
		query.then(user => {
			if(user)
			{
				user.comparePassword(password, (err, _) => {
					if(err) {
						done('Helytelen jelszó')
					}
					else {
						done(null, user);
					}
				})
			} else {
				done(null, undefined);
			}
		}).catch(error => {
			done(error);
		})
	}))

	return passport
}