# GithubSignature

<p align='center'>
  <img src='./img/sample.png' />
</p>

## About

`Githubsignature` can be embedded the signature in HTML.

## Installation

```
$ wget https://raw.githubusercontent.com/MaxMEllon/GithubSignature/master/build/styles/github_signature.min.css
$ wget https://raw.githubusercontent.com/MaxMEllon/GithubSignature/master/build/scripts/github_signature.min.js
```

## Requirements

- [React.js](http://facebook.github.io/react/) >= 0.13.3
- [JQuery](https://code.jquery.com/jquery-2.1.3.min.js)
- [Github.api](https://api.github.com)
- localStorage

## Usage

```html
  <head>
    <link href="path/to/github_signature.min.css">
  </head>
  <body>
    <div id="github-signature"></div>
    <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="https://fb.me/react-0.13.3.js"></script>
    <script src="path/to/github_signature.min.js"></script>
    <script>
      signature = new GithubSignature('[id]')
      signature.drawUserSignature('[username]')
    </script>
  </body>
```

## Contact

[![Join the chat at https://gitter.im/MaxMEllon/GithubSignature](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MaxMEllon/GithubSignature?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## LICENSE

This software is released under the MIT License, see LICENSE.txt.
