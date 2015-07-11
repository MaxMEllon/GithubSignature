module.exports = (grunt) ->
  grunt.initConfig
    plg: grunt.file.readJSON("package.json")

    sass:
      build:
        src: "src/styles/*.sass"
        dest: "build/styles/github_signature.css"

    slim:
      build:
        src: "src/pages/index.slim"
        dest: "index.html"

    cjsx:
      build:
        src: "src/scripts/*.coffee"
        dest: "build/scripts/github_signature.js"

    csslint:
      check:
        src: "<%= sass.build.dest>"

    csscss:
      check:
        src: "<%= sass.build.dest>"

    cssmin:
      minify:
        src: "<%= sass.build.dest>"
        dest: "build/styles/github_signature.min.css"

    watch:
      files: "src/**/*"
      tasks: [
        "slim"
        "cjsx"
        "sass"
        "csscss"
        "csslint"
        "cssmin"
      ]

    connect:
      server:
        options:
          port: 3000

  # plugin
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-coffee-react"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-csslint"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-csscss"
  grunt.loadNpmTasks "grunt-slim"

  #tasks
  grunt.registerTask "default", [
    "slim"
    "cjsx"
    "sass"
    "csscss"
    "csslint"
    "cssmin"
    "connect"
    "watch"
  ]

  return
