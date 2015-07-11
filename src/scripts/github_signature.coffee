Signature = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="Signature">
      <FollowList data={@props.data} />
    </div>

FollowList = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="FllowList">
      <FollowBox num={@props.data.followers} />
      <FollowBox num={@props.data.following} />
    </div>

FollowBox = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="FollowBox">{@props.num}</div>

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

class @GithubSignature
  constructor: ->
    @before = ->
      $('#content').html("loading now...")
    @callback = (d) ->
      React.render <Signature data={d} />, document.getElementById('github-signature')

  drawUserSignature: (name)->
    return new GithubApi().getUserData(name, @before, @callback)

