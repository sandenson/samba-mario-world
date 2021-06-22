import LevelHUD from '../hud/LevelHUD';

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Item extends cc.Component {
  @property(cc.Integer)
  public value = 0;

  // public gameController: GameController = null;

  public onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
    if (other.tag === 1) this.node.destroy();
  }
}
