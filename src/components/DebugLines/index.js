import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';

const propTypes = {
  lines: PropTypes.array.isRequired
}

class DebugLines extends Component {
  constructor(props) {
    super(props)
    this.updateScroll = this.updateScroll.bind(this)
  }

  updateScroll() {
    const { thing } = this.refs;
    ReactDOM.findDOMNode(thing).scrollTop = thing.scrollHeight;
  }

  render() {
    const { lines } = this.props;
    const theLines = _.map(lines, (line, key) => {
      return <li key={key}>{line}</li>;
    });

    _.delay(() => {
      this.updateScroll();
    }, 50)

    return (
      <div className="DebugLines">
        <h3>Console:</h3>
        <div ref="thing" className="DebugLines--console">
          <ul>
            {theLines}
          </ul>
        </div>
      </div>
    );
  }
}

DebugLines.propTypes = propTypes

export default DebugLines
