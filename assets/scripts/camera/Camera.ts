const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
  @property(cc.Node)
  public player: cc.Node = null;

  @property(cc.Node)
  public boundary: cc.Node = null;

  private initialY = 0;

  // LIFE-CYCLE CALLBACKS:

  public start(): void {
    this.node.x = this.player.x;

    this.initialY = this.node.y;
  }

  // onLoad () {}

  public update(dt: number): void {
    if (this.player.isValid) {
      const boundaryX = this.node.parent.convertToWorldSpaceAR(this.boundary.getPosition()).x - this.boundary.width / 2;

      const finalBoundaryX =
        this.boundary.width + boundaryX - this.node.parent.convertToWorldSpaceAR(this.node.getPosition()).x / 6;

      this.node.x = cc.misc.clampf(cc.misc.lerp(this.node.x, this.player.x, 0.5), boundaryX, finalBoundaryX);

      this.node.y = cc.misc.clampf(cc.misc.lerp(this.node.y, this.player.y, 0.25), this.initialY, this.boundary.height);
    }
  }
}
