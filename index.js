require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//Initialize express and bodyParser
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect (process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("Connection is established"));

/*
= = = = = GET = = = = = GET = = = = = GET = = = = = GET = = = = = GET = = = = =

|===========================================|
|             VIEW ALL BOOKS                |
|===========================================|
| Route        |  /                         |
| Description  |  Get all books             |
| Access       |  PUBLIC                    |
| Parameter    |  NONE                      |
| Methods      |  GET                       |
|===========================================|
*/
booky.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);       
});



/*
|===========================================|
|            VIEW SPECIFIC BOOK             |
|===========================================|
| Route        |  /is                       |
| Description  |  Get specific book on ISBN |
| Access       |  PUBLIC                    |
| Parameter    |  ISBN                      |
| Methods      |  GET                       |
|===========================================|
*/
booky.get("/is/:isbn", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    if (!getSpecificBook) {
        return res.json({error: `No Book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|===============================================|
|             VIEW SPECIFIC BOOK                |
|===============================================|
| Route        |  /c                            |
| Description  |  Get specific book on category |
| Access       |  PUBLIC                        |
| Parameter    |  category                      |
| Methods      |  GET                           |
|===============================================|
*/
booky.get("/c/:category", async(req, res) => {
    const getSpecificBook = await BookModel.find({category: req.params.category});

    if (!getSpecificBook) {
        return res.json({error: `No Book found for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|===============================================|
|              VIEW SPECIFIC BOOK               |
|===============================================|
| Route        |  /lang                         |
| Description  |  Get specific book on language |
| Access       |  PUBLIC                        |
| Parameter    |  language                      |
| Methods      |  GET                           |
|===============================================|
*/
booky.get("/lang/:language", async(req, res) => {
    const getSpecificBook = await BookModel.find({language: req.params.language});

    if (!getSpecificBook) {
        return res.json({error: `No Book found for the language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|=================================|
|        VIEW ALL AUTHORS         |
|=================================|
| Route        |  /authors        |
| Description  |  Get all authors |
| Access       |  PUBLIC          |
| Parameter    |  NONE            |
| Methods      |  GET             |
|=================================|
*/
booky.get("/authors", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);       
});



/*
|=================================================|
|             VIEW SPECIFIC AUTHOR                |
|=================================================|
| Route        |  /author                         |
| Description  |  Get specific author based on id |
| Access       |  PUBLIC                          |
| Parameter    |  id                              |
| Methods      |  GET                             |
|=================================================|
*/
booky.get("/author/:id", async(req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({id: req.params.id});

    if (!getSpecificAuthor) {
        return res.json({error: `No such author found with id ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});



/*
|================================================|
|             VIEW SPECIFIC AUTHOR               |
|================================================|
| Route        |  /author/book                   |
| Description  |  Get all authors based on books |
| Access       |  PUBLIC                         |
| Parameter    |  ISBN                           |
| Methods      |  GET                            |
|================================================|
*/
booky.get("/author/book/:isbn", async(req, res) => {
    const getSpecificAuthor = await AuthorModel.find({books: req.params.isbn});

    if (!getSpecificAuthor) {
        return res.json({error: `No author found for the book with isbn ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});



/*
|======================================|
|        VIEW ALL PUBLICATIONS         |
|======================================|
| Route        |  /publications        |
| Description  |  Get all publications |
| Access       |  PUBLIC               |
| Parameter    |  NONE                 |
| Methods      |  GET                  |
|======================================|
*/
booky.get("/publications", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);       
});



/*
|========================================================|
|              VIEW SPECIFIC PUBLICATION                 |
|========================================================|
| Route        |  /publication                           |
| Description  |  Get specific publication based on name |
| Access       |  PUBLIC                                 |
| Parameter    |  name                                   |
| Methods      |  GET                                    |
|========================================================|
*/
booky.get("/publication/:name", async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({name: req.params.name});

    if (!getSpecificPublication) {
        return res.json({error: `No such publication found for name ${req.params.name}`});    
    }
    return res.json({publication: getSpecificPublication});
});



/*
|========================================================|
|               VIEW SPECIFIC PUBLICATION                |
|========================================================|
| Route        |  /publication/book                      |
| Description  |  Get specific publication based on isbn |
| Access       |  PUBLIC                                 |
| Parameter    |  ISBN                                   |
| Methods      |  GET                                    |
|========================================================|
*/
booky.get("/publication/book/:isbn", async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});

    if (!getSpecificPublication) {
        return res.json({error: `No such publication found for isbn ${req.params.isbn}`});    
    }
    return res.json({publication: getSpecificPublication});
});



/*
= = = = = POST = = = = = POST = = = = = POST = = = = = POST = = = = = POST = = = = =

|==============================|
|         ADD NEW BOOK         |
|==============================|
| Route        |  /book/new    |
| Description  |  Add new book |
| Access       |  PUBLIC       |
| Parameter    |  NONE         |
| Methods      |  POST         |
|==============================|
*/
booky.post("/book/new", async(req, res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    });
});



/*
|================================|
|        ADD NEW AUTHOR          |
|================================|
| Route        |  /author/new    |
| Description  |  Add new author |
| Access       |  PUBLIC         |
| Parameter    |  NONE           |
| Methods      |  POST           |
|================================|
*/
booky.post("/author/new", async(req, res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        author: addNewAuthor,
        message: "Author was added !!!"
    });
});



/*
|=====================================|
|         ADD NEW PUBLICATION         |
|=====================================|
| Route        |  /publication/new    |
| Description  |  Add new publication |
| Access       |  PUBLIC              |
| Parameter    |  NONE                |
| Methods      |  POST                |
|=====================================|
*/
booky.post("/publication/new", async(req, res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        publication : addNewPublication,
        message: "Publication was added !!!"
    });
});



/*
= = = = = PUT = = = = = PUT = = = = = PUT = = = = = PUT = = = = = PUT = = = = =

|====================================|
|        UPDATE EXISTING BOOK        |
|====================================|
| Route       |  /book/update        |
| Description |  Update book on ISBN |
| Access      |  PUBLIC              |
| Parameter   |  ISBN                |
| Methods     |  PUT                 |
|====================================|
*/
booky.put("/book/update/:isbn", async(req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {ISBN: req.params.isbn},      //finds book having specific ISBN
        {title: req.body.bookTitle},  //updates title of book
        {new: true}                   //displays data on frontend i.e. MongoDB, Postman
    );
    return res.json({books: updatedBook});
});


/*
|========================================|
|     UPDATE EXISTING BOOK / AUTHOR      |
|========================================|
| Route       |  /book/author/update     |
| Description |  Update / Add new author |
| Access      |  PUBLIC                  |
| Parameter   |  ISBN                    |
| Methods     |  PUT                     |
|========================================|
*/
booky.put("/book/author/update/:isbn", async(req, res) => {
    //Update Book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {ISBN: req.params.isbn},                    //finds book having specific ISBN
        {$addToSet: {authors: req.body.newAuthor}}, //updates author in book database (no matter if we click "SEND" button twice)
        {new: true}                                 //displays data on frontend i.e. MongoDB, Postman
    );

    //Update Author Database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {id: req.body.newAuthor},              //finds author having specific id
        {$addToSet: {books: req.params.isbn}}, //updates book in author database (no matter if we click "SEND" button twice)
        {new: true}                            //displays data on frontend i.e. MongoDB, Postman
    );
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "New author was added"
    });
});

/*
|=============================================|
|     UPDATE EXISTING BOOK / PUBLICATION      |
|=============================================|
| Route       |  /book/publication/update     |
| Description |  Update / Add new publication |
| Access      |  PUBLIC                       |
| Parameter   |  ISBN                         |
| Methods     |  PUT                          |
|=============================================|
*/
booky.put("/book/publication/update/:isbn", async(req, res) => {
    //Update Book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {ISBN: req.params.isbn},                              //finds book having specific ISBN
        {$addToSet: {publications: req.body.newPublication}}, //updates publication in book database (no matter if we click "SEND" button twice)
        {new: true}                                           //displays data on frontend i.e. MongoDB, Postman
    );

    //Update Publication Database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {id: req.body.newPublication},         //finds author having specific id
        {$addToSet: {books: req.params.isbn}}, //updates book in publication database (no matter if we click "SEND" button twice)
        {new: true}                            //displays data on frontend i.e. MongoDB, Postman
    );
    return res.json({
        books: updatedBook,
        authors: updatedPublication,
        message: "New publication was added"
    });
});



/*
= = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = =

|===============================|
|         DELETE BOOK           |
|===============================|
| Route       |  /book/delete   |
| Description |  Delete a book  |
| Access      |  PUBLIC         |
| Parameter   |  ISBN           |
| Methods     |  DELETE         |
|===============================|
*/
booky.delete("/book/delete/:isbn", async(req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});
    return res.json({books: updatedBookDatabase});
});



/*
|===============================|
|        DELETE AUTHOR          |
|===============================|
| Route       |  /author/delete |
| Description |  Delete author  |
| Access      |  PUBLIC         |
| Parameter   |  ISBN           |
| Methods     |  DELETE         |
|===============================|
*/
booky.delete("/author/delete/:id", async(req, res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.id});
    return res.json({authors: updatedAuthorDatabase});
});



/*
|=======================================================|
|                 DELETE BOOK / AUTHOR                  |
|=======================================================|
| Route       |  /book/delete/author                    |
| Description |  Delete author from book and vice versa |
| Access      |  PUBLIC                                 |
| Parameter   |  ISBN, authorId                         |
| Methods     |  DELETE                                 |
|=======================================================|
*/
booky.delete("/book/author/delete/:isbn/:authorId", async(req, res) => {
    //Update Book database
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});

    //Update Author database
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.authorId});

    return res.json({
        books: updatedBookDatabase,
        authors: updatedAuthorDatabase,
        message: "Book & Author is deleted !!!"
    });
});

booky.listen(3000, () => {
    console.log("Server is up & running");
});