// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FACING from './FACING';

const { ccclass } = cc._decorator;

@ccclass
export default abstract class Character extends cc.Component {
  protected _isJumping = false;

  public get isJumping(): boolean {
    return this._isJumping;
  }

  public set isJumping(value: boolean) {
    this._isJumping = value;
  }

  public facing: FACING = FACING.right;

  public abstract jumpForce = 0;

  public abstract moveForce = 0;

  public abstract maxSpeed = 0;

  public rigidBody: cc.RigidBody;

  public onLoad(): void {
    this.rigidBody = this.getComponent(cc.RigidBody);
  }
}
