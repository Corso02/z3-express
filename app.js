const express = require("express")
const PORT = 3000
const { init } = require("z3-solver")

let app = express()

async function getCtx(){
    let res = await init()
    return res.Context
}

app.get("/", (req, res) => {

})

app.get("/solve", async (req, res) => {
    let Context = await getCtx()
    const {Solver, Int, And} = new Context("main")
    
    const x = Int.const('x');
    const solver = new Solver();
    solver.add(And(x.ge(0), x.le(9)));
    let result = await solver.check(); 
    
    res.send(`res: ${result}`)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})