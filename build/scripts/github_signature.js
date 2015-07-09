(function() {
  var Signature;

  Signature = React.createClass({
    render: function() {
      return React.createElement("div", null);
    }
  });

  window.onload = function() {
    return React.render(React.createElement(Signature, null), document.getElementById('content'));
  };

}).call(this);
