var { graphql, buildSchema } = require("graphql")

const schema = buildSchema(`
    type Comment {
        id: Int,
        name: String,
    }

    type Query {
        comment: [Comment]
    }
`)

schema.getQueryType().getFields().comment.resolve = ()=>{
    return [{
        id:1,
        name:'flten',
    }]
}

module.exports = schema