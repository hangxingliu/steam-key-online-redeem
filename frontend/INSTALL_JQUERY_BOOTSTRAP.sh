#!/usr/bin/env bash


if [[ ! -d "node_modules" ]]; then
	echo -e "\n  error: node_modules is missing!\n"
fi 

SCRIPTS_TO="frontend/res/scripts"
# STYLE_TO="frontend/res/style"
# FONTS_TO="frontend/res"

# jquery
cp node_modules/jquery/dist/jquery.min.js "$SCRIPTS_TO/" &&
# popper.js
cp node_modules/popper.js/dist/umd/popper.min.js "$SCRIPTS_TO/" &&
# bootstrap
cp node_modules/bootstrap/dist/js/bootstrap.min.js "$SCRIPTS_TO/" &&

# Keep original bootstrap stylesheet with custom theme
# cp node_modules/bootstrap/dist/css/bootstrap.min.css "$STYLE_TO/" &&

# cp -r node_modules/bootstrap/dist/fonts "$FONTS_TO/" &&
echo -e "\n  success!\n"