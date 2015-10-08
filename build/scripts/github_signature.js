(function() {
  var Avatar, ColorBox, ColorBoxList, DataList, LangBar, Signature,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Signature = (function(_super) {
    __extends(Signature, _super);

    Signature.displayName = 'Signature';

    function Signature(props) {
      Signature.__super__.constructor.call(this, props);
      if (props.data.name === null) {
        props.data.name = props.data.login;
      }
      this.langCounts = this.getLangsCount(props.data.login);
    }

    Signature.prototype.getLangsCallback = function(d) {
      var k, langs, repo, _i, _len, _results;
      langs = [];
      localStorage.clear();
      _results = [];
      for (k = _i = 0, _len = d.length; _i < _len; k = ++_i) {
        repo = d[k];
        _results.push(localStorage[k] = repo.language);
      }
      return _results;
    };

    Signature.prototype.getLangsCount = function(name) {
      var api, k, langs, _i, _j, _ref, _ref1;
      api = new GithubApi().getUsersRepoData(name, this.getLangsCallback);
      langs = {};
      for (k = _i = 0, _ref = localStorage.length; 0 <= _ref ? _i < _ref : _i > _ref; k = 0 <= _ref ? ++_i : --_i) {
        langs[localStorage[k]] = 0;
      }
      for (k = _j = 0, _ref1 = localStorage.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; k = 0 <= _ref1 ? ++_j : --_j) {
        langs[localStorage[k]] += 1;
      }
      localStorage.clear();
      return langs;
    };

    Signature.prototype.render = function() {
      return React.createElement("div", {
        "className": "signature"
      }, React.createElement(ColorBoxList, {
        "data": this.props.data
      }), React.createElement(DataList, {
        "data": this.props.data
      }), React.createElement(Avatar, {
        "url": this.props.data.avatar_url
      }), React.createElement(LangBar, {
        "data": this.langCounts
      }));
    };

    return Signature;

  })(React.Component);

  ColorBoxList = (function(_super) {
    __extends(ColorBoxList, _super);

    function ColorBoxList() {
      return ColorBoxList.__super__.constructor.apply(this, arguments);
    }

    ColorBoxList.displayName = 'ColorBoxList';

    ColorBoxList.defaultProps = {
      style: {
        red: {
          backgroundColor: 'red'
        },
        orange: {
          backgroundColor: 'orange'
        },
        yellow: {
          backgroundColor: 'yellow',
          color: 'black'
        },
        green: {
          backgroundColor: 'green'
        },
        cyan: {
          backgroundColor: 'cyan',
          color: 'black'
        },
        purple: {
          backgroundColor: 'purple'
        }
      }
    };

    ColorBoxList.prototype.render = function() {
      var scouter, stars, style;
      stars = githubStars(this.props.data.login);
      scouter = stars * 1.5 + this.props.data.public_repos + this.props.data.followers / 2;
      if ((0 <= scouter && scouter < 30)) {
        style = this.props.style.red;
      }
      if ((30 <= scouter && scouter < 60)) {
        style = this.props.style.orange;
      }
      if ((60 <= scouter && scouter < 90)) {
        style = this.props.style.yellow;
      }
      if ((90 <= scouter && scouter < 200)) {
        style = this.props.style.green;
      }
      if ((200 <= scouter && scouter < 500)) {
        style = this.props.style.cyan;
      }
      if ((500 <= scouter && scouter < 999999)) {
        style = this.props.style.purple;
      }
      return React.createElement("div", {
        "className": "sig-color-box-list"
      }, React.createElement(ColorBox, {
        "type": "repos",
        "num": this.props.data.public_repos
      }), React.createElement(ColorBox, {
        "type": "stars",
        "num": stars
      }), React.createElement(ColorBox, {
        "type": "followers",
        "num": this.props.data.followers
      }), React.createElement(ColorBox, {
        "type": "following",
        "num": this.props.data.following
      }), React.createElement("div", {
        "style": style,
        "className": "sig-scouter",
        "type": 'scouter'
      }, '戦 : ' + scouter));
    };

    return ColorBoxList;

  })(React.Component);

  ColorBox = (function(_super) {
    __extends(ColorBox, _super);

    function ColorBox() {
      return ColorBox.__super__.constructor.apply(this, arguments);
    }

    ColorBox.displayName = 'ColorBox';

    ColorBox.defaultProps = {
      style: {
        fontSize: '10px',
        followers: {
          backgroundColor: '#e51400'
        },
        following: {
          backgroundColor: '#008a00'
        },
        repos: {
          backgroundColor: '#0050ef'
        },
        gists: {
          backgroundColor: '#f0a30a'
        }
      }
    };

    ColorBox.prototype.render = function() {
      var style;
      switch (this.props.type) {
        case "following":
          style = this.props.style.following;
          break;
        case "followers":
          style = this.props.style.followers;
          break;
        case "repos":
          style = this.props.style.repos;
          break;
        case "stars":
          style = this.props.style.gists;
      }
      return React.createElement("div", {
        "className": "sig-color-box",
        "style": style
      }, React.createElement("div", {
        "style": this.props.style
      }, this.props.type), React.createElement("div", {
        "className": "sig-color-box-num"
      }, this.props.num));
    };

    return ColorBox;

  })(React.Component);

  DataList = (function(_super) {
    __extends(DataList, _super);

    DataList.displayName = 'DataList';

    function DataList(props) {
      DataList.__super__.constructor.call(this, props);
      if (props.data.name === null) {
        props.data.name = props.data.login;
      }
      if (props.data.name.length >= 16) {
        this.state = {
          style: {
            marginTop: '7px',
            fontSize: '14px',
            height: '22px'
          }
        };
      } else {
        this.state = {
          style: {
            fontSize: '20px'
          }
        };
      }
    }

    DataList.prototype.render = function() {
      if (this.props.data.company.length >= 27) {
        this.props.data.company = this.props.data.company.substr(0, 24) + '...';
      }
      if (this.props.data.location.length >= 27) {
        this.props.data.location = this.props.data.location.substr(0, 24) + '...';
      }
      if (this.props.data.blog.length >= 27) {
        this.props.data.blog = this.props.data.blog.substr(0, 24) + '...';
      }
      return React.createElement("div", {
        "className": "sig-container"
      }, React.createElement("div", {
        "style": this.state.style,
        "className": "sig-text sig-user-name"
      }, this.props.data.name), React.createElement("div", {
        "className": "sig-text sig-company"
      }, "company : ", this.props.data.company), React.createElement("div", {
        "className": "sig-text sig-location"
      }, "location : ", this.props.data.location), React.createElement("div", {
        "className": "sig-text sig-blog"
      }, "blog : ", this.props.data.blog), React.createElement("div", {
        "className": "sig-text sig-last-push"
      }, "last update : ", this.props.data.updated_at));
    };

    return DataList;

  })(React.Component);

  LangBar = (function(_super) {
    __extends(LangBar, _super);

    LangBar.displayName = 'LangBar';

    LangBar.defaultProps = {
      hover: false,
      lavel: ''
    };

    function LangBar(props) {
      var key, unit, _i, _len, _ref;
      LangBar.__super__.constructor.call(this, props);
      unit = 420 / Object.keys(props.data).length;
      this.width = [];
      _ref = Object.keys(props.data);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.width[key] = props.data[key] * unit;
      }
    }

    LangBar.prototype.render = function() {
      var components, key, _i, _len, _ref;
      components = [];
      _ref = Object.keys(this.props.data);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        components.push(React.createElement("div", {
          "className": "sig-lang " + key,
          "onMouseOver": this.onHover,
          "onMouseOut": this.onBlur,
          "style": {
            width: this.width[key]
          }
        }));
      }
      return React.createElement("div", {
        "className": 'sig-lang-bar'
      }, components);
    };

    return LangBar;

  })(React.Component);

  Avatar = (function(_super) {
    __extends(Avatar, _super);

    function Avatar() {
      return Avatar.__super__.constructor.apply(this, arguments);
    }

    Avatar.displayName = 'Avatar';

    Avatar.prototype.render = function() {
      return React.createElement("div", null, React.createElement("img", {
        "className": "sig-avatar",
        "src": this.props.url
      }));
    };

    return Avatar;

  })(React.Component);

  this.GithubApi = (function() {
    GithubApi.prototype.server = 'https://api.github.com';

    GithubApi.prototype.userPath = '/users/';

    GithubApi.prototype.reposPath = '/repos';

    function GithubApi() {}

    GithubApi.AjaxCall = function(url, option) {
      if (option == null) {
        option = null;
      }
      if (option == null) {
        option = {};
      }
      if (option.type == null) {
        option.type = 'GET';
      }
      if (option.params == null) {
        option.params = {};
      }
      return $.ajax({
        type: option.type,
        url: url,
        beforeSend: function() {
          if (option.before != null) {
            return option.before();
          }
        },
        success: function(result, type) {
          if (option.callback != null) {
            return option.callback(result);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          return console.error(textStatus + " : " + errorThrown);
        }
      });
    };

    GithubApi.prototype.getUserData = function(name, before, callback) {
      var option, url;
      url = this.server + this.userPath + name;
      return GithubApi.AjaxCall(url, option = {
        type: 'GET',
        before: before,
        callback: callback
      });
    };

    GithubApi.prototype.getUsersRepoData = function(name, callback) {
      var oprion, url;
      url = this.server + this.userPath + name + this.reposPath;
      return GithubApi.AjaxCall(url, oprion = {
        type: 'GET',
        callback: callback
      });
    };

    return GithubApi;

  })();

  this.GithubSignature = (function() {
    function GithubSignature(id) {
      if (id == null) {
        id = 'github-signature';
      }
      this.before = function() {
        return $('#github-signature').html("loading signature...");
      };
      this.callback = function(d) {
        return React.render(React.createElement(Signature, {
          "data": d
        }), document.getElementById(id));
      };
    }

    GithubSignature.prototype.drawUserSignature = function(name) {
      return new GithubApi().getUserData(name, this.before, this.callback);
    };

    return GithubSignature;

  })();

}).call(this);
