Signature = React.createClass
  getDefaultProps: ->
    style:
      flame:
        fontFamily: 'meiryo'
        width: '300px'
        height: '75px'
        background: '#000'
      reps:
        float: 'left'
        width: '40px'
        height: '75px'
        background: '#44f'
        color: '#fff'
        title:
          fontSize: '5px'
          width: '0px'
          height: '0px'
          padding: '0px 0px 0px 5px'
        text:
          width: '0px'
          height: '0px'
          padding: '15px 0px 0px 10px'
      gists:
        float: 'left'
        width: '40px'
        height: '75px'
        background: '#280'
        color: '#fff'
        title:
          fontSize: '5px'
          width: '0px'
          height: '0px'
          padding: '0px 0px 0px 5px'
        text:
          padding: '15px 0px 0px 10px'
      head:
        fontSize: '5px'
        color: '#fff'
      name:
        color: '#fff'
        margin: '0px'
        fontSize: '18px'
      followers:
        padding: '0px 0px 0px 0px'
        color: '#fff'
        fontSize: '10px'
      following:
        padding: '0px 0px 0px 0px'
        color: '#fff'
        fontSize: '10px'
      img:
        float: 'right'
        height: '75px'

  render: ->
    flame = @props.style.flame
    name = @props.style.name
    reps = @props.style.reps
    gists = @props.style.gists
    followers = @props.style.followers
    following = @props.style.following
    img = @props.style.img
    head = @props.style.head
    <div>
      <div style={flame}>
        <div style={reps}>
          <p style={reps.title}>
            public repos
          </p>
          <p style={reps.text}>
            {@props.data.public_repos}
          </p>
        </div>
        <img style={img} src={@props.data.avatar_url} />
        <div style={gists}>
          <p style={gists.title}>
            public gists
          </p>
          <p style={gists.text}>
            {@props.data.public_gists}
          </p>
        </div>
        <div style={head}> github </div>
        <h2 style={name}>{@props.data.name}</h2>
        <div style={followers}>followers : {@props.data.followers}</div>
        <div style={following}>following : {@props.data.following}</div>
      </div>
    </div>

class @GithubApi
  @server = 'https://api.github.com'
  @userPath = '/users/'

  constructor: ->

  @AjaxCall: (username, option = null) ->
    option = {} unless option?
    option.type = 'GET' unless option.type?
    option.params = {} unless option.params?

    $.ajax
      type: option.type
      url: @server + @userPath + username
      beforeSend: ->
        option.before() if option.before?
      success: (result, type)->
        option.callback(result) if option.callback?
      error: (XMLHttpRequest, textStatus, errorThrown)->
        console.error('Unknown')

  getUserData: (name, before, callback) ->
    GithubApi.AjaxCall name, option =
      type: 'GET'
      before: before
      callback: callback

class @Github
  constructor: ->
    @before = ->
      $('#content').html("loading now...")
    @callback = (d) ->
      React.render <Signature data={d} />, document.getElementById('content')

  getUserData: (name)->
    return new GithubApi().getUserData(name, @before, @callback)

github = new Github()
github.getUserData('maxmellon')
