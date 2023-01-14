import React, {useState, useEffect} from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

import Wait from './state/wait.js'
import Bet from './state/bet.js'
import Watch from './state/watch.js'
import Result from './state/result.js'

export default function GameState(props) {
    const playerName = props.playerName
    const url = props.url

    const [status, setStatus] = useState('loading')
    const [gamer_info, setGamers] = useState({})

    const serverDataReceived = (event) => {
        console.log("Server data received:")
        const data = JSON.parse(event.data)
        console.log(data)
        setStatus(data.state)
        setGamers(data.gamer_info)
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchEventSource(`${url}:8000/listenGameInfo/${playerName}`, {
                mode: 'cors',
                headers: {
                    Accept: "text/event-stream"
                },
                method: "GET",
                onopen(res) {
                    if (res.ok && res.status === 200) {
                        console.log("Connection made", res)
                    }
                    else {
                        console.log("Client side error: ", res)
                    }
                },
                onmessage(event) {
                    serverDataReceived(event)
                },
                onclose() {
                    console.log("Connection closed by server")
                },
                onerror(err) {
                    console.log("Server encountered an error", err)
                },
            })
        }
        fetchData()
    })

    const renderGamers = () => {
        return (
            <div>
                gamers:
                <ul>
                    {Object.keys(gamer_info).map(gamer =>
                        <li key={gamer}>{gamer}</li>
                    )}
                </ul>
            </div>
        )
    }

    const renderState = () => {
        switch(status) {
            case 'loading':
                return (
                    <div>
                        please hold while we get data from the server
                    </div>
                )
            case 'wait':
                return (
                    <Wait />
                )
            case 'bet':
                return (
                    <Bet />
                )
            case 'watch':
                return (
                    <Watch />
                )
            case 'result':
                return (
                    <Result />
                )
            default:
                return (
                    <div>invalid state</div>
                )
        }
    }

    return (
        <div>
            {renderGamers()}
            {renderState()}
        </div>
    )
}