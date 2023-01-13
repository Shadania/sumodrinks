import React from "react"

export default class Start extends React.Component {
    constructor(props) {
        super(props)
        this.parentChange = props.change
        this.state = {
            name: '',
            url: ''
        }
    }

    onSubmit = () => {
        this.parentChange(this.state.name, this.state.url)
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
            url: this.state.url
        })
    }
    handleURLchange = (event) => {
        this.setState({
            name: this.state.name,
            url: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Join A Game</h3>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Game URL:
                        <input type="text" value={this.state.url} onChange={this.handleURLchange} />
                    </label>
                    <input type="submit" value="Join Game" />
                </form>
            </div>
        )
    }
}