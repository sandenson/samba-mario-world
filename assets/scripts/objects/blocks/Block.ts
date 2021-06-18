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
