find . -name '*_thumb.JPG' -exec mogrify -quality 70 -resize 1024x {} \;
