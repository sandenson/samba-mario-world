// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DIRECTION, { DIRECTIONS } from './DIRECTION';

const { ccclass } = cc._decorator;

@ccclass
export default abstract class Character extends cc.Component {
  private _canMove = true;

  public get canMove(): boolean {
    return this._canMove;
  }

  public set canMove(value: boolean) {
    if (value !== this.canMove) {
      this._canMove = value;

      if (!this.canMove) {
        this.rigidBody.linearVelocity = cc.v2(0, 0);
        if (this.isJumping) this.rigidBody.gravityScale = 0;
      } else {
        this.rigidBody.gravityScale = 1;
      }
    }
  }

  protected _isJumping = false;

  public get isJumping(): boolean {
    return this._isJumping;
  }

  public set isJumping(value: boolean) {
    this._isJumping = value;
  }

  public facing: DIRECTION = DIRECTIONS.right;

  public abstract jumpForce = 0;

  public abstract moveForce = 0;

  public abstract maxSpeed = 0;

  public rigidBody: cc.RigidBody;

  public animationComponent: cc.Animation;

  public onLoad(): void {
    this.rigidBody = this.getComponent(cc.RigidBody);
    this.animationComponent = this.getComponent(cc.Animation);
  }
}
