import React, {useState} from "react";

import Start from './state/start.js'
import GameState from './GameState.js'

export default function App() {

    const [status, setStatus] = useState('input')
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const start = (name, url) => {
        console.log(name + ", " + url)

        const fetchData = async () => {
            await fetch(`${url}:8000/joinGame`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({name: name})
            }).then(() => {
                // todo start gamestate
                setName(name)
                setUrl(url)
                setStatus('game')
            }).catch(err => {
                console.log(err)
                setStatus('error')
            })
        }
        fetchData()
        setStatus('loading')
    }

    const renderState = () => {
        console.log('app state ', status)
        switch(status) {
            case 'input':
                return (
                    <Start change={start} />
                )
            case 'loading':
                return (
                    <div>
                        loading, please hold
                    </div>
                )
            case 'error':
                return (
                    <div>
                        shit went wrong, oops, perhaps f5
                    </div>
                )
            case 'game':
                return (
                    <div>
                        <h3>Game Time</h3>
                        <p>You are {name}, participating in the game at {url}</p>
                        <GameState playerName={name} url={url} />
                    </div>
                )
            default:
                return (
                    <div>bad state</div>
                )
        }
    }

    return (
        <div>
            <h1>Sumo Drinking Game</h1>
            { renderState() }
        </div>
    )
}