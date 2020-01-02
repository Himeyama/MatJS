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
        return Matrix.rows([ary])
    }

    static rows(ary){
        let m = Matrix.zeros([ary.length, ary[0].length])
        for(let i = 0; i < m.row_size; i++){
            for(let j = 0; j < m.column_size; j++){
                m[i][j] = ary[i][j]
            }
        }
        return Matrix.of(...m)
    }

    static column_vector(ary){
        return Matrix.rows([ary]).t
    }

    static columns(ary){
        return Matrix.rows(ary).t
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
        return Matrix.ones(arg).mul(0)
    }

    get row_size(){
        return this.length
    }

    get column_size(){
        return this[0].length
    }

    get t(){
        let m = Matrix.ones([this.column_size, this.row_size])
        for(let i = 0; i < this.row_size; i++){
            for(let j = 0; j < this.column_size; j++){
                m[j][i] = this[i][j]
            }
        }
        return m
    }

    get transpose(){
        return this.t
    }

    mul(arg){
        let m
        if(typeof arg == "number"){
            m = Matrix.ones([this.row_size, this.column_size])
            for(let i = 0; i < this.row_size; i++){
                for(let j = 0; j < this.column_size; j++){
                    m[i][j] = this[i][j] * arg
                }
            }
        }else if(typeof arg == "object"){
            if(this.column_size != arg.row_size) throw new RangeError("不適切な行列サイズ")
            m = Matrix.ones([this.row_size, arg.column_size])
            for(let i = 0; i < this.row_size; i++){
                for(let j = 0; j < this.column_size; j++){
                    let s = 0
                    for(let k = 0; k < this.column_size; k++){
                        s += this[i][k] * arg[k][j]
                    }
                    if(s) m[i][j] = s
                }
            }
        }
        return m
    }

    add(mat){
        if(!(this.row_size == mat.row_size && this.column_size == mat.column_size)) throw new RangeError("")
        let m = Matrix.ones([this.row_size, this.column_size])
        for(let i = 0; i < this.row_size; i++){
            for(let j = 0; j < this.column_size; j++){
                m[i][j] = this[i][j] + mat[i][j]
            }
        }
        return m
    }

    to_tex(){
        let tex = "\\left(\n    \\begin{array}{ccc}\n"
        for(let i = 0; i < this.row_size; i++){
            tex += "        "
            for(let j = 0; j < this.column_size; j++){
                tex += this[i][j] + " & "
            }
            tex = tex.slice(0, -2)
            tex += "\\\\\n"
        }
        tex += "    \\end{array}\n\\right)"
        return tex
    }

    get inv(){
        return this.inverse
    }


    get inverse(){
        let a = Matrix.rows(this)
        let e = Matrix.identity(a.row_size)
        let k, l

        for(let i = 0; i < a.row_size; i++){
            for(let j = 0; j < a.column_size; j++){
                a[i][j] = new Rational(a[i][j], 1)
                e[i][j] = new Rational(e[i][j], 1)
            }
        }

        for(let m = 0; m < a.row_size; m++){
            k = a[m][m].reciprocal
            for(let i = 0; i < a.column_size; i++){
                a[m][i] = k.times(a[m][i])
                e[m][i] = k.times(e[m][i])
            }
            for(let i = m + 1; i < a.row_size; i++){
                l = (new Rational).minus(a[i][m])
                for(let j = 0; j < a.column_size; j++){
                    a[i][j] = (l.times(a[m][j])).plus(a[i][j]) 
                    e[i][j] = (l.times(e[m][j])).plus(e[i][j]) 
                }
            }
        }

        for(let m = a.row_size; m > 0; m--){
            for(let n = a.row_size - 1; n >= m; n--){
                k = (new Rational).minus(a[m - 1][n])
                for(let j = 0; j < a.column_size; j++){
                    a[m - 1][j] = (k.times(a[n][j])).plus(a[m - 1][j])
                    e[m - 1][j] = (k.times(e[n][j])).plus(e[m - 1][j])
                }
            }
        }

        for(let i = 0; i < a.row_size; i++){
            for(let j = 0; j < a.column_size; j++){
                e[i][j] = e[i][j].numerator / e[i][j].denominator
            }
        }

        return e
    }
}

class Rational{
    constructor(numerator = 0, denominator = 1){
        this.numerator = numerator
        this.denominator = denominator
        if(denominator < 0){
            this.numerator *= -1
            this.denominator *= -1
        }
    }

    plus(n){
        let r = new Rational
        r.numerator = this.numerator * n.denominator + this.denominator * n.numerator
        r.denominator = this.denominator * n.denominator
        r.reduction()
        return r
    }

    times(n){
        let r = new Rational
        r.numerator = this.numerator * n.numerator
        r.denominator = this.denominator * n.denominator
        r.reduction()
        return r
    }

    get reciprocal(){
        let r = new Rational
        if(this.numerator > 0){
            r.numerator = this.denominator
            r.denominator = this.numerator
        }else{
            r.numerator = -this.denominator
            r.denominator = -this.numerator
        }
        return r
    }

    minus(n){
        let r = new Rational(-1, 1)
        return r.times(n).plus(this)
    }

    reduction(){
        let gcd = Rational.gcd(this.numerator, this.denominator)
        this.numerator /= gcd
        this.denominator /= gcd
    }

    static gcd(a, b){
        let m, d
        while(true){
            if(b == 0) break
            m = a % b
            a = b
            b = m
        }
        return a
    }
}

