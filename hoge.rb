class Array
    def * scalar
        self.map do |e|
            e * scalar
        end
    end

    def + array
        self.map.with_index do |e, i|
            e + array[i]
        end
    end

    def e n
        e = Array.new(n).map{Array.new(n){0}}
        n.times do |i|
            e[i][i] = 1
        end
        e
    end
end

#前進消去
def forward_gaussian_elim! a, b=nil, l=nil
    t = 0
    while t < a.size do
        if a[t][t] == 0 && t < a.size-1 then
            a[t], a[t+1] = a[t+1], a[t]
            b[t], b[t+1] = b[t+1], b[t] if b
        end
        if a[t][t] != 0 then
            x = (1.0/a[t][t])
            a[t] = a[t] * x
            b[t] = b[t] * x if b
            s = t + 1
            if t < a.size then
                while s < a.size do
                    x = (-a[s][t])
                    l[t][s] = -x if l
                    a[s] = a[s] + a[t] * x
                    b[s] = b[s] + b[t] * x if b
                    s += 1
                end
            end
        end
        t += 1
    end
    l.replace l.transpose if l
    a
end

def backward_gaussian_elim!(a, b)
    k = a.size - 2
    while k >= 0 do
        n = k + 1
        while n <= a.size - 1 do
            x = -a[k][n]
            a[k] = a[k] + a[n] * x
            b[k] = b[k] + b[n] * x
            n += 1
        end
        k -= 1
    end
    a
end

u = [[1,1,1],[2,3,4],[2,1,1]]
l = Array[].e(u.size)
puts "A = #{u}"
forward_gaussian_elim!(u, nil, l)
puts "L = #{l}"
puts "U = #{u}\n\n"