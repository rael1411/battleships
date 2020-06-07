function battleshipFactory(size, align)
 {
  let hitArray = [];
  //initializing an array of parts that could be hit. 0 = undamaged, 1 = hit.
  for (let i = 0; i < size; i++) {
    hitArray.push(0);
  }
  return {
    length: size,
    health: hitArray,
    hit(position) {
      if (this.health[position] === 1){
        return false;
      }
      this.health[position] = 1;
    },
    sunk() {
      if (this.health.includes(0)) {
        return false;
      }
      return true;
    },
    align: align
  };
}

module.exports = battleshipFactory;
