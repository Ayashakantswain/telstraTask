const express = require('express');
const cors = require('cors');
const app = express();
// const environment = require('./env');
app.use(express.text())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  ///if not worked you have to make it true
app.use(cors({ origin: true }));

app.use((err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).json({ status: 1, message: "put a valid request body" }); // Bad request
    }

    // next();
});

app.use(   // =>["this app.use for converting text/plain content-type to application/json content-type"]

    (req, res, next) => {
        req.body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        next()
    }

)


app.use('/api', require("./routes/routes"));



//404 request handeller
app.use((req, res, next) => {

    res.status(400).json({
        status: 1,
        message: "404 No routes found"
    })

})

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

