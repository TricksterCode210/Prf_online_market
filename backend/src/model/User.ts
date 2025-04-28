import mongoose, {Schema, Document, Model} from 'mongoose'
import bcrypt from 'bcrypt';
const SALT_FACTOR = 10;

interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    userRole: string;
    address: string;
    name: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    userRole: {type: String, required: true},
    address: {type: String, required: false},
    name: {type: String, required: false},
})

UserSchema.pre<IUser>('save', function(next) {
	const user = this;

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if(err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
            callback(err, false)
        }
        callback(null, isMatch);
    })
}

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);