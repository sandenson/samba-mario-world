// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StateMachine from '../../../utils/StateMachine';
import Mario from './Mario';
import MARIO_STATES from './MARIO_STATES';

const { ccclass } = cc._decorator;

@ccclass
export default class MarioStateMachine extends StateMachine<MARIO_STATES, Mario> {
  public onAnimationStart(state: MARIO_STATES): void {
    // eslint-disable-next-line no-console
    console.log(state);
  }

  public onAnimationEnd(state: MARIO_STATES): void {
    // eslint-disable-next-line no-console
    console.log(state);
  }

  public onLoad(): void {
    this.actor = this.getComponent(Mario);
  }

  public update(): void {
    if (!this.actor.isJumping && this.actor.state === MARIO_STATES.jumping) this.actor.state = MARIO_STATES.idle;
    if (!this.actor.isJumping && this.actor.rigidBody.linearVelocity.x === 0) this.actor.state = MARIO_STATES.idle;
  }
}
