Signature = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="signature">
      <ColorBoxList data={@props.data} />
      <DataList data={@props.data} />
    </div>

ColorBoxList = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="color-box-list">
      <FollowBox type="followers" num={@props.data.followers} />
      <FollowBox type="following" num={@props.data.following} />
      <StarBox num={@props.data.stars} />
    </div>

FollowBox = React.createClass
  getDefaultProps: ->
    style:
      following:
        backgroundColor: '#00f'
      followers:
        backgroundColor: '#0f0'

  render: ->
    switch @props.type
      when "following"
        style = @props.style.following
      when "followers"
        style = @props.style.followers
    <div className="follow-box" style={style}>{@props.num}</div>

StarBox = React.createClass
  getDefaultProps: ->

  render: ->
    <div className="star-box">{@props.num}</div>

DataList = React.createClass
  getDefaultProps: ->

  render: ->
    <div></div>

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

