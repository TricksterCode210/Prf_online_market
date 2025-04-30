import {NextFunction, Request, Response, Router} from 'express'
import {PassportStatic} from 'passport'
import {User} from '../model/User'
import {Product} from '../model/Product'
import multer from 'multer'
import path from 'path'
import {Order} from '../model/Order'
import {Shipping} from '../model/Shipping'
import * as fs from 'node:fs'

export const configureRoutes = (passport: PassportStatic, router: Router): Router =>
{
	router.post('/login', (req: Request, res: Response, next: NextFunction) =>
	{
		passport.authenticate('local', (error: string | null, user: typeof User) =>
		{
			if (error)
			{
				res.status(500).send(error)
			} else
			{
				if (!user)
				{
					res.status(400).send('A felhasználló nem található')
				} else
				{
					req.login(user, (err: string | null) =>
					{
						if (err)
						{
							console.log(err)
							res.status(500).send('Internal Server Error: ' + err)
						} else
						{
							res.status(200).send(user)
						}
					})
				}
			}
		})(req, res, next)
	})

	router.post('/register', (req: Request, res: Response) =>
	{
		const email = req.body.email
		const password = req.body.password
		const username = req.body.username
		const userRole = req.body.userRole
		const address = req.body.address
		const name = req.body.name
		const user = new User({email: email, password: password, username: username, userRole: userRole, address: address, name: name})

		user.save().then(data =>
		{
			res.status(200).send(data)
		}).catch(error =>
		{
			console.log(error)
			res.status(500).send(error)
		})
	})

	const storage = multer.diskStorage({
		destination: function (req, file, cb)
		{
			cb(null, 'uploads/') // ide menti a képeket
		},
		filename: function (req, file, cb)
		{
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, uniqueSuffix + path.extname(file.originalname)) // pl: 12345678.jpg
		}
	})

	const upload = multer({storage: storage})

	router.post('/sell', upload.single('imageSrc'), (req: Request, res: Response) =>
	{
		try
		{
			if (req.isAuthenticated())
			{
				const name = req.body.name
				const price = req.body.price
				const description = req.body.description
				const imageSrc = req.file?.path
				const username = req.body.username
				const state = req.body.state
				const product = new Product({name: name, price: price, description: description, imageSrc: imageSrc, username: username, state: state})

				product.save().then(data =>
				{
					res.status(200).send(data)
				}).catch(error =>
				{
					res.status(500).send('Sikertelen feltöltés: ' + error)
				})
			} else
			{
				res.status(500).send('Felhasználó nincs bejelentkezve')
			}
		}
		catch (err)
		{
			console.error(err)
			res.status(500).send({message: 'Error saving product'})
		}
	})

	router.patch('/update/:id', upload.single('imageSrc'), (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const productId = req.params.id
			const name = req.body.name
			const price = req.body.price
			const description = req.body.description
			const imageSrc = req.file?.path
			const username = req.body.username

			Product.findById(productId).then(
				data =>
				{
					if (data?.imageSrc)
					{
						fs.unlink(data.imageSrc, (err) =>
						{
							if (err)
							{
								console.error('Sikertelen törlése: ' + err)
							} else
							{
								console.log('Sikeres törlés')
							}
						})
					}
				}
			)

			Product.updateOne({_id: productId},
				{
					name: name,
					price: price,
					description: description,
					imageSrc: imageSrc,
					username: username
				}).then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				res.status(500).send('Sikertelen módosítás: ' + error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.post('/logout', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			req.logout((error) =>
			{
				if (error)
				{
					console.log(error)
					res.status(500).send('Internall Server Error')
				}
				res.status(200).send('Sikeresen kilépett')
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.get('/getAllUsers', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const query = User.find()
			query.then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				console.log(error)
				res.status(500).send(error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.get('/getAllOrders', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const query = Order.find()
			query.then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				console.log(error)
				res.status(500).send(error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.get('/getAllActiveProducts', (req: Request, res: Response) =>
	{
		const query = Product.find({state: 'ACTIVE'})
		query.then(data =>
		{
			res.status(200).send(data)
		}).catch(error =>
		{
			console.log(error)
			res.status(500).send(error)
		})
	})

	router.get('/getAllProductsByUser/:username', (req: Request, res: Response) =>
	{
		const username = req.params.username
		const query = Product.find({username: username})
		query.then(data =>
		{
			res.status(200).send(data)
		}).catch(error =>
		{
			console.log(error)
			res.status(500).send(error)
		})
	})

	router.post('/makeOrder', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const buyerName = req.body.buyerName
			const sellerName = req.body.sellerName
			const productName = req.body.productName
			const price = req.body.price
			const shippingAddress = req.body.shippingAddress
			const imageSrc = req.body.imageSrc
			const productId = req.body.productId
			const order = new Order({buyerName: buyerName, productName: productName, price: price, shippingAddress: shippingAddress, imageSrc: imageSrc, sellerName: sellerName, productId: productId})
			order.save().then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				res.status(500).send('Sikertelen feltöltés: ' + error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.post('/shipping', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const from = req.body.from
			const to = req.body.to
			const buyer = req.body.buyer
			const seller = req.body.seller
			const arrivalFirst = req.body.arrivalFirst
			const arrivalLast = req.body.arrivalLast
			const productName = req.body.productName
			const shipping = new Shipping(
				{
					from: from,
					to: to,
					buyer: buyer,
					seller: seller,
					arrivalFirst: arrivalFirst,
					arrivalLast: arrivalLast,
					productName: productName
				})
			shipping.save().then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				res.status(500).send('Sikertelen feltöltés: ' + error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.get('/getAllShippingByUser/:username', (req: Request, res: Response) =>
	{
		const username = req.params.username
		const query = Shipping.find({buyer: username})
		query.then(data =>
		{
			res.status(200).send(data)
		}).catch(error =>
		{
			console.log(error)
			res.status(500).send(error)
		})
	})

	router.get('/getProduct/:id', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const productId = req.params.id
			const query = Product.findById(productId)
			query.then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				console.log(error)
				res.status(500).send(error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.patch('/changeState/:id', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const id = req.params.id
			const state = req.body.state
			Product.updateOne({_id: id}, {state: state}).then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				res.status(500).send('Sikertelen módosítás: ' + error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.delete('/deleteProduct/:id', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			const id = req.params.id
			Product.findById(id).then(
				data =>
				{
					if (data?.imageSrc)
					{
						fs.unlink(data.imageSrc, (err) =>
						{
							if (err)
							{
								console.error('Sikertelen törlése: ' + err)
							} else
							{
								console.log('Sikeres törlés')
							}
						})
					}
				}
			)

			const query = Product.findByIdAndDelete(id)
			query.then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				console.log(error)
				res.status(500).send(error)
			})
		} else
		{
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.delete('/deleteOrder/:id', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{

			const id = req.params.id
			const query = Order.findByIdAndDelete(id)
			query.then(data =>
			{
				res.status(200).send(data)
			}).catch(error =>
			{
				console.log(error)
				res.status(500).send(error)
			})
		}
		else {
			res.status(500).send('Felhasználó nincs bejelentkezve')
		}
	})

	router.get('/checkAuth', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			res.status(200).send(true)
		} else
		{
			res.status(500).send(false)
		}
	})

	router.get('/loggedInUser', (req: Request, res: Response) =>
	{
		if (req.isAuthenticated())
		{
			res.status(200).send(req.user)
		} else
		{
			res.status(500).send(null)
		}
	})

	return router
}

