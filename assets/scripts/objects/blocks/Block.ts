// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Block extends cc.Component {
  @property(cc.SpriteFrame)
  public abstract inactiveSpriteProperty: cc.SpriteFrame = null;

  public _isActive = true;

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(value: boolean) {
    if (value === false) {
      this._isActive = value;

      this.getComponent(cc.Sprite).spriteFrame = this.inactiveSpriteProperty;
    }
  }
}
