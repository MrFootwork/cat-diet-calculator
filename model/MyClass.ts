import type Properties from './Properties'

export default class MyClass {
	private _properties: Properties
	private static instance: MyClass

	private constructor(properties: Properties) {
		this._properties = properties
	}

	static getInstance(properties: Properties) {
		if (!MyClass.instance) {
			MyClass.instance = new MyClass(properties)
		}
		return MyClass.instance
	}

	public get properties() {
		return this._properties
	}

	public set properties(properties: Properties) {
		this._properties = properties
	}
}
