(function() {
  var Avatar, ColorBox, ColorBoxList, DataList, Signature;

  Signature = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "signature"
      }, React.createElement(ColorBoxList, {
        "data": this.props.data
      }), React.createElement(DataList, {
        "data": this.props.data
      }), React.createElement(Avatar, {
        "url": this.props.data.avatar_url
      }));
    }
  });

  ColorBoxList = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "sig-color-box-list"
      }, React.createElement(ColorBox, {
        "type": "followers",
        "num": this.props.data.followers
      }), React.createElement(ColorBox, {
        "type": "following",
        "num": this.props.data.following
      }), React.createElement(ColorBox, {
        "type": "repos",
        "num": this.props.data.public_repos
      }), React.createElement(ColorBox, {
        "type": "gists",
        "num": this.props.data.public_gists
      }));
    }
  });

  ColorBox = React.createClass({
    getDefaultProps: function() {
      return {
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
    },
    render: function() {
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
        case "gists":
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
    }
  });

  DataList = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "sig-container"
      }, React.createElement("div", {
        "className": "sig-user-name"
      }, this.props.data.name), React.createElement("div", {
        "className": "sig-company"
      }, "company : ", this.props.data.company), React.createElement("div", {
        "className": "sig-location"
      }, "location : ", this.props.data.location), React.createElement("div", {
        "className": "sig-blog"
      }, "blog : ", this.props.data.blog), React.createElement("div", {
        "className": "sig-last-push"
      }, "last update : ", this.props.data.updated_at));
    }
  });

  Avatar = React.createClass({
    render: function() {
      return React.createElement("div", null, React.createElement("img", {
        "className": "sig-avatar",
        "src": this.props.url
      }));
    }
  });

  this.GithubApi = (function() {
    GithubApi.prototype.server = 'https://api.github.com';

    GithubApi.prototype.userPath = '/users/';

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

    return GithubApi;

  })();

  this.GithubSignature = (function() {
    function GithubSignature() {
      this.before = function() {
        return $('#github-signature').html("loading signature...");
      };
      this.callback = function(d) {
        return React.render(React.createElement(Signature, {
          "data": d
        }), document.getElementById('github-signature'));
      };
    }

    GithubSignature.prototype.drawUserSignature = function(name) {
      return new GithubApi().getUserData(name, this.before, this.callback);
    };

    return GithubSignature;

  })();

}).call(this);
