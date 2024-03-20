const express = require('express')
const app = express()
const cors = require('cors')
const Order = require('./models/order')
const { connectDB } = require('./connection/mongoose')

app.use(cors())
app.use(express.json())
connectDB()

const products = [
  // {
  //   key: 1,
  //   name: 'Sushil Yadav',
  //   degree: 'M.B.B.S, M.D., DM',
  //   speciality: 'Cardiologist',
  // },
  {
    key: 1,
    id: 'p1',
    name: 'Set of 7 diyas',
    mrp: '120',
    review: '4.5',
    dr: '99', //dr - discounted rate,
    mediaLinks: [
      'https://i.pinimg.com/564x/17/5b/d3/175bd3ab640d73631dd17d7a7e1ad508.jpg',
      'https://i.pinimg.com/564x/17/5b/d3/175bd3ab640d73631dd17d7a7e1ad508.jpg',
      'https://i.pinimg.com/564x/17/5b/d3/175bd3ab640d73631dd17d7a7e1ad508.jpg',
      'https://i.pinimg.com/736x/ef/d1/d8/efd1d893bd4ac81c03d97eaed5458bbf.jpg',
    ],
    description:
      '"Ghumakkad" is your passport to the enchanting world of India\'s cultural wonders and diverse attractions. Our app serves as a comprehensive guide, offering a treasure trove of information on the country\'s most captivating sites. From the grandeur of majestic forts and palaces to the bustling energy of vibrant markets and the tranquility of serene temples, "Ghumakkad" showcases the essence of India\'s rich heritage.',
    featured: true,
  },
  {
    key: 2,
    id: 'p2',
    name: 'Set of 11 diyas',
    mrp: '170',
    dr: '139', //dr - discounted rate,
    review: '4.5',

    mediaLinks: [
      'https://i.pinimg.com/564x/17/5b/d3/175bd3ab640d73631dd17d7a7e1ad508.jpg',
    ],
    description:
      '"Ghumakkad" is your passport to the enchanting world of India\'s cultural wonders and diverse attractions. Our app serves as a comprehensive guide, offering a treasure trove of information on the country\'s most captivating sites. From the grandeur of majestic forts and palaces to the bustling energy of vibrant markets and the tranquility of serene temples, "Ghumakkad" showcases the essence of India\'s rich heritage.',
    featured: true,
  },
  {
    key: 3,
    id: 'p3',
    name: 'Set of 21 diyas',
    mrp: '170',
    dr: '139', //dr - discounted rate,
    review: '4.5',
    mediaLinks: [
      'https://i.pinimg.com/564x/17/5b/d3/175bd3ab640d73631dd17d7a7e1ad508.jpg',
    ],
    description:
      '"Ghumakkad" is your passport to the enchanting world of India\'s cultural wonders and diverse attractions. Our app serves as a comprehensive guide, offering a treasure trove of information on the country\'s most captivating sites. From the grandeur of majestic forts and palaces to the bustling energy of vibrant markets and the tranquility of serene temples, "Ghumakkad" showcases the essence of India\'s rich heritage.',
    featured: false,
  },
]

app.get('/products', async (req, res) => {
  res.send(products)
})
app.get('/product', async (req, res) => {
  console.log(req.query.id)
  const filter = products.filter((item) => {
    return item.id === req.query.id
  })[0]
  res.send(filter)
})
app.post('/order', async (req, res) => {
  console.log('askdf;ak')
  console.log(req.body)
  const inputData = { ...req.body }
  console.log(req.body)
  Order.createData(inputData)
    .then((data) => {
      console.log('New order placed:', data)
      res.status(201).send('New order successfully')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

app.listen(4000, () => console.log('server started'))
