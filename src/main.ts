import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, ImageSource, SpriteSheet, Camera, Vector } from "excalibur";
//@ts-expect-error
import redpotion from "./assets/redpotion.png";
//@ts-expect-error
import coin from "./assets/coin.png";
//@ts-expect-error
import book from "./assets/boook.png";
//@ts-expect-error
import key from "./assets/key.png";

import { loader } from "./assets/resources";
import { Inventory } from "./entities/inventory";
const model = {
  Inventory,
  inventory: undefined as undefined | Inventory,

  inventoryState: {
    isShowing: false,
    inventory: [
      { id: 0, hotkey: 1, isEmpty: true },
      { id: 1, hotkey: 2, isEmpty: true },
      { id: 2, hotkey: 3, isEmpty: true },
      { id: 3, hotkey: 4, isEmpty: true },
    ],
    slots: [
      {
        name: "empty",
        qty: 0,
        isHighlighted: false,
        sprite: undefined as undefined | HTMLImageElement,
        isEmpty: true,
        hotkey: 1,
      },
      {
        name: "empty",
        qty: 0,
        isHighlighted: false,
        sprite: undefined as undefined | HTMLImageElement,
        isEmpty: true,
        hotkey: 2,
      },
      {
        name: "empty",
        qty: 0,
        isHighlighted: false,
        sprite: undefined as undefined | HTMLImageElement,
        isEmpty: true,
        hotkey: 3,
      },
      {
        name: "empty",
        qty: 0,
        isHighlighted: false,
        sprite: undefined as undefined | HTMLImageElement,
        isEmpty: true,
        hotkey: 4,
      },
    ],
  },
  addPotion: () => {
    //@ts-ignore
    model.inventory.model.addItem({
      id: 0,
      name: "potion",
      qty: 1,
      isHighlighted: false,
      sprite: redpotion,
      isEmpty: false,
      hotkey: 1,
    });
  },
  usePotion: () => {
    //@ts-ignore
    model.inventory.model.useItem({
      id: 0,
      name: "potion",
      qty: 1,
      isHighlighted: false,
      sprite: redpotion,
      isEmpty: false,
      hotkey: 1,
    });
  },
  addKey: () => {
    //@ts-ignore
    model.inventory.model.addItem({
      id: 1,
      name: "key",
      qty: 1,
      isHighlighted: false,
      sprite: key,
      isEmpty: false,
      hotkey: 1,
    });
  },
  useKey: () => {
    //@ts-ignore
    model.inventory.model.useItem({
      id: 1,
      name: "key",
      qty: 1,
      isHighlighted: false,
      sprite: key,
      isEmpty: false,
      hotkey: 1,
    });
  },
  addCoin: () => {
    //@ts-ignore
    model.inventory.model.addItem({
      id: 2,
      name: "coin",
      qty: 1,
      isHighlighted: false,
      sprite: coin,
      isEmpty: false,
      hotkey: 1,
    });
  },
  useCoin: () => {
    //@ts-ignore
    model.inventory.model.useItem({
      id: 2,
      name: "coin",
      qty: 1,
      isHighlighted: false,
      sprite: coin,
      isEmpty: false,
      hotkey: 1,
    });
  },
  addBook: () => {
    //@ts-ignore
    model.inventory.model.addItem({
      id: 3,
      name: "book",
      qty: 1,
      isHighlighted: false,
      sprite: book,
      isEmpty: false,
      hotkey: 1,
    });
  },
  useBook: () => {
    //@ts-ignore
    model.inventory.model.useItem({
      id: 3,
      name: "book",
      qty: 1,
      isHighlighted: false,
      sprite: book,
      isEmpty: false,
      hotkey: 1,
    });
  },
};
const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
    
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <\${Inventory:inventory === inventoryState }>
    <button \${click@=>addPotion}>Add Potion</button>
    <button \${click@=>usePotion}>Use Potion</button>
    <button \${click@=>addKey}>Add Key</button>
    <button \${click@=>useKey}>Use Key</button>
    <button \${click@=>addCoin}>Add Coin</button>
    <button \${click@=>useCoin}>Use Coin</button>
    <button \${click@=>addBook}>Add Book</button>
    <button \${click@=>useBook}>Use Book</button>
    
    
</div>`;
await UI.create(document.body, model, template).attached;
const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});
console.log(redpotion);

await game.start(loader);

model.inventoryState.isShowing = true;
console.log();
/* 
//add red potion to inventory
model.inventoryState.slots[0].name = "redPotion";
model.inventoryState.slots[0].qty = 1;
model.inventoryState.slots[0].sprite = redpotion;
model.inventoryState.slots[0].hotkey = 1;

model.inventoryState.slots[0].isEmpty = false; */
