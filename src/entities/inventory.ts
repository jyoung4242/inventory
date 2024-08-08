type InventorySlot = {
  id: number | null;
  name: string;
  qty: number;
  isHighlighted: boolean;
  sprite: string;
  isEmpty: boolean;
  hotkey: number;
};

type InventoryState = {
  isShowing: boolean;
  inventory: InventorySlot[];
};

export class Inventory {
  public state: InventoryState;

  public static template = `
    <style>


        inventory-component {
            width: 500px;
            height: 250px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 4px solid white;
            border-radius: 20px;
        }
        
        rel-div > span {
            position: absolute;
            padding : 8px;
            font-size: 24px;
            color: whitesmoke;
            font-family: 'testfont';
        }

        .hotkeyLabel{
            position: absolute;
            top: 46px;
            left: 0px;
            font-size: 16px;
            color: whitesmoke;
            font-family: 'testfont';
        }

        rel-div {
            position: relative;
            width: 100%;
            height: 100%;
        }

        slot-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px
        }

        slot-unit{
            position: relative;
            width:85px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 4px solid white;
            border-radius: 20px;
            image-rendering: pixelated;
            padding: 2px;
        }

        component-label {
            width: 100%;
            position: absolute;
            font-size: 14px;
            color: whitesmoke;
            font-family: 'testfont';
            bottom: -22px;
            left: 0px;
            text-align: center;
        }

        .hotkey-label{
            font-size: 18px;
            position: absolute;
            width: 100%; 
            text-align: center;
            top: -28px;
            font-weight: bold;
        }

    </style>
    <inventory-component \${===state.isShowing}>
        <rel-div>
            <span>Inventory</span>
            <span class="hotkeyLabel">Hotkeys: </span>
            <slot-container>
                <slot-unit name="inventory" \${slot<=*state.inventory:id} style="\${highlight == slot.isHighlighted}">
                <hot-key class="hotkey-label">\${slot.hotkey}</hot-key>
                    <empty-component \${===slot.isEmpty}></empty-component>
                    <loaded-component \${!==slot.isEmpty}>
                        
                        <img src="\${slot.sprite}" width="75px height="75px"/>
                        <component-label>
                        \${slot.name}  qty: \${slot.qty}
                        </component-label>
                    </loaded-component>
                </slot-unit>
            </slot-container>
        </rel-div>
        
    </inventory-component>
    `;

  constructor(state: { inventory: InventorySlot[]; isShowing: boolean }) {
    this.state = state;
    console.log(this.state);
    setInterval(() => {
      this.update();
    }, 100);
  }

  static create(state: { inventory: InventorySlot[]; isShowing: boolean }) {
    return new Inventory(state);
  }

  addItem(item: InventorySlot) {
    const invIndex = this.state.inventory.findIndex(slot => slot.name === item.name);

    if (invIndex > -1) {
      //exists

      this.state.inventory[invIndex].qty += item.qty;
      this.state.inventory[invIndex].isEmpty = false;
      this.state.inventory[invIndex].hotkey = invIndex + 1;
      this.state.inventory[invIndex].id = invIndex;
    } else {
      //not exists
      if (this.state.inventory.length < 5) {
        //find the first empty slot
        const emptyIndex = this.state.inventory.findIndex(slot => slot.isEmpty === true);
        if (emptyIndex > -1) {
          item.id = emptyIndex;
          console.log(item);

          this.state.inventory[emptyIndex] = item;
          this.state.inventory[emptyIndex].hotkey = emptyIndex + 1;
        }
      }
    }
  }

  useItem(item: InventorySlot) {
    const invIndex = this.state.inventory.findIndex(slot => slot.name === item.name);
    if (invIndex > -1) {
      //exists
      this.state.inventory[invIndex].qty -= item.qty;
      if (this.state.inventory[invIndex].qty <= 0) {
        this.state.inventory[invIndex].isEmpty = true;
        this.state.inventory[invIndex].name = "";
        this.state.inventory[invIndex].id = null;
        //splice
      }
    }
  }

  update() {
    /* const inv = Object.keys(this.state.inventory).forEach(key => {
      if (this.state.inventory[key].qty <= 0) this.state.inventory[key].isEmpty = true;
      else this.state.inventory[key].isEmpty = false;
    });

    Object.keys(this.state.inventory).map((key, index) => {
      this.state.slots[index] = this.state.inventory[key];
    }); */
  }
}
