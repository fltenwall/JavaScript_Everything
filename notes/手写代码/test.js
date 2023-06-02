class EventBus{
    constructor(){
        this.eventMap = new Map()
    }
    on(eventName, callback){
        let events = this.eventMap.get(eventName)
        if(!events) this.eventMap.set(eventName, [])
        this.eventMap.get(eventName)?.push(callback)
    }
    emit(eventName){
        let events = this.eventMap.get(eventName)
        if(!events) return 
        events.forEach(callback => {
            callback()
        });
    }
}
