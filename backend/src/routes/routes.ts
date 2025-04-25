import {NextFunction, Request, Response, Router} from 'express'
import {MainClass} from '../main-class'
import {PassportStatic} from 'passport'
import {User} from '../model/User'
import {Product} from '../model/Product'

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {
    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass()
        res.status(200).send('Szoszi')
    })

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass()
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error)
                res.status(400).end()
            } else {
                res.write(result)
                res.status(200).end()
            }
        })
    })

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                res.status(500).send(error)
            } else {
                if (!user) {
                    res.status(400).send("A felhasználló nem található")
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send('Internal Server Error: ' + err);
                        } else {
                            res.status(200).send(user)
                        }
                    })
                }
            }
        })(req, res, next);
    })

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const seller = req.body.seller;
        const address = req.body.address;
        const name = req.body.name;
        const user = new User({email: email, password: password, username: username, seller: seller, address: address, name: name});

        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error)
        })
    })

    router.post('/sell', (req: Request, res: Response) => {
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        // const imageSrc = req.body.imageSrc
        const imageSrc = "https://th.bing.com/th/id/OIP.BmmdpuEUMVafIL_kvGfdsAHaFj?rs=1&pid=ImgDetMain";
        const product = new Product({name: name, price: price, description: description, imageSrc: imageSrc})

        product.save().then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(500).send("Sikertelen feltöltés: " + error)
        })
    })

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("Internall Server Error")
                }
                res.status(200).send("Sikeresen kilépett")
            })
        } else {
            res.status(500).send("User is not logged in");
        }
    })

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data)
            }).catch(error => {
                console.log(error)
                res.status(500).send(error)
            })
        } else {
            res.status(500).send("User is not logged in");
        }
    })

    router.get('/getAllProducts', (req: Request, res: Response) => {
        const query = Product.find();
        query.then(data => {
            res.status(200).send(data)
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
    })

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    })

    return router
}

