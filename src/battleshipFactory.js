const battleshipFactory = (size, align, coordinate) => {
  let hitArray = [];
  //initializing an array of parts that could be hit. 0 = undamaged, 1 = hit.
  for (let i = 0; i < size; i++) {
    hitArray.push(0);
  }
  let coordinates = [];
  if (align === "horiz"){
    for (let i = 0; i < size; i++){
      coordinates.push(i+coordinate);
    }
  }
  else {
    for (let i = 0; i < (size * 10); i += 10){
      coordinates.push(i+coordinate);
    }
  }
  return {
    length: size,
    health: hitArray,
    hit(position) {
      this.health[position] = 1;
    },
    sunk() {
      if (this.health.includes(0)) {
        return false;
      }
      return true;
    },
    align: align,
    coordinates: coordinates,
  };
};

module.exports = battleshipFactory;
