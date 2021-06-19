import CCoin from '../CCoin';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Coin extends CCoin {
  @property(cc.Prefab)
  private inactiveBlock: cc.Prefab = null;

  private _isBlock = false;

  private get isBlock(): boolean {
    return this.isBlock;
  }

  private set isBlock(value: boolean) {
    if (this.isBlock !== value) {
      this._isBlock = value;

      if (!this.isBlock) {
        this.getComponent(cc.Animation).resume();

        this.node.children.forEach(element => {
          element.destroy();
        });
      } else {
        const block = cc.instantiate(this.inactiveBlock);
        block.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y + 16));

        this.node.addChild(block);

        this.getComponent(cc.Animation).pause();
      }
    }
  }

  public toggleState(): void {
    switch (this.isBlock) {
      case true:
        this.isBlock = false;
        break;
      case false:
        this.isBlock = true;
        break;
      default:
        break;
    }
  }
}
