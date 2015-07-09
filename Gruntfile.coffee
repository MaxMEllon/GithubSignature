module.exports = (grunt) ->
  grunt.initConfig
    plg: grunt.file.readJSON("package.json")

    slim:
      build:
        src: "src/pages/index.slim"
        dest: "index.html"

    cjsx:
      build:
        src: ["src/scripts/*.coffee"]
        dest: "build/scripts/github_signature.js"

    watch:
      files: "src/**/*"
      tasks: [
        "slim"
        "cjsx"
      ]

    connect:
      server:
        options:
          port: 3000


  # plugin
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-coffee-react"
  grunt.loadNpmTasks "grunt-slim"

  #tasks
  grunt.registerTask "default", [
    "slim"
    "cjsx"
    "connect"
    "watch"
  ]
  return
