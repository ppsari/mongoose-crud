const mongoose = require('mongoose');
// const ObjectID = require("mongodb").ObjectID;
mongoose.connect('mongodb://localhost/library');
let Book = require('../models/books');


const listBook = (req,res) => {
  Book.find((err,books)=>{
    res.send(err? err : books);
  })
}

const findOneBook = (req,res) => {
  Book.findOne(
    // {_id: ObjectID(req.params.id)},
    {_id: (req.params.id)},
    (err,book)=>{
      res.send(err? err : book);
    }
  )
}

const updateBook = (req,res) => {
  Book.findOne(
    {_id: (req.params.id)},
    (err,book)=>{
      if (!err) {
        if (typeof req.body.title !== 'undefined' && req.body.title !=='') book.title = req.body.title;
        if (typeof req.body.author !== 'undefined' && req.body.author !=='') book.author = req.body.author;
        if (typeof req.body.category !== 'undefined' && req.body.category !=='') book.category  = req.body.category;
        if (typeof req.body.stock !== 'undefined' && req.body.stock !=='') book.stock = req.body.stock;
        if (typeof req.body.isbn !== 'undefined' && req.body.isbn !=='') book.isbn = req.body.isbn;
        book.save();
      }
    }
  )
}

const destroyBook = (req,res) => {
  Book.remove({_id: (req.params.id)}, (err,result) => {
    res.send(err? err : `Buku sudah dihapus` );
  })
}

const insertBook = (req,res) => {
  let book = {}
  if (typeof req.body.title !== 'undefined' && req.body.title !=='') book.title = req.body.title;
  if (typeof req.body.author !== 'undefined' && req.body.author !=='') book.author = req.body.author;
  if (typeof req.body.category !== 'undefined' && req.body.category !=='') book.category  = req.body.category;
  if (typeof req.body.stock !== 'undefined' && req.body.stock !=='') book.stock = req.body.stock;
  if (typeof req.body.isbn !== 'undefined' && req.body.isbn !=='') book.isbn = req.body.isbn;
  let newBook = new Book(book);
  newBook.save((err,newbook)=>{
    res.send(err? err : `${newbook.title} sudah dimasukan` );
  });
}

module.exports = {
  listBook,
  findOneBook,
  updateBook,
  destroyBook,
  insertBook
}