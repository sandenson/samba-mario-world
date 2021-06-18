const { ccclass } = cc._decorator;

@ccclass
export default class LuckyBlockCoin extends cc.Component {
  public start(): void {
    cc.tween(this.node)
      .call(() => {
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200);
      })
      .delay(0.3)
      .call(() => this.node.destroy())
      .start();
  }
}
