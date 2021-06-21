import VinesHeadSpawner from '../../../spawners/VinesHeadSpawner';
import Block from '../Block';

const { ccclass, property } = cc._decorator;

@ccclass
export default class RotatingBlock extends Block {
  @property(cc.SpriteFrame)
  public inactiveSpriteProperty: cc.SpriteFrame;

  private spawner: VinesHeadSpawner = null;

  private canRotate = true;

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && other.tag === 1 && this.isActive) {
      if (this.spawner !== null) this.spawner.spawn(this.node);
      this.isActive = false;
      this.onHit();
    }
  }

  public onHit(): void {
    cc.tween(this.node)
      .to(0.1, {
        position: cc.v3(this.node.getPosition().x, this.node.getPosition().y + 8, this.node.z),
      })
      .to(0.05, {
        position: cc.v3(this.node.getPosition().x, this.node.getPosition().y, this.node.z),
      })
      .start();
  }

  public onLoad(): void {
    const spawner = this.getComponent(VinesHeadSpawner);
    if (spawner !== null) {
      this.canRotate = false;
      this.spawner = spawner;
    }
  }
}
