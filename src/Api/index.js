await axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/todos/${i}`,
  });
  status += `(${i}) ${response.data.completed},`;
}