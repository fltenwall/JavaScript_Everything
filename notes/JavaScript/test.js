const maxSubArray = function(prices){
    const len = prices.length
    let preValue = prices[0]
    let max = preValue
    for (let index = 1; index < len; index++) {
        preValue = Math.max(prices[index], prices[index]+preValue)
        max = Math.max(max, preValue)
    }
    return max
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))