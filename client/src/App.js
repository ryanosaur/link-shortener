import React, { Component } from 'react';
import rp from 'request-promise';
import './App.css';

class App extends Component {
  state = {
    url: '',
    hash: ''
  };

  componentWillMount() {
    const { pathname } = window.location;
    if (pathname !== '/') {
      const hash = pathname.replace('/', '');
      this.queryLink(hash).then(({ url }) => {
        if (url) {
          window.location = url.includes('http://') ? url : `http://${url}`;
        }
      })
      .catch(console.log)
    }
    console.log(window.location);
  }

  handleShorten = (e) => {
    e.preventDefault();
    this.createLink()
      .then(({ hash }) => this.setState({ hash }))
      .catch(console.log);
  }

  handleInputChange = (event) => {
    const { value: url } = event.target;
    this.setState({ url });
  }

  createLink = async () => {
    const { url } = this.state;
    const { origin } = window.location;
    return await rp({
      method: 'POST',
      uri: `${origin}/shortlink`,
      body: { url },
      json: true
    });
  };

  queryLink = async (hash) => {
    const { origin } = window.location;
    return await rp({
      method: 'GET',
      uri: `${origin}/${hash}`,
      json: true
    });
  };

  renderLinkDisplay = (hash) => {
    const link = `${window.location.origin}/${hash}`;
    return (
      <div className="app-link-wrap">
        <a className="app-link" href={link}>{ link }</a>
      </div>
    )
  }

  render() {
    const { url, hash } = this.state;
    return (
      <div className="app-view-wrap">
        <h1>Link Shortening Service!</h1>
        <form className="app-input-wrap" onSubmit={this.handleShorten}>
          <input className="app-input" value={url} onChange={this.handleInputChange} />
          <button type="button" className="app-button" onClick={this.handleShorten}>
            Shorten
          </button>
        </form>
        { hash && this.renderLinkDisplay(hash) }
      </div>
    );
  }
}

export default App;
