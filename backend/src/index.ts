import express from 'express'
import {configureRoutes} from './routes/routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import {configurePassport} from './passport/passport'
import * as mongoose from 'mongoose'
import cors from 'cors';
import path from 'path'

const app = express()
const port = 5000
const dbUrl = 'mongodb://root:password@localhost:6000/market?authSource=admin';

mongoose.connect(dbUrl).then((data) => {
	console.log("Sikeres csatlakozás a DB-hez")
}).catch(() =>{
	console.log("Sikertelen csatlakozás")
})

// FONTOS: Előbb a static serve
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const whitelist = ['http://localhost:4200']
const corsOptions = {
	origin: (origin: string | undefined, callback: (error: Error | null, allowed: boolean) => void) => {
		if(!origin || whitelist.indexOf(origin!) !== -1){
			callback(null, true)
		} else {
			callback(new Error('Nem engedélyezett'), false)
		}
	},
	credentials: true
}

app.use(cors(corsOptions))

//bodyparser
app.use(bodyParser.urlencoded({extended: true}))

//cookie-parser
app.use(cookieParser())

//session
const sessionOptions: expressSession.SessionOptions = {
	secret: 'online-market',
	resave: false,
	saveUninitialized: false
}
app.use(expressSession(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

configurePassport(passport)

//router
app.use('/', configureRoutes(passport, express.Router()))

app.listen(port, () =>
{
	console.log('Server is listening on port ' + port.toString())
})

console.log('After server is ready')