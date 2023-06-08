class Factory{
    private constructor(){}
    private static factory:Factory = new Factory() 
    public static getFactory():Factory{
        return this.factory
    }
    fn1(){}
}

const f1 = Factory.getFactory()
const f2 = Factory.getFactory()
console.log(f1 === f2) // true