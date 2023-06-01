import { plainify } from "@lib/utils/textConverter";

// content reading
const readingTime = (content: string) => {
  const CPS = 600 / 60;

  let images = 0;

  let lines = content.split("\n").filter((line) => {
    if (line.includes("<img")) {
      images += 1;
      return false;
    }
    return true;
  });

  const chars = plainify(lines.join("\n")).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((chars - imageAdjust) / CPS + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return "0" + minutes + ` Min read`;
    } else {
      return "0" + minutes + ` Mins read`;
    }
  } else {
    return minutes + ` Mins read`;
  }
};

export default readingTime;
