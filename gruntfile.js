var fs = require("fs");

var coreFiles = ["jQRangeSliderMouseTouch.js"
  , "jQRangeSliderDraggable.js"
  , "jQRangeSlider.js"
  , "jQRangeSliderHandle.js"
  , "jQRangeSliderBar.js"
  , "jQRangeSliderLabel.js"];

var dateFiles = [
    "jQDateRangeSlider.js"
    , "jQDateRangeSliderHandle.js"
  ];

var editFiles = [
    "jQEditRangeSlider.js"
    , "jQEditRangeSliderLabel"
  ];

info = JSON.parse(fs.readFileSync("jQRangeSlider.jquery.json"));

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('jQRangeSlider.jquery.json'),
    clean: {
      filesSrc: ["dest/"]
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
          'Copyright (C) Guillaume Gautreau 2012 - '+
          'MIT and GPLv3 licenses.*/'
      },
      basic: {
        files: {
          'dest/jQRangeSlider-min.js': coreFiles
        }
      },
      date: {
        files: {
          'dest/jQDateRangeSlider-min.js': coreFiles.concat(dateFiles)
        }
      },
      edit: {
        files: {
          'dest/jQEditRangeSlider-min.js': coreFiles.concat(editFiles)
        }
      },
      all: {
        files: {
          'dest/jQAllRangeSliders-min.js': coreFiles.concat(dateFiles).concat(editFiles)
        }
      }
    },
    copy: {
      demo: {
        files: [
          {src: ["demo/**"], dest: "dest/"}
        ]
      },
      css: {
        files: [
          {src: ["css/**"], dest: "dest/"}
        ]
      },
      lib:{
        files: [
          {src: ["lib/*"], dest: "dest/"}
        ]
      },
      doc: {
        files: [
          {src: ["*.md", "MIT-License.txt", "GPL-License.txt"], dest: "dest/"}
        ]
      }
    },
    mincss: {
      compress: {
        files: {
          "dest/css/iThing-min.css": ["css/iThing.css"],
          "dest/css/classic-min.css": ["css/classic.css"]
        }
      }
    },
    compress:{
      package:{
        options:{
          archive: "jQRangeSlider-" + info.version + ".zip",
          level: 9
        },
        files: [
          {src: ["**"], dest: "jQRangeSlider-" + info.version, expand: true, cwd: 'dest/'}
        ]
      }
    }
  });
 
  // loading the required tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask("default", ["clean", "uglify", "copy", "mincss", "compress"]);
};