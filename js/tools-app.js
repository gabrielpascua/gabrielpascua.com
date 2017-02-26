class XYPair extends React.Component {
    render() {
        return (
            <div className="ratio__xypair">
                <input type="number" name="value_x" value={this.props.vals.x} onChange={this.props.handleChange} />
                <hr />
                <input type="number" name="value_y" value={this.props.vals.y} onChange={this.props.handleChange} />
            </div>
        );
    }
}

class Ratio extends React.Component {

    constructor(props) {
        super(props);        
        this._defaultState = {
            left: { x: '', y: '' },
            right: { x: '', y: '' }
        };
        this.state = this._defaultState;
    }

    _applyState(box, value) {
        if (box === 'left_x') {
            this.setState({ left: { x: value, y: this.state.left.y } });
        } else if (box === 'left_y') {
            this.setState({ left: { x: this.state.left.x, y: value } });
        } else if (box === 'right_x') {
            this.setState({ right: { x: value, y: this.state.right.y } });
        } else {
            this.setState({ right: { x: this.state.right.x, y: value } });
        }
    }

    calculate = () => {
        let lx = { key: 'left_x', value: this.state.left.x || 0 };
        let ly = { key: 'left_y', value: this.state.left.y || 0 };
        let rx = { key: 'right_x', value: this.state.right.x || 0 };
        let ry = { key: 'right_y', value: this.state.right.y || 0 };
        let missingValue = [lx, ly, rx, ry].filter(n => n.value === 0);
        if (missingValue.length === 1) {
            let eq1 = (lx.value || 1) * (ry.value || 1);
            let eq2 = (ly.value || 1) * (rx.value || 1);
            let answer = eq1 > eq2 ? (eq1 / eq2) : (eq2 / eq1);
            this._applyState(missingValue[0].key, answer);
        }
    }

    reset = () => {
        this.setState( this._defaultState );
    }

    handleChange(position, event) {
        let textBox = event.target;
        let box = textBox.name.split('_').pop();
        this._applyState(position + '_' + box, textBox.value);
    }

    render() {
        return (
            <div className="ratio">
                <XYPair vals={this.state.left} handleChange={this.handleChange.bind(this, 'left')} />
                <div className="ratio__separator">:</div>
                <XYPair vals={this.state.right} handleChange={this.handleChange.bind(this, 'right')} />
                <br />                
                <button onClick={this.calculate}>Calculate</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }

}

ReactDOM.render(
    <Ratio />,
    document.getElementById('tools')
);