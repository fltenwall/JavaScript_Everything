const Koa = require('koa')
const { graphqlHTTP } = require('koa-graphql')

const app = new Koa();

app.use(
    graphqlHTTP({
        schema:require('./schema')
    })
)

app.listen(3000)

// http://localhost:3000/?query={comment{name}}

/** 
 {
    "data": {
        "comment": [
                {
                    "name": "flten"
                }
            ]
        }
}
*/