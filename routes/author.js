const express = require('express')
const router = express.Router()
const {
    getAuthor,
    getauthor,
    email,
    alamat,
    umur,
    medsos,   
} = require('../controllers/AuthorController')


router.get('/', getAuthor)

router.get('/', getauthor)

router.post('/:id', email)

router.put('/:id', alamat)

router.get('/:id', umur)

router.get('/:id',medsos)

module.exports = router