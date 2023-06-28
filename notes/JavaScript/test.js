class Promise {
    constructor(executor){
        this.PromiseState = 'pendding'
        this.PromiseResult = null
        this.callbacks = []
        const self = this
        function resolve(data){
            if(self.PromiseState !== 'pendding') return
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
            if(self.callbacks.length > 0){
                self.callbacks.forEach(callback => {
                    callback.onResolve(data)
                })
            }
        }
        function reject(err){
            if(self.PromiseState !== 'pendding') return
            self.PromiseState = 'rejected'
            self.PromiseResult = err
            if(self.callbacks.length > 0){
                self.callbacks.forEach(callback => {
                    callback.onResolve(data)
                })
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onResolve, onReject){
        return new Promise((resolve, reject) => {
            try {
                if(this.PromiseState === 'fulfilled'){
                    let res = onResolve(this.PromiseResult)
                    if(res instanceof Promise) {
                        return res.then(val => {
                            resolve(val)
                        }, err => {
                            reject(err)
                        })
                    }else {
                        resolve(res)
                    }
                }
            } catch (error) {
                reject(error)
            }
            if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
            if(this.PromiseState === 'pendding') {
                // 保存回调函数
                this.callbacks.push({onResolve,onReject})
            }
        })
    }
}