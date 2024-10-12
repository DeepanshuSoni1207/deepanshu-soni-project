class Calculator {
    add(numbers) {
      if (!numbers) return 0;
      let delimiter = /,|\n/; 
      let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);
      if (customDelimiterMatch) {
        delimiter = new RegExp(customDelimiterMatch[1]); 
        numbers = numbers.split("\n").slice(1).join("");
      }
      const numberArray = numbers.split(delimiter);
      const negatives = numberArray.filter(num => parseInt(num) < 0);
      if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
      }
      const sum = numberArray.reduce((total, num) => total + (parseInt(num) || 0), 0);
      return sum;
    }
  }
  
  const C1 = new Calculator();
  
  console.log(C1.add("")); // Output: 0
  console.log(C1.add("1")); // Output: 1
  console.log(C1.add("1,5")); // Output: 6
  console.log(C1.add("1\n2,3")); // Output: 6
  console.log(C1.add("//;\n1;2")); // Output: 3
  
  try {
    console.log(C1.add("1,-2,3")); // Throws an error: Negative numbers not allowed: -2
  } catch (e) {
    console.log(e.message);
  }
  
  try {
    console.log(C1.add("//;\n1;-2;3")); // Throws an error: Negative numbers not allowed: -2
  } catch (e) {
    console.log(e.message);
  }
  