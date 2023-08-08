export const isPartitionValid  = (groups) => {
    // Rule 1: Check if the entire range of 1-10 is covered
    const groupArr = groups.map((group) => [group.from, group.to]);
    const sortedGroups = groupArr.flat().sort((a, b) => a - b);
    const sortedArr = groupArr.sort((a, b) => a[0] - b[0]);
  console.log(sortedArr, "asas")
    if(sortedGroups[sortedGroups.length - 1] > 10){
      return {isValid:false, errorMessage: "Max value can't be greater than 10", index:groupArr.length-1};
    }
    if (sortedGroups[0] !== 1 || sortedGroups[sortedGroups.length - 1] !== 10) {
      return {isValid:false, errorMessage: "All todos not present", index:groupArr.length-1};
    }
    console.log("groupSubset", 2, groupArr);
    // Rule 2: Check if there are no gaps between consecutive groups
    for (let i = 0; i < sortedArr.length - 1; i++) {
      const currentSubset = sortedArr[i];
      const nextSubset = sortedArr[i + 1];
  
      // Check for overlap
      if (currentSubset[1] >= nextSubset[0]) {
        return {isValid:false, errorMessage: "There is a overlap in todos", index: i};
      }
      
      // Check for gaps
      if (currentSubset[1] + 1 !== nextSubset[0]) {
        return {isValid:false, errorMessage: "There is a gap between todos", index: i};
      }
  
      
    }
    // All rules are satisfied
    return {isValid:true, errorMessage: ""};
  }