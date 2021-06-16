// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Character from '../Character';
import DIRECTION, { DIRECTIONS } from '../DIRECTION';
import MARIO_STATES from './MARIO_STATES';
import MOVEMENT_TYPE from './MOVEMENT_TYPE';

const { ccclass } = cc._decorator;

@ccclass
export default class Mario extends Character {
  public jumpForce = 3000;

  public moveForce = 500;

  public maxSpeed = 600;

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

  public stateReset = false;

  private _isSuper = false;

  public get isSuper(): boolean {
    return this._isSuper;
  }

  public set isSuper(value: boolean) {
    this._isSuper = value;
    this.canMove = false;
    this.rigidBody.gravityScale = 0;
    this.rigidBody.linearVelocity = cc.v2(0, 0);
    this.getComponent(cc.Animation).play('grow_up');
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
      this._movementType = value;

      this.state = MARIO_STATES.moving;
    }
  }

  private _vinesContact = false;

  public get vinesContact(): boolean {
    return this._vinesContact;
  }

  public set vinesContact(value: boolean) {
    if (value !== this.vinesContact) {
      this._vinesContact = value;

      if (!this.vinesContact && this.isClimbingVines) this.isClimbingVines = false;
    }
  }

  private _isClimbingVines = false;

  public get isClimbingVines(): boolean {
    return this._isClimbingVines;
  }

  public set isClimbingVines(value: boolean) {
    if (value !== this.isClimbingVines) {
      this._isClimbingVines = value;

      if (this.isClimbingVines) {
        this.climbingBool = true;
        this.state = MARIO_STATES.climbingVines;
        this.rigidBody.linearVelocity = cc.v2(0, 0);
        this.rigidBody.gravityScale = 0;
      } else {
        this.state = MARIO_STATES.idle;
        this.climbingBool = false;
        this.rigidBody.gravityScale = 1;
      }
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
            animationName += 'run';
            break;
          default:
            animationName += 'walk';
            break;
        }
      } else {
        animationName += this.state;
      }

      if (this.state !== MARIO_STATES.moving) {
        if (this.canMove) this.getComponent(cc.Animation).play(animationName);
      } else if (this.canMove) {
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

  private _climbingBool = false;

  public get climbingBool(): boolean {
    return this._climbingBool;
  }

  public set climbingBool(bool: boolean) {
    if (bool !== this.climbingBool) {
      this._climbingBool = bool;

      if (this.isClimbingVines && !this.climbingBool) this.getComponent(cc.Animation).pause();
      if (this.isClimbingVines && this.climbingBool) this.getComponent(cc.Animation).resume();
    }
  }

  public move(direction: DIRECTION): void {
    if (this.canMove) {
      if (this.state !== MARIO_STATES.ducking) {
        this.movePlayer(direction);
        if (direction.x !== 0 && direction !== this.facing) {
          this.turnAround(direction);
        } else if (
          !this.isJumping &&
          this.state !== MARIO_STATES.skidding &&
          this.state !== MARIO_STATES.falling &&
          this.state !== MARIO_STATES.climbingVines
        ) {
          this.state = MARIO_STATES.moving;
        }
      }
    }
  }

  private movePlayer(direction: DIRECTION) {
    if (Math.abs(this.rigidBody.linearVelocity.x) < this.maxSpeed && !this.isClimbingVines) {
      this.rigidBody.applyForceToCenter(cc.v2(direction.x * this.moveForce, 0), true);
    } else {
      this.climbingBool = true;
      this.rigidBody.linearVelocity = cc.v2(direction.x * 75, direction.y * 75);
    }
  }

  private turnAround(direction: DIRECTION) {
    this.facing = direction;
    if (this.state === MARIO_STATES.moving) this.state = MARIO_STATES.skidding;
    else this.node.scaleX *= -1;
  }

  public jump(type: MARIO_STATES): void {
    if (
      !this.isJumping &&
      this.state !== MARIO_STATES.falling &&
      (type === MARIO_STATES.jumping || type === MARIO_STATES.spinJump)
    ) {
      if (this.state !== MARIO_STATES.ducking) this.state = type;
      this.isJumping = true;
      this.moveForce /= 1.5;
      this.maxSpeed /= 1.5;
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

  public climbVine(direction: DIRECTION): void {
    if (this.vinesContact && (direction === DIRECTIONS.up || direction === DIRECTIONS.down))
      this.isClimbingVines = true;
  }

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && this.isJumping) {
      this.isJumping = false;
      this.moveForce *= 1.5;
      this.maxSpeed *= 1.5;
    }
    if (self.tag === 2 && this.isClimbingVines) {
      this.isClimbingVines = false;
    }
    if (other.tag === 666) this.node.destroy();
  }

  private onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (other.tag === 111) this.vinesContact = true;
    if (other.tag === 333) {
      this.isSuper = true;
      other.node.destroy();
    }
  }

  private onCollisionExit(other: cc.Collider, self: cc.Collider) {
    if (other.tag === 111) this.vinesContact = false;
  }
}
