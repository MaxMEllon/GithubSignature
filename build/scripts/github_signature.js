(function() {
  var Github, Signature;

  Signature = React.createClass({
    render: function() {
      var github, raw;
      github = new Github();
      raw = github.getUserData();
      console.debug(raw);
      return React.createElement("div", null, React.createElement("span", null));
    }
  });

  window.onload = function() {
    return React.render(React.createElement(Signature, {
      "username": 'maxmellon'
    }), document.getElementById('content'));
  };

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

    GithubApi.prototype.getUserData = function(before, callback) {
      var option;
      return GithubApi.AjaxCall('maxmellon', option = {
        type: 'GET',
        before: before,
        callback: callback
      });
    };

    return GithubApi;

  })();

  Github = (function() {
    function Github() {
      this.before = function() {
        return $('#content').html("loading now...");
      };
      this.callback = function(d) {
        $('#content').empty();
        return $('#content').text(d.users);
      };
    }

    Github.prototype.getUserData = function() {
      return new GithubApi().getUserData(this.before, this.callback);
    };

    return Github;

  })();

}).call(this);
