// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
      // const finalBoundaryX = this.boundary.width * this.boundary.scaleX - this.node.parent.width;
      // eslint-disable-next-line no-console
      // console.log(`${boundaryX} ${this.node.x}`);

      this.node.x = cc.misc.clampf(cc.misc.lerp(this.node.x, targetPosition, 0.5), boundaryX, finalBoundaryX);
    }
  }
}
