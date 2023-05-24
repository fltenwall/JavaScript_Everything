var { graphql, buildSchema } = require("graphql")

// 根据协议定义数据模型
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

// 接受前端请求，进行数据查取并返回
module.exports = function(query){
    return graphql({schema,source: "{ hello }",rootValue,}).then(response => {
        // console.log(response)
        return response
      })
}