// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StateMachine from '../../../utils/StateMachine';
import Mario from './Mario';
import MARIO_STATES from './MARIO_STATES';
import MOVEMENT_TYPE from './MOVEMENT_TYPE';

const { ccclass } = cc._decorator;

@ccclass
export default class MarioStateMachine extends StateMachine<MARIO_STATES, Mario> {
  public onAnimationStart(name: string): void {
    // eslint-disable-next-line no-console
    console.log(name);
  }

  public onAnimationEnd(name: string): void {
    switch (name) {
      case 'skid':
        this.actor.state = MARIO_STATES.moving;
        break;

      default:
        break;
    }
  }

  public onLoad(): void {
    this.actor = this.getComponent(Mario);
  }

  public update(): void {
    if (!this.actor.isJumping && this.actor.state === MARIO_STATES.jumping) this.actor.state = MARIO_STATES.idle;

    if (
      !this.actor.isJumping &&
      this.actor.rigidBody.linearVelocity.x === 0 &&
      this.actor.state !== MARIO_STATES.ducking &&
      this.actor.state !== MARIO_STATES.lookingUp &&
      this.actor.state !== MARIO_STATES.skidding
    )
      this.actor.state = MARIO_STATES.idle;

    if (this.actor.rigidBody.linearVelocity.y < 0 && this.actor.state !== MARIO_STATES.ducking)
      this.actor.state = MARIO_STATES.falling;

    if (
      this.actor.movementType !== MOVEMENT_TYPE.walking &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) <= this.actor.walkingMaxSpeed
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.walking;
    } else if (
      this.actor.movementType !== MOVEMENT_TYPE.running &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) >= this.actor.walkingMaxSpeed * 1.5
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.running;
    } else if (
      this.actor.movementType !== MOVEMENT_TYPE.intermediate &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) > this.actor.walkingMaxSpeed &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) < this.actor.walkingMaxSpeed * 1.5
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.intermediate;
    }
  }
}
