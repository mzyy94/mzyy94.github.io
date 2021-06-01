#!/bin/sh
bundle install
bundle exec jekyll serve --host=0.0.0.0 --incremental --future --drafts --livereload