const express = require("express")
const PORT = 3000
const { init } = require("z3-solver")

let app = express()

async function getCtx(){
    let res = await init()
    return res.Context
}


app.get("/", (req, res) => {
    console.log("neheheh")
})

app.get("/solve", async (req, res) => {
    let Context = await getCtx()
    const {Solver, Int, And, Implies, BitVec} = new Context("main")
    
    const x = Int.const('x');
    const solver = new Solver();
    //solver.add(And(x.ge(0), x.le(9)));
    //console.log(solver.ctx.ast_from_string.toString())
    //console.log(solver.ctx.ast_from_string("(k = 5 => k + 1 = 6)"))

    const k = Int.const("k")

    const nehehe = "true => false"

    let parts = nehehe.split("=>").map(p => p.split(" ").map(c => c == "=" ? "==" : c).join(""))
    console.log(parts) // k == 5, k + 1 == 6


    const expr = `solver.add(Implies(${parts[0]}, ${parts[1]}))`

    eval(`${expr}`) // abomination

    let result = await solver.check(); 

    console.log(result)    

    res.send(`res: ${result}`)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})