import React from 'react'
import marked from 'marked'
import $ from 'jquery'

export class CommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  loadCommentsFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    }).then((data) => {
      this.setState({data: data});
    }).catch((xhr, status, err) => {
      console.error(this.props.url, status, err.toString());
    })
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(comment),
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
  }

  // アロー関数を用いることで、シンプル且つthisをbindすることが出来る
  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(() => this.loadCommentsFromServer(), this.props.pollInterval)
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={(comment) => this.handleCommentSubmit(comment)} />
      </div>
    )
  }
}

export class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment key={comment.author} author={comment.author}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
}

export class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    let author = this.author.value.trim()
    let text = this.text.value.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({author: author, text: text})

    this.author.value = '';
    this.text.value = '';
    return
  }

  constructor(refs) {
    super(refs)
  }

  render() {
    return (
      <form className="commentForm" onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" placeholder="Your name" ref={(input) => this.author = input} />
        <input type="text" placeholder="Say something..." ref={(input) => this.text = input} />
        <input type="submit" placeholder="Post" />
      </form>
    )
  }
}

export class Comment extends React.Component {
  render() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true })
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    )
  }
}
