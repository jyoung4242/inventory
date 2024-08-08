import { Actor } from "excalibur";
import { Resources } from "../assets/resources";

class Potion extends Actor {
  constructor() {
    super({
      width: 50,
      height: 50,
    });
    this.name = "redpotion";
    this.graphics.use(Resources.redpotion.toSprite());
  }
}

export const potion = new Potion();
