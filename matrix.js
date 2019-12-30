class Matrix extends Array{
    rowSize
    colSize

    static of(...arg){
        let m = super.of(...arg)
        m.rowSize = m.length
        m.colSize = m[0].length
        return m
    }

    static ones(arg){
        let rowSize, colSize
        if(typeof arg == "number"){
            rowSize = arg
            colSize = 1
        }else if(typeof arg == "object"){
            rowSize = arg[0]
            colSize = arg[1]
        }
        let m = (new Matrix(rowSize)).fill().map(x => (new Matrix(colSize)).fill(1))
        m.rowSize = rowSize
        m.colSize = colSize
        return m
    }

    static zeros(arg){
        return Matrix.ones(arg).product(0)
    }

    product(arg){
        let m
        if(typeof arg == "number"){
            m = Matrix.ones([this.rowSize, this.colSize])
            for(let i = 0; i < this.rowSize; i++){
                for(let j = 0; j < this.colSize; j++){
                    m[i][j] = this[i][j] * arg
                }
            }
        }else if(typeof arg == "object"){
            if(this.colSize != arg.rowSize) throw new RangeError("不適切な行列サイズ")
            m = Matrix.ones([this.rowSize, arg.colSize])
            for(let i = 0; i < this.rowSize; i++){
                for(let j = 0; j < this.colSize; j++){
                    let s = 0
                    for(let k = 0; k < this.colSize; k++){
                        s += this[i][k] * arg[k][j]
                    }
                    if(s) m[i][j] = s
                }
            }
        }
        return m
    }
}

let a = Matrix.of(...[[1, 2, 3], [4, 5, 6]])
let b = Matrix.of(...[[1, 2], [3, 4], [5, 6]])
console.log(a)
console.log(b)
console.log(a.product(b))