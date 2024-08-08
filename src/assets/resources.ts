import { FontSource, ImageSource, ImageSourceOptions, Loader } from "excalibur";

//@ts-expect-error
import myFont from "../assets/RomanceBreakin.ttf";
//@ts-expect-error
import redpotion from "../assets/redpotion.png";
//@ts-expect-error
import book from "../assets/boook.png";
//@ts-expect-error
import coin from "../assets/coin.png";
//@ts-expect-error
import key from "../assets/key.png";

export const Resources = {
  font: new FontSource(myFont, "myFont"),
  redpotion: new ImageSource(redpotion),
  book: new ImageSource(book),
  coin: new ImageSource(coin),
  key: new ImageSource(key),
} as const; // < -- as const is important to get strong typing!

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
