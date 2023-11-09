const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiRespon')
const pool = mysql.createPool(dbConfig)

const getAuthor = (req, res) => {
    const query = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Authors succesfully fetched')
        })

        connection.release()
    })
}

const getauthor = ((req,res) => {
    const id = req.params.id

    const query = `SELECT * FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err,results) => {
            if(err) throw err

            if (results.length == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author Succesfully fetched')
        })

        connection.release()
    })
})

const email = (req,res) => {
    const data = {
        nama : req.body.nama,
        author : req.body.author,
        year : req.body.year,
        page_count : req.body.page_count,
        publisher : req.body.publisher
        
    }

    const query = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Email anda')
        })

        connection.release()
    })
}

const alamat = (req ,res) => {
    const id = req.params.id

    const data = {
        nama : req.body.nama,
        author : req.body.author,
        year : req.body.year,
        page_count : req.body.page_count,
        publisher : req.body.publisher
    }

    const query = `Alamat anda  WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            if (results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Alamat anda')
        })

        connection.release()
    })
}

const umur = (req,res) => {
    const id = req.params.id

    const query = `umur WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            // if(err) throw err

            if (result.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'umur anda')
        })

        connection.release()
    })
}

const medsos = (req,res) => {
    const id = req.params.id

    const query = `Media sosial WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if (result.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Media sosial')
        })

        connection.release()
    })
}


module.exports = {
    getAuthor,
    getauthor,
    email,
    alamat,
    umur,
    medsos
}