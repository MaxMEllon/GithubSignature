(function() {
  var Github, Signature, github;

  Signature = React.createClass({
    getDefaultProps: function() {
      return {
        style: {
          flame: {
            fontFamily: 'meiryo',
            width: '200px',
            height: '85px',
            background: '#000'
          },
          reps: {
            width: '50px',
            height: '55px',
            background: '#44F',
            color: '#fff',
            title: {
              fontSize: '5px',
              width: '0px',
              height: '0px',
              padding: '0px 0px 0px 10px'
            },
            text: {
              padding: '15px 0px 0px 14px'
            }
          },
          name: {
            float: 'left',
            width: '0px',
            height: '0px',
            color: '#fff',
            margin: '0px'
          }
        }
      };
    },
    render: function() {
      var flame, name, reps;
      flame = this.props.style.flame;
      name = this.props.style.name;
      reps = this.props.style.reps;
      return React.createElement("div", null, React.createElement("div", {
        "style": flame
      }, React.createElement("div", {
        "style": reps
      }, React.createElement("p", {
        "style": reps.title
      }, "public repos"), React.createElement("p", {
        "style": reps.text
      }, this.props.data.public_repos)), React.createElement("h2", {
        "style": name
      }, this.props.data.name)));
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

  Github = (function() {
    function Github() {
      this.before = function() {
        return $('#content').html("loading now...");
      };
      this.callback = function(d) {
        return React.render(React.createElement(Signature, {
          "data": d
        }), document.getElementById('content'));
      };
    }

    Github.prototype.getUserData = function(name) {
      return new GithubApi().getUserData(name, this.before, this.callback);
    };

    return Github;

  })();

  github = new Github();

  github.getUserData('maxmellon');

}).call(this);
