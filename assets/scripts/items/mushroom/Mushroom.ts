import DIRECTION, { DIRECTIONS } from '../../characters/DIRECTION';

const { ccclass } = cc._decorator;

@ccclass
export default class Mushroom extends cc.Component {
  private canChangeDirection = false;

  private _facing: DIRECTION = null;

  private get facing(): DIRECTION {
    return this._facing;
  }

  private set facing(value: DIRECTION) {
    if (value !== this.facing) {
      this._facing = value;

      this.getComponent(cc.RigidBody).linearVelocity = cc.v2(80 * this.facing.x, 0);
    }
  }

  private toggleFacing(): void {
    if (this.facing === DIRECTIONS.right) this.facing = DIRECTIONS.left;
    else this.facing = DIRECTIONS.right;
  }

  public onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider): void {
    if (other.tag === 3 && this.canChangeDirection) this.toggleFacing();
  }

  private beginMovement(): void {
    cc.tween(this.node)
      .call(() => {
        this.facing = DIRECTIONS.right;
      })
      .delay(0.5)
      .call(() => {
        this.canChangeDirection = true;
      })
      .start();
  }

  public onAnimationEnd(name: string): void {
    if (name === 'koopa_egg') {
      this.getComponent(cc.Animation).play('idle');
      this.beginMovement();
    }
  }

  public start(): void {
    if (!this.getComponent(cc.Animation).isValid) this.beginMovement();
  }
}
