class Signature extends React.Component
  @displayName: 'Signature'
  constructor: (props) ->
    super props
    props.data.name = props.data.login if props.data.name == null
    @langCounts = @getLangsCount(props.data.login)

  getLangsCallback: (d) ->
    langs = []
    localStorage.clear()
    for repo, k in d
      localStorage[k] = repo.language

  getLangsCount: (name)->
    api = new GithubApi().getUsersRepoData(name, @getLangsCallback)
    langs = {}
    for k in [0...localStorage.length]
      langs[localStorage[k]] = 0
    for k in [0...localStorage.length]
      langs[localStorage[k]] += 1
    localStorage.clear()
    langs

  render: ->
    <div className="signature">
      <ColorBoxList data={@props.data} />
      <DataList data={@props.data} />
      <Avatar url={@props.data.avatar_url} />
      <LangBar data={@langCounts} />
    </div>

class ColorBoxList extends React.Component
  @displayName: 'ColorBoxList'
  @defaultProps:
    style:
      red:    backgroundColor: 'red'
      orange: backgroundColor: 'orange'
      yellow:
        backgroundColor: 'yellow'
        color: 'black'
      green:  backgroundColor: 'green'
      cyan:
        backgroundColor: 'cyan'
        color: 'black'
      purple: backgroundColor: 'purple'
  render: ->
    stars = githubStars(@props.data.login)
    scouter = stars * 1.5 + @props.data.public_repos + @props.data.followers / 2
    style = @props.style.red    if   0 <= scouter < 30
    style = @props.style.orange if  30 <= scouter < 60
    style = @props.style.yellow if  60 <= scouter < 90
    style = @props.style.green  if  90 <= scouter < 200
    style = @props.style.cyan   if 200 <= scouter < 500
    style = @props.style.purple if 500 <= scouter < 999999
    <div className="sig-color-box-list">
      <ColorBox type="repos" num={@props.data.public_repos} />
      <ColorBox type="stars" num={stars} />
      <ColorBox type="followers" num={@props.data.followers} />
      <ColorBox type="following" num={@props.data.following} />
      <div style={style} className="sig-scouter" type='scouter'>{'戦 : ' + scouter}</div>
    </div>

class ColorBox extends React.Component
  @displayName: 'ColorBox'
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
  @displayName: 'DataList'
  constructor: (props) ->
    super props
    props.data.name = props.data.login if props.data.name == null
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
    @props.data.company = @props.data.company.substr(0, 24) + '...' if @props.data.company.length >= 27
    @props.data.location = @props.data.location.substr(0, 24) + '...' if @props.data.location.length >= 27
    @props.data.blog = @props.data.blog.substr(0, 24) + '...' if @props.data.blog.length >= 27
    <div className="sig-container">
      <div style={@state.style} className="sig-text sig-user-name">{@props.data.name}</div>
      <div className="sig-text sig-company">company : {@props.data.company}</div>
      <div className="sig-text sig-location">location : {@props.data.location}</div>
      <div className="sig-text sig-blog">blog : {@props.data.blog}</div>
      <div className="sig-text sig-last-push">last update : {@props.data.updated_at}</div>
    </div>

class LangBar extends React.Component
  @displayName: 'LangBar'
  @defaultProps:
    hover: false
    lavel: ''

  constructor: (props) ->
    super props
    unit = 420 / Object.keys(props.data).length
    @width = []
    for key in Object.keys(props.data)
      @width[key] = props.data[key] * unit

  render: ->
    components = []
    for key in Object.keys(@props.data)
      components.push <div className="sig-lang #{key}" onMouseOver={@onHover} onMouseOut={@onBlur} style={{width: @width[key]}} />
    <div className='sig-lang-bar'>
      {components}
    </div>

class Avatar extends React.Component
  @displayName: 'Avatar'
  render: ->
    <div>
      <img className="sig-avatar" src={@props.url} />
    </div>

class @GithubApi
  server: 'https://api.github.com'
  userPath:  '/users/'
  reposPath: '/repos'

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

  getUsersRepoData: (name, callback) ->
    url = @server + @userPath + name + @reposPath
    GithubApi.AjaxCall url, oprion =
      type: 'GET'
      callback: callback

class @GithubSignature
  constructor: (id = 'github-signature')->
    @before = ->
      $('#github-signature').html("loading signature...")
    @callback = (d) ->
      React.render <Signature data={d} />, document.getElementById(id)

  drawUserSignature: (name)->
    return new GithubApi().getUserData(name, @before, @callback)

