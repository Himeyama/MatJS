class Matrix extends Array{
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
        let r, c
        if(typeof arg == "number"){
            r = arg
            c = 1
        }else if(typeof arg == "object"){
            r = arg[0]
            c = arg[1]
        }
        let m = (new Matrix(r)).fill().map(x => (new Matrix(c)).fill(1))
        return m
    }

    static zeros(arg){
        return Matrix.ones(arg).product(0)
    }

    row_size(){
        return this.length
    }

    column_size(){
        return this[0].length
    }

    t(){
        let m = Matrix.ones([this.column_size(), this.row_size()])
        for(let i = 0; i < this.row_size(); i++){
            for(let j = 0; j < this.column_size(); j++){
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
            m = Matrix.ones([this.row_size(), this.column_size()])
            for(let i = 0; i < this.row_size(); i++){
                for(let j = 0; j < this.column_size(); j++){
                    m[i][j] = this[i][j] * arg
                }
            }
        }else if(typeof arg == "object"){
            if(this.column_size() != arg.row_size()) throw new RangeError("不適切な行列サイズ")
            m = Matrix.ones([this.row_size(), arg.column_size()])
            for(let i = 0; i < this.row_size(); i++){
                for(let j = 0; j < this.column_size(); j++){
                    let s = 0
                    for(let k = 0; k < this.column_size(); k++){
                        s += this[i][k] * arg[k][j]
                    }
                    if(s) m[i][j] = s
                }
            }
        }
        return m
    }

    summation(mat){
        if(!(this.row_size() == mat.row_size() && this.column_size() == mat.column_size())) throw new RangeError("")
        let m = Matrix.ones([this.row_size(), this.column_size()])
        for(let i = 0; i < this.row_size(); i++){
            for(let j = 0; j < this.column_size(); j++){
                m[i][j] = this[i][j] + mat[i][j]
            }
        }
        return m
    }

    to_tex(){
        let tex = "\\left(\n    \\begin{array}{ccc}\n"
        for(let i = 0; i < this.row_size(); i++){
            tex += "        "
            for(let j = 0; j < this.column_size(); j++){
                tex += this[i][j] + " & "
            }
            tex = tex.slice(0, -2)
            tex += "\\\\\n"
        }
        tex += "    \\end{array}\n\\right)"
        return tex
    }

    forward_gaussian_elim(vec = null, lmat = null){
        let t = 0
        let a = Matrix.from(this)
        let b = null
        let l = null
        let tmp
        if(vec){
            b = Matrix.from(vec)
        }
        if(lmat){
            l = Matrix.from(lmat)
        }
        console.log(a, b, l)
        
        // while(t < a.row_size()){
        //     if(a[t][t] == 0 && t < a.row_size() - 1){
        //         tmp = a[t]
        //         a[t] = a[t + 1]
        //         a[t + 1] = tmp
        //         if(b){
        //             tmp = b[t]
        //             b[t] = b[t + 1]
        //             b[t + 1] = tmp
        //         }
        //     }
        //     if(a[t][t] != 0){
        //         let x = 1.0 / a[t][t]
        //         a[t] = a[t] * x
        //         if(b) b[t] = b[t] * x
        //         let s = t + 1
        //         if(t < a.row_size()){
        //             while(s < a.row_size()){
        //                 x = -a[s][t]
        //                 if(l) l[t][s] = -x
        //                 a[s] = a[s] + a[t] * x
        //                 if(b) b[s] = b[s] + b[t] * x
        //                 s++
        //             }
        //         }
        //     }
        //     t++
        // }
        return [a, l]
    }
}

let u = Matrix.rows([[1, 1, 1], [2, 3, 4], [2, 1, 1]])
let l = Matrix.identity(3)
console.log(u.forward_gaussian_elim(null, l))