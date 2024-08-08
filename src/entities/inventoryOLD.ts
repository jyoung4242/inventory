import { Actor, Color, Rectangle, Vector, Text, Font, GraphicsGroup, Sprite, Graphic, Engine } from "excalibur";
import { Resources } from "../assets/resources";

class InventorySlot extends Actor {
  public label: Text;
  public sprite: Sprite | null = null;
  myBorder = new Rectangle({
    width: 75,
    height: 75,
    strokeColor: Color.White,
    lineWidth: 3,
    color: Color.Transparent,
  });

  graphicsGroup = new GraphicsGroup({
    members: [
      {
        graphic: this.myBorder,
        offset: new Vector(0, 0),
      },
    ],
  });

  qty: number = 0;
  name: string = "emtpy";

  constructor(pos: Vector, name: string | null, qty: number | null) {
    super({
      width: 75,
      height: 75,
    });

    this.label = new Text({
      text: `${this.name} ${this.qty}`,
      color: Color.White,
      font: new Font({
        size: 12,
        family: "myFont",
        color: Color.White,
      }),
    });
    this.pos = pos;
    this.graphics.use(this.graphicsGroup);
    this.graphicsGroup.members.push({
      graphic: this.label,
      offset: new Vector(0, 80),
    });
  }

  setSprite(sprite: Sprite) {
    this.sprite = sprite;
    this.sprite.scale = new Vector(3, 3);
    this.graphicsGroup.members.push({
      graphic: this.sprite,
      offset: this.centerGraphic(this.sprite),
    });
  }

  centerGraphic(graphic: Graphic): Vector {
    if (graphic) {
      console.log(graphic);
      console.log(graphic.width, graphic.height);

      return new Vector(graphic.width / 2 - 12, graphic.height / 2 - 12);
    }
    return new Vector(0, 0);
  }
}

class Inventory extends Actor {
  inventory = {
    redpotion: {
      name: "redpotion",
      qty: 4,
    },
  };

  slots: number = 4;

  myBorder = new Rectangle({
    width: 700,
    height: 500,
    strokeColor: Color.White,
    lineWidth: 3,
    color: Color.Transparent,
  });

  myTitle = new Text({
    text: "Inventory",
    color: Color.White,
    font: new Font({
      size: 24,
      family: "myFont",
      color: Color.White,
    }),
  });

  graphicsGroup: any;

  constructor() {
    super({
      width: 700,
      height: 500,
      pos: new Vector(400, 300),
      color: Color.Transparent,
    });
  }

  onInitialize(engine: Engine): void {
    this.graphicsGroup = new GraphicsGroup({
      members: [
        {
          graphic: this.myBorder,
          offset: new Vector(0, 0),
        },
        {
          graphic: this.myTitle,
          offset: new Vector(5, 5),
        },
      ],
    });
    this.graphics.use(this.graphicsGroup);

    for (let i = 0; i < this.slots; i++) {
      let newActor = new InventorySlot(new Vector(i * 85 - 120, 0), null, null);
      this.addChild(newActor);
    }

    //add inventory
    let invIndex = 0;
    for (const [key, value] of Object.entries(this.inventory)) {
      console.log(key, value);
      console.log(this.children);
      (this.children[invIndex] as InventorySlot).label.text = `${key} ${value.qty}`;
      //@ts-ignore
      (this.children[invIndex] as InventorySlot).setSprite(Resources[key as string].toSprite());

      invIndex++;
    }
  }
}

export const inventory = new Inventory();
