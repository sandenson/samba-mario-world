// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Character from '../Character';
import FACING from '../FACING';
import MARIO_STATES from './MARIO_STATES';
import MOVEMENT_TYPE from './MOVEMENT_TYPE';

const { ccclass } = cc._decorator;

@ccclass
export default class Mario extends Character {
  public jumpForce = 2.5;

  public moveForce = 3;

  public maxSpeed = 4;

  private _isSuper = false;

  public get isSuper(): boolean {
    return this._isSuper;
  }

  public set isSuper(value: boolean) {
    this._isSuper = value;
  }

  private _isHolding = false;

  public get isHolding(): boolean {
    return this._isHolding;
  }

  public set isHolding(value: boolean) {
    this._isHolding = value;
  }

  private _movementType: MOVEMENT_TYPE = MOVEMENT_TYPE.idle;

  public get movementType(): MOVEMENT_TYPE {
    return this._movementType;
  }

  public set movementType(value: MOVEMENT_TYPE) {
    this._movementType = value;
  }

  public _state: MARIO_STATES = MARIO_STATES.idle;

  public get state(): MARIO_STATES {
    return this._state;
  }

  public set state(value: MARIO_STATES) {
    this._state = value;

    let animationName = '';

    if (this.isSuper) {
      animationName = 'super_';

      if (this.isHolding) {
        animationName += 'hold_';
      }
    }

    if (this.state === MARIO_STATES.jumping) {
      switch (this.movementType) {
        case MOVEMENT_TYPE.running:
          animationName = 'run_jump';
          break;

        default:
          animationName = 'jump';
          break;
      }
    } else if (this.state === MARIO_STATES.moving) {
      animationName += 'walk';
    } else {
      animationName += this.state;
    }

    this.getComponent(cc.Animation).play(animationName);
  }

  public move(direction: FACING): void {
    this.movePlayer(direction);
    if (direction !== this.facing) {
      this.turnAround(direction);
    } else if (!this.isJumping) {
      this.state = MARIO_STATES.moving;
    }
  }

  private movePlayer(direction: FACING) {
    // console.log("move");
    if (Math.abs(this.rigidBody.linearVelocity.x) < this.maxSpeed * 50) {
      this.rigidBody.applyForceToCenter(cc.v2(direction * this.moveForce * 50, 0), true);
    }
  }

  private turnAround(direction: FACING) {
    this.node.scaleX *= -1;
    this.facing = direction;
  }

  public jump(): void {
    if (!this.isJumping) {
      this.state = MARIO_STATES.jumping;
      this.isJumping = true;
      this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce * 1000), true);
    }
  }

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && this.isJumping) {
      this.isJumping = false;
    }
  }

  public start(): void {
    this.jump();
    // eslint-disable-next-line no-console
    console.log('kek ou cringe');
  }
}
