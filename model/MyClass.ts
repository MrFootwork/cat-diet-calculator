export default class MyClass {
	private _name: string | null
	private _age: number | null
	private static instance: MyClass

	private constructor(properties: Properties) {
		this._name = properties.name
		this._age = properties.age
	}

	static getInstance(properties: Properties) {
		if (!MyClass.instance) {
			MyClass.instance = new MyClass(properties)
		}
		return MyClass.instance
	}

	public get name() {
		return this._name
	}

	public get age() {
		return this._age
	}

	public set name(name: string) {
		this._name = name
	}

	public set age(age: number) {
		this._age = age
	}
}

interface Properties {
	name: string | null
	age?: number | null
}

// FIXME only use properties in the class implementation
