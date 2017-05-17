export default class DomUtils {

	static wrap(el) {
		let wrapper = document.createElement('div');
		wrapper.id = `${el.id}-container`;

		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);

		return wrapper;
	}

}
