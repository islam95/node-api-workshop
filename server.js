const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// before our routes definition
app.use(bodyParser.json()); 
app.use(cors());

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Rock",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  }
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// GET /albums - should return all the albums
app.get("/albums", (req, res) => {
  const genre = req.query.genre;
  const filteredAlbums = albumsData.filter(album => album.primaryGenreName === genre);
  res.send(filteredAlbums);
});

// GET /albums/:albumId - should return a single album
app.get("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const album = albumsData.find(album => album.albumId === albumId);
  if (!album) {
    res.sendStatus(404);
  } else {
    res.send(album);
  }
});

// POST /albums - should save a new album
app.post("/albums", (req, res) => {
  //console.log(req.body);
  albumsData.push(req.body);
  res.sendStatus(201);
});

// PUT /albums/:albumId - should update the album
app.put("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const album = albumsData.find(album => album.albumId === albumId);
  album.artistName = "New artist";
  res.sendStatus(200);
})

// DELETE /albums/:albumId - should delete the album
app.delete("/albums/:albumId", (req, res) => {
  const index = albumsData.findIndex(album => album.albumId === req.params.albumId);
  albumsData.splice(index, 1);
  res.sendStatus(200);
})

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
