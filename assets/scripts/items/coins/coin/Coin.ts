import CCoin from '../CCoin';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Coin extends CCoin {
  @property(cc.Prefab)
  private inactiveBlock: cc.Prefab = null;

  private _isBlock = false;

  private get isBlock(): boolean {
    return this._isBlock;
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

        this.node.addChild(block);

        block.setPosition(cc.v2(0, 0));

        this.getComponent(cc.Animation).pause();
      }
    }
  }

  public toggleState(): void {
    if (!this.isBlock) {
      this.isBlock = true;
    } else {
      this.isBlock = false;
    }
  }
}
