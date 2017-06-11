
class MathHelper{
	constructor(){

	}
	/*
	Generates a random number between (and including) min and max.
	*/
	random(min, max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	//Creates an array of integers of count length.
	range(start, count) {
	  return Array.apply(0, Array(count))
	    .map((element, index) =>{
	      return index + start;
	  	}
		);
  }
}

export default MathHelper;
