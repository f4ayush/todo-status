export const isPartitionValid  = (groups) => {
    // Rule 1: Check if the entire range of 1-10 is covered
    console.log(groups)
  
    const groupArr = groups.map((group) => [group.from, group.to]);
    const sortedGroups = groupArr.flat().sort((a, b) => a - b);
    const sortedArr = groupArr.sort((a, b) => a[0] - b[0]);
  
    console.log(sortedGroups);
    if (sortedGroups[0] !== 1 || sortedGroups[sortedGroups.length - 1] !== 10) {
      return {isValid:false, errorMessage: "All todos not present"};
    }
    console.log("groupSubset", 2, groupArr);
    // Rule 2: Check if there are no gaps between consecutive groups
    for (let i = 0; i < sortedArr.length - 1; i++) {
      const currentSubset = sortedArr[i];
      const nextSubset = sortedArr[i + 1];
  
      // Check for gaps
      if (currentSubset[1] + 1 !== nextSubset[0]) {
        return {isValid:false, errorMessage: "There is a gap between todos"};
      }
  
      // Check for overlap
      if (currentSubset[1] >= nextSubset[0]) {
        return {isValid:false, errorMessage: "There is a overlap in todos"};
      }
    }
    // All rules are satisfied
    return {isValid:true, errorMessage: ""};
  }