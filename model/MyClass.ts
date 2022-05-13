import type Properties from './Properties'

export default class MyClass {
	private _properties: Properties
	private static instance: MyClass

	private constructor(properties: Properties) {
		this._properties = properties
	}

	static getInstance(properties?: Properties) {
		if (MyClass.instance) {
			return MyClass.instance
		}

		if (properties) {
			MyClass.instance = new MyClass(properties)
			return MyClass.instance
		}

		// if MyClass is not instantiated and it didn't got properties,
		// then instantiate with defaultProperties
		const defaultProperties: Properties = {
			name: 'name',
			age: 0,
		}

		MyClass.instance = new MyClass(defaultProperties)
		return MyClass.instance
	}

	public get properties() {
		return this._properties
	}

	public set properties(properties: Properties) {
		properties.age = +properties.age
		this._properties = properties
	}
}
