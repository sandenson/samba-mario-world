const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
  @property(cc.Node)
  public player: cc.Node = null;

  @property(cc.Node)
  public boundary: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  public start(): void {
    this.node.x = this.player.x;
  }

  // onLoad () {}

  public update(dt: number): void {
    if (this.player.isValid) {
      const targetPosition = this.player.x;

      const boundaryX = this.node.parent.convertToWorldSpaceAR(this.boundary.getPosition()).x - this.boundary.width / 2;

      const finalBoundaryX =
        this.boundary.width + boundaryX - this.node.parent.convertToNodeSpaceAR(this.node.getPosition()).x / 6;

      this.node.x = cc.misc.clampf(cc.misc.lerp(this.node.x, targetPosition, 0.5), boundaryX, finalBoundaryX);
    }
  }
}
