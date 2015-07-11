(function() {
  var ColorBoxList, DataList, FollowBox, Signature, StarBox;

  Signature = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "signature"
      }, React.createElement(ColorBoxList, {
        "data": this.props.data
      }), React.createElement(DataList, {
        "data": this.props.data
      }));
    }
  });

  ColorBoxList = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "color-box-list"
      }, React.createElement(FollowBox, {
        "type": "followers",
        "num": this.props.data.followers
      }), React.createElement(FollowBox, {
        "type": "following",
        "num": this.props.data.following
      }), React.createElement(StarBox, {
        "num": this.props.data.stars
      }));
    }
  });

  FollowBox = React.createClass({
    getDefaultProps: function() {
      return {
        style: {
          following: {
            backgroundColor: '#00f'
          },
          followers: {
            backgroundColor: '#0f0'
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
      }
      return React.createElement("div", {
        "className": "follow-box",
        "style": style
      }, this.props.num);
    }
  });

  StarBox = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "star-box"
      }, this.props.num);
    }
  });

  DataList = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", null);
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
