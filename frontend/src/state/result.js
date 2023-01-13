import React from "react";

export default class Result extends React.Component {
    constructor(props) {
        super(props)
        console.log('getting results')
    }

    render() {
        return (
            <div>
                results go here!
            </div>
        )
    }
}