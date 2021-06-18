const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Block extends cc.Component {
  @property(cc.SpriteFrame)
  public inactiveSpriteProperty: cc.SpriteFrame = null;

  protected _isActive = true;

  protected get isActive(): boolean {
    return this._isActive;
  }

  protected set isActive(value: boolean) {
    if (value === false) {
      this._isActive = value;

      if (this.getComponent(cc.Animation).isValid) this.getComponent(cc.Animation).stop();
      this.getComponent(cc.Sprite).spriteFrame = this.inactiveSpriteProperty;
    }
  }

  protected bonk(): void {
    cc.tween(this.node)
      .to(0.1, {
        position: cc.v3(this.node.getPosition().x, this.node.getPosition().y + 8, this.node.z),
      })
      .to(0.05, {
        position: cc.v3(this.node.getPosition().x, this.node.getPosition().y, this.node.z),
      })
      .start();
  }
}
