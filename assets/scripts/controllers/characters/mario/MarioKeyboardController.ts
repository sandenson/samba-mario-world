import { DIRECTIONS } from '../../../characters/DIRECTION';
import Mario from '../../../characters/mario/Mario';
import MARIO_STATES from '../../../characters/mario/MARIO_STATES';
import KeyboardController from '../../KeyboardController';

const { ccclass } = cc._decorator;

@ccclass
export default class MarioKeyboardController extends KeyboardController {
  private mario: Mario = null;

  private pressedKeys: Array<boolean> = [];

  public onKeyDown(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.z:
        this.mario.jump(MARIO_STATES.jumping);
        break;
      case cc.macro.KEY.x:
        this.mario.jump(MARIO_STATES.spinJump);
        break;
      case cc.macro.KEY.c:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['c'] = true;
        break;
      case cc.macro.KEY.left:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['LEFT'] = true;
        break;
      case cc.macro.KEY.right:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['RIGHT'] = true;
        break;
      case cc.macro.KEY.down:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['DOWN'] = true;
        break;
      case cc.macro.KEY.up:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['UP'] = true;
        break;
      default:
        break;
    }
  }

  protected onKeyUp(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['LEFT'];

        if (this.mario.isClimbingVines) {
          this.mario.rigidBody.linearVelocity = cc.v2(0, 0);
          this.mario.climbingBool = false;
        }
        break;
      case cc.macro.KEY.right:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['RIGHT'];

        if (this.mario.isClimbingVines) {
          this.mario.rigidBody.linearVelocity = cc.v2(0, 0);
          this.mario.climbingBool = false;
        }
        break;
      case cc.macro.KEY.down:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['DOWN'];

        if (this.mario.state !== MARIO_STATES.climbingVines) this.mario.state = MARIO_STATES.idle;
        if (this.mario.isClimbingVines) {
          this.mario.rigidBody.linearVelocity = cc.v2(0, 0);
          this.mario.climbingBool = false;
        }
        break;
      case cc.macro.KEY.up:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['UP'];

        if (this.mario.state !== MARIO_STATES.climbingVines) this.mario.state = MARIO_STATES.idle;
        if (this.mario.isClimbingVines) {
          this.mario.rigidBody.linearVelocity = cc.v2(0, 0);
          this.mario.climbingBool = false;
        }
        break;
      case cc.macro.KEY.c:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['c'];
        this.mario.runHoldDown = false;
        break;
      default:
        break;
    }
  }

  public onLoad(): void {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    this.mario = this.getComponent(Mario);
  }

  public update(dt: number): void {
    if ('LEFT' in this.pressedKeys) {
      this.mario.move(DIRECTIONS.left);
    }
    if ('RIGHT' in this.pressedKeys) {
      this.mario.move(DIRECTIONS.right);
    }
    if ('DOWN' in this.pressedKeys) {
      if (this.mario.state !== MARIO_STATES.climbingVines && !this.mario.vinesContact) this.mario.duck();
      if (this.mario.vinesContact) this.mario.climbVine(DIRECTIONS.down);
      if (this.mario.isClimbingVines) this.mario.move(DIRECTIONS.down);
    }
    if ('UP' in this.pressedKeys) {
      if (this.mario.state !== MARIO_STATES.climbingVines && !this.mario.vinesContact) this.mario.lookUp();
      if (this.mario.vinesContact) this.mario.climbVine(DIRECTIONS.up);
      if (this.mario.isClimbingVines) this.mario.move(DIRECTIONS.up);
    }
    if ('c' in this.pressedKeys) {
      this.mario.runHoldDown = true;
    }
  }
}
