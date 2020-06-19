class Align {
  static scaleToGameW(obj, per) {
    obj.displayWidth = window.innerWidth * per;
	  obj.scaleY = obj.scaleX;
  }
  static scaleToGameH(obj, per) {
    obj.displayHeight = window.innerHeight * per;
    obj.scaleX = obj.scaleY;
  }
  static centerH(obj) {
	  obj.x = window.innerWidth / 2;
  }
  static topSubtitle(obj) {
    obj.y = window.innerHeight / 3.5;
  }
  static centerV(obj) {
    obj.y = window.innerHeight / 2;
  }
  static top(obj) {
    obj.y = obj.displayHeight / 2;
  }
  static bottom(obj) {
    obj.y = window.innerHeight - obj.displayHeight / 2;
  }
  static bottomImg(obj) {
    obj.y = window.innerHeight;
  }
  static center(obj) {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2;
  }
  static centerSpine(obj, spine, scale) {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2 + (spine.displayHeight * scale / 2);
  }
  static left(obj) {
	  obj.x = obj.displayWidth / 2;
  }
  static right(obj) {
	  obj.x = window.innerWidth - obj.displayWidth / 2;
  }
  static rightSpine(obj, spine, scale) {
    obj.x = window.innerWidth - (spine.displayWidth * scale) / 2;
  }
  static outsideRight(obj) {
    obj.x = window.innerWidth + obj.displayWidth / 2 + 10;
  }
  static outsideRightSpine(obj, spine, scale) {
    obj.x = window.innerWidth + (spine.displayWidth * scale) / 2;
  }
  static outsideLeftSpine(obj, spine, scale) {
    obj.x = 0 - (spine.displayWidth * scale) / 2;
  }
  static dragPosition(obj, spine, scale) {
    obj.x = window.innerWidth / 2 - 150;
  }
  static crowdPosition(obj, spine, scale) {
    obj.x = window.innerWidth / 2 - 300;
  }
  static charactersOnGround(obj, spine, scale) {
    obj.y = window.innerHeight - window.innerHeight / 5 - 170;
  }
  static centerPlaneBottom(obj) {
    // ground position - ground height - centerbottom
    obj.y = window.innerHeight - window.innerHeight / 5 - 160 - obj.displayHeight / 2;
  }
}

export default Align;
