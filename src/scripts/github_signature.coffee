Signature = React.createClass
  getDefaultProps: ->
    style:
      flame:
        fontFamily: 'meiryo'
        width: '200px'
        height: '85px'
        background: '#000'
      reps:
        width: '50px'
        height: '55px'
        background: '#44F'
        color: '#fff'
        title:
          fontSize: '5px'
          width: '0px'
          height: '0px'
          padding: '0px 0px 0px 10px'
        text:
          padding: '15px 0px 0px 14px'
      name:
        float: 'left'
        width: '0px'
        height: '0px'
        color: '#fff'
        margin: '0px'

  render: ->
    flame = @props.style.flame
    name = @props.style.name
    reps = @props.style.reps
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
        <h2 style={name}>{@props.data.name}</h2>
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

class Github
  constructor: ->
    @before = ->
      $('#content').html("loading now...")
    @callback = (d) ->
      React.render <Signature data={d} />, document.getElementById('content')

  getUserData: (name)->
    return new GithubApi().getUserData(name, @before, @callback)

github = new Github()
github.getUserData('maxmellon')
