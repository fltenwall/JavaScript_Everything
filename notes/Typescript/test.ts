type Animal = {
    name: string,
    age : string,
}

type MapAnimal<T> = {
    -readonly [key in keyof T]-?: [key]
}

type AnotherAnimal = MapAnimal<Animal>