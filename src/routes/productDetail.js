const ProductDetail = require('../models/product.detail.model');
const express = require('express')
const router = express.Router()

// Create a new customer
// POST localhost:3000/customer
router.post('/productdetail', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  if(!req.body.customerEmail) {
    // ...
  }

  // let user = {
  //   name: 'firstname lastname',
  //   email: 'email@gmail.com'
  // }

  const model = new ProductDetail(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// GET
router.get('/productdetail', (req, res) => {
  if(!req.query.productDtlCode) {
    return res.status(400).send('Missing URL parameter: productDtlCode')
  }

  ProductDetail.findOne({
    productDtlCode: req.query.productDtlCode
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// GET ALL
router.get('/productdetails', (req, res) => {
    ProductDetail.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  
// UPDATE
router.put('/productdetail', (req, res) => {
  if(!req.query.productDtlCode) {
    return res.status(400).send('Missing URL parameter: productDtlCode')
  }

  ProductDetail.findOneAndUpdate({
    productDtlCode: req.query.productDtlCode
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// DELETE
router.delete('/productdetail', (req, res) => {
  if(!req.query.productDtlCode) {
    return res.status(400).send('Missing URL parameter: productDtlCode')
  }

  ProductDetail.findOneAndRemove({
    productDtlCode: req.query.productDtlCode
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router