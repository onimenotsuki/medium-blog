import React, { Component } from 'react'

import Layout from '../components/layout'

const mediumLink = (username, uniqueSlug) => {
  const url = 'https://medium.com';
  const permalink = encodeURIComponent(uniqueSlug);

  return `${url}/${username}/${permalink}`;
}

class IndexPage extends Component {
  constructor() {
    super()

    this.state = {
      payload: {
        posts: [],
      },
    }
  }

  componentDidMount() {
    const username = 'edgar-talledos'

    fetch(`${process.env.API_URL}?username=${username}`)
      .then(res => res.json())
      .then(({ payload }) => this.setState({ payload }))
  }

  componentWillUnmount() {
    this.setState({ payload: { posts: [] } })
  }

  render() {
    const { payload: { posts } } = this.state;

    return (
      <Layout>
        {posts.map(post => (
          <div
            key={post.id}
            className="fl w-100 w-50-ns pa4"
          >
            <h1 className="f2 lh-title">{post.title}</h1>
            <p className="f3 lh-copy">{post.virtuals.subtitle}</p>
            <a
              className="link black dim"
              href={mediumLink('edgar-talledos', post.uniqueSlug)}
            >
              Leer más...
            </a>
          </div>
        ))}
      </Layout>
    )
  }
}

export default IndexPage
