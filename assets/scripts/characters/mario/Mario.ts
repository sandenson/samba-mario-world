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
  public jumpForce = 1800;

  public moveForce = 150;

  public maxSpeed = 200;

  public walkingMaxSpeed = 200;

  private _runHoldDown = false;

  public get runHoldDown(): boolean {
    return this._runHoldDown;
  }

  public set runHoldDown(value: boolean) {
    if (this.runHoldDown !== value) {
      this._runHoldDown = value;

      if (!this.runHoldDown) this.maxSpeed = this.walkingMaxSpeed;
      else this.maxSpeed = this.walkingMaxSpeed * 2;
    }
  }

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

  private _movementType: MOVEMENT_TYPE = MOVEMENT_TYPE.walking;

  public fromUpdate = false;

  public get movementType(): MOVEMENT_TYPE {
    return this._movementType;
  }

  public set movementType(value: MOVEMENT_TYPE) {
    if (this.runHoldDown && this.movementType !== value) {
      // eslint-disable-next-line no-console
      console.log(value);

      this._movementType = value;

      this.state = MARIO_STATES.moving;
    }
  }

  private _state: MARIO_STATES = MARIO_STATES.idle;

  public get state(): MARIO_STATES {
    return this._state;
  }

  public set state(value: MARIO_STATES) {
    if (
      this.state !== value ||
      (this.state === value && this.state === MARIO_STATES.moving && this.runHoldDown && this.fromUpdate)
    ) {
      this._state = value;

      let animationName = '';

      if (this.isSuper) animationName = 'super_';

      if (this.isHolding) animationName += 'hold_';

      if (this.state === MARIO_STATES.jumping && !this.isHolding) {
        switch (this.movementType) {
          case MOVEMENT_TYPE.running:
            animationName += 'run_jump';
            break;

          default:
            animationName = 'jump';
            break;
        }
      } else if (this.state === MARIO_STATES.jumping && this.isHolding) {
        animationName += 'jump';
      } else if (this.state === MARIO_STATES.moving) {
        switch (this.movementType) {
          case MOVEMENT_TYPE.running:
            animationName = 'run';
            break;
          default:
            animationName = 'walk';
            break;
        }
      } else {
        animationName += this.state;
      }

      // eslint-disable-next-line no-console
      // console.log(animationName);

      if (this.state !== MARIO_STATES.moving) {
        const anim = this.getComponent(cc.Animation).play(animationName);
        // eslint-disable-next-line no-console
        console.log(anim.speed);
      } else {
        const anim = this.getComponent(cc.Animation).play(animationName);

        if (this.movementType === MOVEMENT_TYPE.walking) anim.speed = 0.4;

        if (this.movementType === MOVEMENT_TYPE.intermediate) anim.speed = 0.6;

        if (this.movementType === MOVEMENT_TYPE.running) anim.speed = 1;

        this.fromUpdate = false;
      }
    }
  }

  protected _isJumping = false;

  public get isJumping(): boolean {
    return this._isJumping;
  }

  public set isJumping(value: boolean) {
    this._isJumping = value;

    if (!this.isJumping) this.state = MARIO_STATES.idle;
  }

  public move(direction: FACING): void {
    if (this.state !== MARIO_STATES.ducking) {
      this.movePlayer(direction);
      if (direction !== this.facing) {
        this.turnAround(direction);
      } else if (!this.isJumping && this.state !== MARIO_STATES.skidding && this.state !== MARIO_STATES.falling) {
        this.state = MARIO_STATES.moving;
      }
    }
  }

  private movePlayer(direction: FACING) {
    // console.log("move");
    if (Math.abs(this.rigidBody.linearVelocity.x) < this.maxSpeed) {
      this.rigidBody.applyForceToCenter(cc.v2(direction * this.moveForce, 0), true);
    }
  }

  private turnAround(direction: FACING) {
    if (this.state === MARIO_STATES.moving) this.state = MARIO_STATES.skidding;
    this.node.scaleX *= -1;
    this.facing = direction;
  }

  public jump(type: MARIO_STATES): void {
    if (
      !this.isJumping &&
      this.state !== MARIO_STATES.falling &&
      (type === MARIO_STATES.jumping || type === MARIO_STATES.spinJump)
    ) {
      if (this.state !== MARIO_STATES.ducking) this.state = type;
      this.isJumping = true;
      this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
    }
  }

  public duck(): void {
    if (
      this.state === MARIO_STATES.idle ||
      this.state === MARIO_STATES.kickingShell ||
      this.state === MARIO_STATES.lookingUp ||
      this.state === MARIO_STATES.moving ||
      this.state === MARIO_STATES.skidding
    ) {
      this.state = MARIO_STATES.ducking;
    }
  }

  public lookUp(): void {
    if (this.state === MARIO_STATES.idle) {
      this.state = MARIO_STATES.lookingUp;
    }
  }

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && this.isJumping) {
      this.isJumping = false;
    }
  }
}
