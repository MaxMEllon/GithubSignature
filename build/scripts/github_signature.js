(function() {
  var Signature;

  Signature = React.createClass({
    getDefaultProps: function() {
      return {
        style: {
          flame: {
            fontFamily: 'meiryo',
            width: '300px',
            height: '75px',
            background: '#000'
          },
          reps: {
            float: 'left',
            width: '40px',
            height: '75px',
            background: '#44f',
            color: '#fff',
            title: {
              fontSize: '5px',
              width: '0px',
              height: '0px',
              padding: '0px 0px 0px 5px'
            },
            text: {
              width: '0px',
              height: '0px',
              padding: '15px 0px 0px 10px'
            }
          },
          gists: {
            float: 'left',
            width: '40px',
            height: '75px',
            background: '#280',
            color: '#fff',
            title: {
              fontSize: '5px',
              width: '0px',
              height: '0px',
              padding: '0px 0px 0px 5px'
            },
            text: {
              padding: '15px 0px 0px 10px'
            }
          },
          head: {
            fontSize: '5px',
            color: '#fff'
          },
          name: {
            color: '#fff',
            margin: '0px',
            fontSize: '18px'
          },
          followers: {
            padding: '0px 0px 0px 0px',
            color: '#fff',
            fontSize: '10px'
          },
          following: {
            padding: '0px 0px 0px 0px',
            color: '#fff',
            fontSize: '10px'
          },
          img: {
            float: 'right',
            height: '75px'
          }
        }
      };
    },
    render: function() {
      var flame, followers, following, gists, head, img, name, reps;
      flame = this.props.style.flame;
      name = this.props.style.name;
      reps = this.props.style.reps;
      gists = this.props.style.gists;
      followers = this.props.style.followers;
      following = this.props.style.following;
      img = this.props.style.img;
      head = this.props.style.head;
      return React.createElement("div", null, React.createElement("div", {
        "style": flame
      }, React.createElement("div", {
        "style": reps
      }, React.createElement("p", {
        "style": reps.title
      }, "public repos"), React.createElement("p", {
        "style": reps.text
      }, this.props.data.public_repos)), React.createElement("img", {
        "style": img,
        "src": this.props.data.avatar_url
      }), React.createElement("div", {
        "style": gists
      }, React.createElement("p", {
        "style": gists.title
      }, "public gists"), React.createElement("p", {
        "style": gists.text
      }, this.props.data.public_gists)), React.createElement("div", {
        "style": head
      }, " github "), React.createElement("h2", {
        "style": name
      }, this.props.data.name), React.createElement("div", {
        "style": followers
      }, "followers : ", this.props.data.followers), React.createElement("div", {
        "style": following
      }, "following : ", this.props.data.following)));
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

  this.Github = (function() {
    function Github() {
      this.before = function() {
        return $('#content').html("loading now...");
      };
      this.callback = function(d) {
        return React.render(React.createElement(Signature, {
          "data": d
        }), document.getElementById('github-signature'));
      };
    }

    Github.prototype.getUserData = function(name) {
      return new GithubApi().getUserData(name, this.before, this.callback);
    };

    return Github;

  })();

}).call(this);
