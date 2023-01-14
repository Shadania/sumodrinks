// https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const express = require('express');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 8000


app.get('/gameState', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    gameData = {
        state: state,
        gamerNames: gamerNames
    }
    res.status(200).json(gameData)
})

var state = 'wait'
var gamers = {}
var gamerNames = []

app.post('/joinGame', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    gamerName = req.body.name

    if (gamerName in gamers) {
        res.status(400).json({msg: 'already present'})
    }
    else {
        gamers[gamerName] = null
        console.log(req.body)
        console.log(`New gamer: ${req.body.name}`)
        gamerNames.push(gamerName)
        res.status(200).json({msg: 'ok'})
    }
})

app.get('/listenGameInfo/:gamerName', function(req, res) {
    gamerName = req.params.gamerName

    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        'Access-Control-Allow-Origin': '*'
    });

    gamers[gamerName] = res
    gameData = {
        state: state,
        gamerNames: gamerNames
    }
    res.write(`data: ${JSON.stringify(gameData)}`)
    res.write('\n\n')
})

function updateGamers() {
    gameData = {
        state: state,
        gamerNames: gamerNames
    }

    // how to detect clients having closed?
    Object.values(gamers).forEach(res => {
        if (res) {
            res.write(
                `data: ${JSON.stringify(gameData)}`
            )
            res.write("\n\n")
        }
    })
}

app.post('/admin/setState', function(req, res) {
    res.set('Access-Control-Allow-Origin', 'localhost')
    state = req.body.state
    updateGamers()
    res.status(200).json({'msg': "ok"})
})

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}.`)
})