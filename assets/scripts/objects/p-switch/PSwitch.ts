import Camera from '../../camera/Camera';
import Coin from '../../items/coins/coin/Coin';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PSwitch extends cc.Component {
  @property(cc.Node)
  public coinsNode: cc.Node = null;

  @property(Camera)
  public camera: Camera = null;

  private isActive = true;

  private effect(): void {
    cc.tween(this.node)
      .parallel(
        cc
          .tween()
          .delay(0.1)
          .call(() => {
            this.coinsNode.children.forEach(element => {
              element.getComponent(Coin).toggleState();
            });
          })
          .delay(10)
          .call(() => {
            this.coinsNode.children.forEach(element => {
              element.getComponent(Coin).toggleState();

              this.node.destroy();
            });
          }),
        cc
          .tween()
          .delay(1)
          .call(() => {
            this.node.opacity = 0;
          }),
        cc.tween().repeat(
          9,
          cc
            .tween()
            .delay(0.2 / 3)
            .call(() => {
              this.camera.node.y += 4;
            })
            .delay(0.2 / 3)
            .call(() => {
              this.camera.node.y -= 4;
            })
            .delay(0.2 / 3)
            .call(() => {
              this.camera.node.y += 4;
            })
            .delay(0.2 / 3)
            .call(() => {
              this.camera.node.y -= 4;
            })
        )
      )
      .start();
  }

  public onAnimationEnd(): void {
    this.getComponent(cc.RigidBody).destroy();
    this.node.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y - 4));
    this.effect();
  }

  private onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (other.tag === 1 && other.getComponent(cc.RigidBody).linearVelocity.y <= 0 && this.isActive) {
      this.isActive = false;
      this.getComponent(cc.Animation).play();
    }
  }

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (other.tag === 1) {
      if (Math.random() > 0.5) this.getComponent(cc.RigidBody).linearVelocity = cc.v2(150, 0);
      else this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-150, 0);
    }
  }

  private onEndContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (other.tag === 1) {
      this.getComponent(cc.RigidBody).linearVelocity = cc.v2(20, 0);
    }
  }

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  // start() {}

  // update (dt) {}
}
