class Matrix extends Array{
    rowSize
    colSize

    static of(...arg){
        let m = super.of(...arg)
        m.rowSize = m.length
        m.colSize = m[0].length
        return m
    }

    static identity(n){
        let m = Matrix.zeros([n, n])
        for(let i = 0; i < n; i++) m[i][i] = 1
        return m
    }

    static unit(n){
        return Matrix.identity(n)
    }

    static empty(row_size = 0, col_size = 0){
        return Matrix.zeros([row_size, col_size])
    }

    static row_vector(ary){
        return Matrix.of(...[ary])
    }

    static rows(ary){
        return Matrix.of(...ary)
    }

    static column_vector(ary){
        return Matrix.of(...[ary]).t()
    }

    static columns(ary){
        return Matrix.of(...ary).t()
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

    t(){
        let m = Matrix.ones([this.colSize, this.rowSize])
        for(let i = 0; i < this.rowSize; i++){
            for(let j = 0; j < this.colSize; j++){
                m[j][i] = this[i][j]
            }
        }
        return m
    }

    transpose(){
        return this.t()
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

    to_tex(){
        let tex = "\\left(\n    \\begin{array}{ccc}\n"
        for(let i = 0; i < this.rowSize; i++){
            tex += "        "
            for(let j = 0; j < this.colSize; j++){
                tex += this[i][j] + " & "
            }
            tex = tex.slice(0, -2)
            tex += "\\\\\n"
        }
        tex += "    \\end{array}\n\\right)"
        return tex
    }
}

