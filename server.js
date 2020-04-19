'use strict';

const express = require('express');
const morgan = require('morgan');

const { top50 } = require('./data/top50');
const { books } = require('./data/books');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => { // 1.1
  res.render('pages/top50', {
    title: 'Top 50 Songs Streamed on Spotify', // 1.1
    topSong: top50, //1.2
  });
});

// 1.6
app.get('/top50/song/:rank', (req, res) => {
  // req.params contains route parameters, in this case :rank
  // req.query contains the URL query parameters (after the ? in the URL)
  const rank = req.params.rank - 1;
  if (top50[rank]) {
    res.render('pages/songPage', {
      title: `Song #${top50[rank].rank}`,
      song: top50[rank],
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl
    });
  }
})

app.get("/books", (req, res) => {
  res.render('pages/books', {
    title: 'Books',
    books: books
  });
});

app.get("/book/id/:id", (req, res) => {
  const bookId = req.params.id;

  books.forEach(book => {
    console.log(book);
    if (book.id == bookId) {
      res.render('pages/bookPage', {
        title: `Book: ${book.title}`,
        book: book,
      });
    } else {
      res.status(404);
      res.render('pages/fourOhFour', {
        title: "I got nothing",
        path: req.originalUrl,
      });
    }
  })
})

app.get('book/type/:type', (req, res) => {
  const type = req.params.type;

  books.forEach(book => {
    if (book.type == type) {
      res.render('pages/bookType',{
        books: books
      })
    }
  })
});
// handle 404s
app.get('*', (req, res) => {
  res.status(404);
  res.render('pages/fourOhFour', {
    title: 'I got nothing',
    path: req.originalUrl
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));