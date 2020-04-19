"use strict";
const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");
const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// 2.1
app.get('/books', (req, res) => {
  res.render("pages/books", {
    title: "Books included for the exercise",
    books1: books,
  });
});

// endpoints here
//1.4
app.get("/", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    topSong: top50,
  });
});

//1.5
// app.get("/popular-artist", (req, res) => {
//   res.render("pages/popular-artist", {
//     title: "Hello",
//     topSong: top50
//   });
// });
app.get("/top50/popular-artist", (req, res) => {
  const artists = [];
  const artistCount = {};
  top50.forEach(song => {
    if (!artists.includes(song.artist)) {
      artists.push(song.artist);
    }
  });
  artists.forEach(artist => {
    let count = 0;
    top50.forEach(song => {
      if (song.artist === artist) count += 1;
    });
    artistCount[artist] = count;
  });

  const rankedArtists = [];
  Object.values(artistCount).forEach((count, id) => {
    const artist = Object.keys(artistCount)[id];
    rankedArtists.push({
      artist: artist,
      count: count
    });
  });
  const mostPopularArtist = rankedArtists.sort((a, b) =>
    a.count < b.count ? 1 : -1
  )[0].artist;

  res.render("./pages/popular-artist.ejs", {
    title: "Most Popular Artist",
    songs: top50.filter(song => song.artist === mostPopularArtist)
  });
});

// 1.6
app.get("/top50/song/:number", (req, res) => {
  const number = req.params.number - 1;
  if (1 <= number <= 50) {
    res.render("pages/songPage", {
      title: `Song #${top50[number].rank}`,
      song: top50[number]
    });
  } else {
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl
    });
  }
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
