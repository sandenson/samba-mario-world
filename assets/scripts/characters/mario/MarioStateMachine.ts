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
  private deathAux = true;

  public onAnimationStart(name: string): void {
    if (name === 'death') {
      if (this.deathAux) {
        this.deathAux = false;

        cc.tween(this.node)
          .call(() => this.actor.animationComponent.pause())
          .delay(0.75)
          .call(() => {
            this.actor.animationComponent.resume();
            this.actor.getComponents(cc.Collider).forEach(element => {
              // eslint-disable-next-line no-param-reassign
              element.enabled = false;
            });
            this.actor.rigidBody.gravityScale = 0.3;
            this.actor.rigidBody.linearVelocity = cc.v2(0, 300);
          })
          .delay(5)
          .call(() => this.actor.node.destroy())
          .start();
      }
    }
  }

  public onAnimationEnd(name: string): void {
    if (name === 'grow_up') {
      this.actor.canMove = true;
    }
    if (name === 'grow_down') {
      this.actor.canMove = true;

      cc.tween(this.node)
        .call(() => {
          this.node.opacity = 0;
        })
        .delay(0.133)
        .call(() => {
          this.node.opacity = 255;
        })
        .delay(0.133)
        .call(() => {
          this.node.opacity = 0;
        })
        .delay(0.133)
        .call(() => {
          this.node.opacity = 255;
        })
        .repeat(
          4,
          cc
            .tween()
            .delay(0.066)
            .call(() => {
              this.node.opacity = 0;
            })
            .delay(0.066)
            .call(() => {
              this.node.opacity = 255;
            })
        )
        .repeat(
          7,
          cc
            .tween()
            .delay(0.033)
            .call(() => {
              this.node.opacity = 0;
            })
            .delay(0.033)
            .call(() => {
              this.node.opacity = 255;
            })
        )
        .delay(0.033)
        .call(() => {
          this.node.opacity = 0;
        })
        .delay(0.133)
        .call(() => {
          this.node.opacity = 255;
          this.actor.isImmortal = false;
        })
        .start();
    }
    if (name === 'skid') {
      this.node.scaleX = this.actor.facing.x;
      this.actor.state = MARIO_STATES.moving;
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
      this.actor.state !== MARIO_STATES.skidding &&
      this.actor.state !== MARIO_STATES.idle &&
      !this.actor.isClimbingVines
    ) {
      this.actor.state = MARIO_STATES.idle;
    }

    if (
      !this.actor.onGround &&
      this.actor.rigidBody.linearVelocity.y < 0 &&
      this.actor.state !== MARIO_STATES.ducking &&
      this.actor.state !== MARIO_STATES.spinJump &&
      this.actor.state !== MARIO_STATES.climbingVines
    ) {
      this.actor.state = MARIO_STATES.falling;
    }

    if (
      this.actor.state !== MARIO_STATES.skidding &&
      this.actor.movementType !== MOVEMENT_TYPE.walking &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) <= this.actor.walkingMaxSpeed
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.walking;
    } else if (
      this.actor.state !== MARIO_STATES.skidding &&
      this.actor.movementType !== MOVEMENT_TYPE.running &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) >= this.actor.walkingMaxSpeed * 1.5
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.running;
    } else if (
      this.actor.state !== MARIO_STATES.skidding &&
      this.actor.movementType !== MOVEMENT_TYPE.intermediate &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) > this.actor.walkingMaxSpeed * 1.05 &&
      Math.abs(this.actor.rigidBody.linearVelocity.x) < this.actor.walkingMaxSpeed * 1.5
    ) {
      this.actor.fromUpdate = true;
      this.actor.movementType = MOVEMENT_TYPE.intermediate;
    }
  }
}
