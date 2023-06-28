def fibonacci(n):
    a = 1
    b = 1
    res = b
    for i in range(2,n):
        # res = dp[i-2] + dp[i-1]
        # dp.append(res)
        prevRes = res
        res = a + b
        a = b
        b = prevRes
    return res
print(fibonacci(7))