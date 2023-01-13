import React from "react";

import Start from './state/start.js'
import Game from './Game.js'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            started: false
        }
    }

    start = (name, url) => {
        console.log(name + ", " + url)
        this.setState({
            started: true,
            name: name,
            url: url
        })
    }

    renderState = () => {
        if (this.state.started) {
            return (
                <Game name={this.state.name} url={this.state.url} />
            )
        }
        else {
            return (
                <Start change={this.start} />
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Sumo Drinking Game</h1>
                { this.renderState() }
            </div>
        )
    }
}