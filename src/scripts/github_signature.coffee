Signature = React.createClass
  render: ->
    github = new Github()
    raw = github.getUserData()
    console.debug raw
    <div>
      <span>
      </span>
    </div>

window.onload = ->
  React.render <Signature username='maxmellon'/>, document.getElementById('content')

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

  getUserData: (before, callback) ->
    GithubApi.AjaxCall 'maxmellon', option =
      type: 'GET'
      before: before
      callback: callback

class Github
  constructor: ->
    @before = ->
      $('#content').html("loading now...")
    @callback = (d) ->
      $('#content').empty()
      $('#content').text d.users

  getUserData: ()->
    return new GithubApi().getUserData(@before, @callback)

