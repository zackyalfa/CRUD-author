const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiRespon')
const pool = mysql.createPool(dbConfig)

const getBooks = (req, res) => {
    const query = "SELECT * FROM book"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Books succesfully fetched')
        })

        connection.release()
    })
}

const getBook = ((req,res) => {
    const id = req.params.id

    const query = `SELECT * FROM book WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err,results) => {
            if(err) throw err

            if (results.length == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Book Succesfully fetched')
        })

        connection.release()
    })
})

const addBook = (req,res) => {
    const data = {
        nama : req.body.nama,
        author : req.body.author,
        year : req.body.year,
        page_count : req.body.page_count,
        publisher : req.body.publisher
        
    }

    const query = 'INSERT INTO book SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'BOOK succesfully added')
        })

        connection.release()
    })
}

const updateBook = (req ,res) => {
    const id = req.params.id

    const data = {
        nama : req.body.nama,
        author : req.body.author,
        year : req.body.year,
        page_count : req.body.page_count,
        publisher : req.body.publisher
    }

    const query = `UPDATE book SET  WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            if (results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'BOOK succesfully UPDATED')
        })

        connection.release()
    })
}

const deletebook = (req,res) => {
    const id = req.params.id

    const query = `DELETE FROM books WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if (result.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'BOOK succesfully deleted')
        })

        connection.release()
    })
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deletebook
}