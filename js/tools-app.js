class XYPair extends React.Component {
    render() {
        return (
            <div className="ratio__xypair">
                <input type="number" name="valueX" />
                :
                <input type="number" name="valueY" />
            </div>
        );
    }
}

class Ratio extends React.Component {

    constructor() {
        super();
    }

    calculate = () => {
        let left = this._left;
        let right = this._right;
    }

    render() {
        return (
            <div className="ratio">
                <XYPair ref={ xy => this._left = xy } />
                =
                <XYPair ref={ xy => this._right = xy } />
                <button onClick={this.calculate}>Calculate</button>
            </div>
        );
    }

}

ReactDOM.render(
    <Ratio />,
    document.getElementById('tools')
);