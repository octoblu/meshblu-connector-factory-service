import React, { Component, PropTypes } from 'react';

import {
  Page,
  PageHeader,
  Spinner,
  ErrorState,
  Button,
} from 'zooid-ui';

import FaApple from 'react-icons/lib/fa/apple';
import FaWindows from 'react-icons/lib/fa/windows';
import FaLinux from 'react-icons/lib/fa/linux';

import {
  getInstallerUri,
  getFileName,
  getDownloadUri,
} from '../../helpers/installer'

import './Download.css';

export default class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    const { otp } = this.props;
    if(!otp) {
      this.setState({ error: new Error('Invalid Key') })
    }
    this.setState({ loading: false });
  }

  download(platform) {
    const { otp } = this.props;
    return () => {
      this.setState({ loading: true });
      const uri = getInstallerUri({ platform });
      const fileName = getFileName({ otp, platform });
      const link = document.createElement('a');
      link.download = fileName;
      link.href = getDownloadUri({ uri, fileName });
      link.click();
    }
  }

  renderContent(content) {
    const { connector } = this.props;
    return (
      <div>
        {content}
      </div>
    );
  }

  render() {
    const {
      error,
      loading,
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }
    if (loading) {
      return this.renderContent(
        <div>
          <Spinner size="large" />
          <h1>Downloading...</h1>
        </div>
      );
    }
    return this.renderContent(
      <div>
        <Button onClick={this.download('darwin-amd64')}>Download <FaApple /></Button>
        <Button onClick={this.download('windows-amd64')}>Download <FaWindows /> 64bit</Button>
        <Button onClick={this.download('windows-386')}>Download <FaWindows /> 32bit</Button>
        <Button onClick={this.download('linux-amd64')}>Download <FaLinux /> 64bit</Button>
        <Button onClick={this.download('linux-386')}>Download <FaLinux /> 32bit</Button>
      </div>
    );
  }
}

Download.propTypes = {
  otp: PropTypes.string.isRequired
};
