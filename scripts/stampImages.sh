#!/bin/sh
# In order to use it, install imagemagick first: brew install imagemagick
flag="wiki.xmunch.com - 0x/" && \
name=$1 && \
width=`identify -format %w ${name}.jpg` && \
convert -background '#0007' -fill white -gravity center -size ${width}x31 \
caption:"${flag}/${name}" \
${name}.jpg +swap -gravity north \
-composite  ${name} && \
convert ${name}  -bordercolor black -border 0.5%x0.5% ${name} && \
echo ${name}
