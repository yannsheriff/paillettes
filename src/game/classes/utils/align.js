import gameConfig from '../../config'

class Align {
  static scaleToGameW(obj, per) {
    obj.displayWidth = gameConfig.width * per;
	  obj.scaleY = obj.scaleX;
  }
  static scaleToGameH(obj, per) {
    obj.displayHeight = gameConfig.height * per;
    obj.scaleX = obj.scaleY;
  }
  static centerH(obj) {
	obj.x = gameConfig.width / 2;
  }
  static centerV(obj) {
    obj.y = gameConfig.height / 2;
  }
  static bottom(obj) {
    obj.y = gameConfig.height - obj.displayHeight / 2;
  }
  static center(obj) {
    obj.x = gameConfig.width / 2;
    obj.y = gameConfig.height / 2;
  }
  static left(obj) {
	  obj.x = obj.displayWidth / 2;
  }
  static right(obj) {
	  obj.x = gameConfig.width - obj.displayWidth / 2;
  }
}

export default Align;
