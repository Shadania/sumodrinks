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
        state: state(),
        gamer_info: gamer_info
    }
    console.log('game state')
    res.status(200).json(gameData)
})

const states = ['wait','bet','watch','result']
var state_id = 0
var gamer_res = {}
var gamer_info = {}

function state() {
    return states[state_id]
}

app.post('/joinGame', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    gamerName = req.body.name

    if (gamerName in gamer_res) {
        console.log('gamer already present: ', gamerName)
        res.status(400).json({msg: 'already present'})
    }
    else {
        gamer_res[gamerName] = null
        console.log(req.body)
        console.log(`New gamer: ${gamerName}`)
        gamer_info[gamerName] = {
            bet: null,
            drinks: 0,
            correct: 0
        }
        res.status(200).json({msg: 'ok'})

        updateGamers()
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

    gamer_res[gamerName] = res

    gameData = {
        state: state(),
        gamer_info: gamer_info
    }
    res.write(`data: ${JSON.stringify(gameData)}`)
    res.write('\n\n')
})

function updateGamers() {
    gameData = {
        state: state(),
        gamer_info: gamer_info
    }

    // how to detect clients having closed?
    Object.values(gamer_res).forEach(res => {
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
    // state = req.body.state
    state_id += 1
    if (state_id >= states.length)
        state_id -= states.length

    updateGamers()
    res.status(200).json({'msg': "ok"})
})

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}.`)
})