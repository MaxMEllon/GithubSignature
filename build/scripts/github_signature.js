(function() {
  var FollowBox, FollowList, Signature;

  Signature = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "Signature"
      }, React.createElement(FollowList, {
        "data": this.props.data
      }));
    }
  });

  FollowList = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "FllowList"
      }, React.createElement(FollowBox, {
        "num": this.props.data.followers
      }), React.createElement(FollowBox, {
        "num": this.props.data.following
      }));
    }
  });

  FollowBox = React.createClass({
    getDefaultProps: function() {},
    render: function() {
      return React.createElement("div", {
        "className": "FollowBox"
      }, this.props.num);
    }
  });

  this.GithubApi = (function() {
    GithubApi.server = 'https://api.github.com';

    GithubApi.userPath = '/users/';

    function GithubApi() {}

    GithubApi.AjaxCall = function(username, option) {
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
        url: this.server + this.userPath + username,
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
          return console.error('Unknown');
        }
      });
    };

    GithubApi.prototype.getUserData = function(name, before, callback) {
      var option;
      return GithubApi.AjaxCall(name, option = {
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
        return $('#content').html("loading now...");
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
