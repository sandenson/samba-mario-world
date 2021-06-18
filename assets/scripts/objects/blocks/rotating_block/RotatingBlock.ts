import VinesHeadSpawner from '../../../spawners/VinesHeadSpawner';
import Block from '../Block';

const { ccclass, property } = cc._decorator;

@ccclass
export default class RotatingBlock extends Block {
  private spawner: VinesHeadSpawner = null;

  private canRotate = true;

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && other.tag === 1) {
      if (this.isActive && !this.canRotate) {
        this.spawner.spawn(this.node);
        this.isActive = false;
        this.bonk();
      }
      if (this.canRotate) this.speen();
    }
  }

  private speen() {
    cc.tween(this.node)
      .call(() => {
        this.getComponent(cc.Animation).play('rotating_block');
        this.getComponent(cc.RigidBody).active = false;
      })
      .delay(3.8)
      .call(() => {
        this.getComponent(cc.Animation).stop();
        this.getComponent(cc.RigidBody).active = true;
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
