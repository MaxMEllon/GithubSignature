class Signature extends React.Component
  render: ->
    <div className="signature">
      <ColorBoxList data={@props.data} />
      <DataList data={@props.data} />
      <Avatar url={@props.data.avatar_url} />
    </div>

class ColorBoxList extends React.Component
  render: ->
    stars = githubStars(@props.data.login)
    <div className="sig-color-box-list">
      <ColorBox type="followers" num={@props.data.followers} />
      <ColorBox type="following" num={@props.data.following} />
      <ColorBox type="repos" num={@props.data.public_repos} />
      <ColorBox type="stars" num={stars} />
    </div>

class ColorBox extends React.Component
  @defaultProps:
    style:
      fontSize: '10px'
      followers:
        backgroundColor: '#e51400'
      following:
        backgroundColor: '#008a00'
      repos:
        backgroundColor: '#0050ef'
      gists:
        backgroundColor: '#f0a30a'

  render: ->
    switch @props.type
      when "following"
        style = @props.style.following
      when "followers"
        style = @props.style.followers
      when "repos"
        style = @props.style.repos
      when "stars"
        style = @props.style.gists
    <div className="sig-color-box" style={style}>
      <div style={@props.style}>{@props.type}</div>
      <div className="sig-color-box-num">{@props.num}</div>
    </div>

class DataList extends React.Component
  constructor: (props) ->
    super props
    if props.data.name.length >= 16
      @state =
        style:
          marginTop: '7px'
          fontSize: '14px'
          height: '22px'
    else
      @state =
        style:
          fontSize: '20px'

  render: ->
    <div className="sig-container">
      <div style={@state.style} className="sig-text sig-user-name">{@props.data.name}</div>
      <div className="sig-text sig-company">company : {@props.data.company}</div>
      <div className="sig-text sig-location">location : {@props.data.location}</div>
      <div className="sig-text sig-blog">blog : {@props.data.blog}</div>
      <div className="sig-text sig-last-push">last update : {@props.data.updated_at}</div>
    </div>

class Avatar extends React.Component
  render: ->
    <div>
      <img className="sig-avatar" src={@props.url} />
    </div>

class @GithubApi
  server: 'https://api.github.com'
  userPath: '/users/'

  constructor: ->

  @AjaxCall: (url, option = null) ->
    option = {} unless option?
    option.type = 'GET' unless option.type?
    option.params = {} unless option.params?

    $.ajax
      type: option.type
      url: url
      beforeSend: ->
        option.before() if option.before?
      success: (result, type)->
        option.callback(result) if option.callback?
      error: (XMLHttpRequest, textStatus, errorThrown)->
        console.error(textStatus + " : " + errorThrown)

  getUserData: (name, before, callback) ->
    url = @server + @userPath + name
    GithubApi.AjaxCall url, option =
      type: 'GET'
      before: before
      callback: callback

class @GithubSignature
  constructor: ->
    @before = ->
      $('#github-signature').html("loading signature...")
    @callback = (d) ->
      React.render <Signature data={d} />, document.getElementById('github-signature')

  drawUserSignature: (name)->
    return new GithubApi().getUserData(name, @before, @callback)

