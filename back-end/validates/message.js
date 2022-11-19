const i18n = require('i18n');
const _ = require('lodash');

module.exports = (errors) => {
	return errors;
	// return errors.map((error) => {
	// 	const validationMessage = i18n.__('validationMessage');
	// 	const { string, number, object, any, alternatives, array, boolean, binary, date, _function, lazy, symbol } = validationMessage;
	// 	const { context = {}, code } = error;
	// 	const {
	// 		key,
	// 		child,
	// 		limit,
	// 		label,
	// 		reason,
	// 		pos,
	// 		pattern,
	// 		value,
	// 		name,
	// 		version,
	// 		cidr,
	// 		ref,
	// 		scheme,
	// 		form,
	// 		multiple,
	// 		mainWithLabel,
	// 		peersWithLabels,
	// 		to,
	// 		valids,
	// 		unknownMisses,
	// 		knownMisses,
	// 		patternLabel,
	// 		n,
	// 		map,
	// 	} = context;
	// 	let reasons = '';
	// 	if (reason) reasons = reason.map((item) => item.message).join(', ');
	// 	let message = '',
	// 		result = null;
	//
	// 	switch (code) {
	// 		/********************* String ***********************/
	// 		case 'string.base':
	// 			message = string.base;
	// 			break;
	// 		case 'string.max': // checked
	// 			message = string.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'string.min': // checked
	// 			message = string.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'string.length':
	// 			message = string.length.replace('{{limit}}', limit);
	// 			break;
	// 		case 'string.alphanum':
	// 			message = string.alphanum;
	// 			break;
	// 		case 'string.token':
	// 			message = string.token;
	// 			break;
	// 		case 'string.regex.base':
	// 			message = string.regex.base.replace('{{!value}}', value).replace('{{pattern}}', pattern);
	// 			break;
	// 		case 'string.regex.name':
	// 			message = string.regex.name.replace('{{!value}}', value).replace('{{name}}', name);
	// 			break;
	// 		case 'string.regex.invert.base':
	// 			message = string.regex.invert.base.replace('{{!value}}', value).replace('{{pattern}}', pattern);
	// 			break;
	// 		case 'string.regex.invert.name':
	// 			message = string.regex.invert.name.replace('{{!value}}', value).replace('{{name}}', name);
	// 			break;
	// 		case 'string.email':
	// 			message = string.email;
	// 			break;
	// 		case 'string.uri':
	// 			message = string.uri;
	// 			break;
	// 		case 'string.uriRelativeOnly':
	// 			message = string.uriRelativeOnly;
	// 			break;
	// 		case 'string.uriCustomScheme':
	// 			message = string.uriCustomScheme.replace('{{scheme}}', scheme);
	// 			break;
	// 		case 'string.isoDate':
	// 			message = string.isoDate;
	// 			break;
	// 		case 'string.guid':
	// 			message = string.guid;
	// 			break;
	// 		case 'string.hex':
	// 			message = string.hex;
	// 			break;
	// 		case 'string.hexAlign':
	// 			message = string.hexAlign;
	// 			break;
	// 		case 'string.base64':
	// 			message = string.base64;
	// 			break;
	// 		case 'string.dataUri':
	// 			message = string.dataUri;
	// 			break;
	// 		case 'string.hostname':
	// 			message = string.hostname;
	// 			break;
	// 		case 'string.normalize':
	// 			message = string.normalize.replace('{{form}}', form);
	// 			break;
	// 		case 'string.lowercase':
	// 			message = string.lowercase;
	// 			break;
	// 		case 'string.uppercase':
	// 			message = string.uppercase;
	// 			break;
	// 		case 'string.trim':
	// 			message = string.trim;
	// 			break;
	// 		case 'string.creditCard':
	// 			message = string.creditCard;
	// 			break;
	// 		case 'string.ref':
	// 			message = string.ref.replace('{{ref}}', ref);
	// 			break;
	// 		case 'string.ip':
	// 			message = string.ip.replace('{{cidr}}', cidr);
	// 			break;
	// 		case 'string.ipVersion':
	// 			message = string.ipVersion.replace('{{version}}', version).replace('{{cidr}}', cidr);
	// 			break;
	//
	// 		/********************* End String ***********************/
	//
	// 		/********************* Number ***********************/
	// 		case 'number.base':
	// 			message = number.base;
	// 			break;
	// 		case 'number.unsafe':
	// 			message = number.unsafe;
	// 			break;
	// 		case 'number.min':
	// 			message = number.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'number.max':
	// 			message = number.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'number.less':
	// 			message = number.less.replace('{{limit}}', limit);
	// 			break;
	// 		case 'number.greater':
	// 			message = number.greater.replace('{{limit}}', limit);
	// 			break;
	// 		case 'number.integer':
	// 			message = number.integer;
	// 			break;
	// 		case 'number.negative':
	// 			message = number.negative;
	// 			break;
	// 		case 'number.positive':
	// 			message = number.positive;
	// 			break;
	// 		case 'number.precision':
	// 			message = number.precision.replace('{{limit}}', limit);
	// 			break;
	// 		case 'number.ref':
	// 			message = number.ref.replace('{{ref}}', limit);
	// 			break;
	// 		case 'number.multiple':
	// 			message = number.multiple.replace('{{multiple}}', multiple);
	// 			break;
	// 		case 'number.port':
	// 			message = number.port;
	// 			break;
	// 		/********************* End Number ***********************/
	//
	// 		/*********************** Object *************************/
	// 		case 'object.base':
	// 			message = object.base;
	// 			break;
	// 		case 'object.child':
	// 			message = object.child.replace('{{!child}}', child).replace('{{reason}}', reasons);
	// 			break;
	// 		case 'object.min':
	// 			message = object.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'object.max':
	// 			message = object.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'object.length':
	// 			message = object.length.replace('{{limit}}', limit);
	// 			break;
	// 		case 'object.allowUnknown':
	// 			message = object.allowUnknown.replace('{{limit}}', limit);
	// 			break;
	// 		case 'object.with':
	// 			message = object.with.replace('{{mainWithLabel}}', mainWithLabel).replace('{{peerWithLabel}}', peerWithLabel);
	// 			break;
	// 		case 'object.without':
	// 			message = object.without.replace('{{mainWithLabel}}', mainWithLabel).replace('{{peerWithLabel}}', peerWithLabel);
	// 			break;
	// 		case 'object.missing':
	// 			message = object.missing.replace('{{peersWithLabels}}', peersWithLabels);
	// 			break;
	// 		case 'object.xor':
	// 			message = object.missing.replace('{{peersWithLabels}}', peersWithLabels);
	// 			break;
	// 		case 'object.oxor':
	// 			message = object.oxor.replace('{{peersWithLabels}}', peersWithLabels);
	// 			break;
	// 		case 'object.and':
	// 			message = object.and.replace('{{peersWithLabels}}', peersWithLabels).replace('{{missingWithLabels}}', missingWithLabels);
	// 			break;
	// 		case 'object.nand':
	// 			message = object.nand.replace('{{mainWithLabel}}', mainWithLabel).replace('{{peersWithLabels}}', peersWithLabels);
	// 			break;
	// 		case 'object.assert':
	// 			message = object.assert.replaceAll('{{ref}}', ref).replace('message', message);
	// 			break;
	// 		case 'object.rename.multiple':
	// 			message = object.rename.multiple.replace('{{from}}', from).replace('{{to}}', to);
	// 			break;
	// 		case 'object.rename.override':
	// 			message = object.rename.override.replace('{{from}}', from).replace('{{to}}', to);
	// 			break;
	// 		case 'object.rename.regex.multiple':
	// 			message = object.rename.regex.multiple.replace('{{from}}', from).replace('{{to}}', to);
	// 			break;
	// 		case 'object.rename.regex.override':
	// 			message = object.rename.regex.override.replace('{{from}}', from).replace('{{to}}', to);
	// 			break;
	// 		case 'object.type':
	// 			message = object.type.replace('{{type}}', type);
	// 			break;
	// 		case 'object.schema':
	// 			message = object.schema;
	// 			break;
	// 		/********************* End Object ***********************/
	//
	// 		/********************* Any ***********************/
	// 		case 'any.unknown':
	// 			message = any.unknown;
	// 			break;
	// 		case 'any.invalid':
	// 			message = any.invalid;
	// 			break;
	// 		case 'any.empty': // checked
	// 			message = any.empty;
	// 			break;
	// 		case 'any.required': // checked
	// 			message = any.required;
	// 			break;
	// 		case 'any.allowOnly':
	// 			message = any.allowOnly.replace('{{valids}}', valids);
	// 			break;
	// 		case 'any.default':
	// 			message = any.default;
	// 			break;
	// 		/********************* End any ***********************/
	//
	// 		/********************* Alternatives ***********************/
	// 		case 'alternatives.base':
	// 			message = alternatives.base;
	// 			break;
	// 		case 'alternatives.child':
	// 			message = alternatives.child;
	// 			break;
	// 		/********************* End alternatives ***********************/
	//
	// 		/********************* array ***********************/
	// 		case 'array.base':
	// 			message = array.base;
	// 			break;
	// 		case 'array.includes':
	// 			message = array.includes.replace('{{pos}}', pos);
	// 			break;
	// 		case 'array.includesSingle':
	// 			message = array.includesSingle.replace('{{!label}}', label);
	// 			break;
	// 		case 'array.includesOne':
	// 			console.log(context);
	// 			message = array.includesOne.replace('{{pos}}', pos).replace('{{reason}}', reasons);
	// 			break;
	// 		case 'array.includesOneSingle':
	// 			message = array.includesOneSingle.replace('{{!label}}', label).replace('{{reason}}', reasons);
	// 			break;
	// 		case 'array.includesRequiredUnknowns':
	// 			message = array.includesRequiredUnknowns.replace('{{unknownMisses}}', unknownMisses);
	// 			break;
	// 		case 'array.includesRequiredKnowns':
	// 			message = array.includesRequiredKnowns.replace('{{knownMisses}}', knownMisses);
	// 			break;
	// 		case 'array.includesRequiredBoth':
	// 			message = array.includesRequiredBoth.replace('{{knownMisses}}', knownMisses).replace('{{unknownMisses}}', unknownMisses);
	// 			break;
	// 		case 'array.excludes':
	// 			message = array.excludes.replace('{{pos}}', pos);
	// 			break;
	// 		case 'array.excludesSingle':
	// 			message = array.excludesSingle.replace('{{!label}}', label);
	// 			break;
	// 		case 'array.hasKnown':
	// 			message = array.hasKnown.replace('{{!patternLabel}}', patternLabel);
	// 			break;
	// 		case 'array.hasUnknown':
	// 			message = array.hasUnknown;
	// 			break;
	// 		case 'array.min':
	// 			message = array.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'array.max':
	// 			message = array.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'array.length':
	// 			message = array.length.replace('{{limit}}', limit);
	// 			break;
	// 		case 'array.ordered':
	// 			message = array.ordered.replace('{{pos}}', pos).replace('{{reason}}', reasons);
	// 			break;
	// 		case 'array.orderedLength':
	// 			message = array.orderedLength.replace('{{pos}}', pos).replace('{{limit}}', limit);
	// 			break;
	// 		case 'array.ref':
	// 			message = array.ref.replace('{{ref}}', ref);
	// 			break;
	// 		case 'array.sparse':
	// 			message = array.sparse;
	// 			break;
	// 		case 'array.unique':
	// 			message = array.unique.replace('{{pos}}', pos);
	// 			break;
	// 		/********************* End array ***********************/
	//
	// 		/********************* Boolean ***********************/
	// 		case 'boolean.base':
	// 			message = boolean.base;
	// 			break;
	// 		/********************* End Boolean ***********************/
	//
	// 		/********************* Binary ***********************/
	// 		case 'binary.base':
	// 			message = binary.base;
	// 			break;
	// 		case 'binary.min':
	// 			message = binary.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'binary.max':
	// 			message = binary.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'binary.length':
	// 			message = binary.length.replace('{{limit}}', limit);
	// 			break;
	// 		/********************* End binary ***********************/
	//
	// 		/********************* Date ***********************/
	// 		case 'date.base':
	// 			message = date.base;
	// 			break;
	// 		case 'date.strict':
	// 			message = date.strict;
	// 			break;
	// 		case 'date.min':
	// 			message = date.min.replace('{{limit}}', limit);
	// 			break;
	// 		case 'date.max':
	// 			message = date.max.replace('{{limit}}', limit);
	// 			break;
	// 		case 'date.less':
	// 			message = date.less.replace('{{limit}}', limit);
	// 			break;
	// 		case 'date.greater':
	// 			message = date.greater.replace('{{limit}}', limit);
	// 			break;
	// 		case 'date.isoDate':
	// 			message = date.isoDate;
	// 			break;
	// 		case 'date.timestamp.javascript':
	// 			message = date.timestamp.javascript;
	// 			break;
	// 		case 'date.timestamp.unix':
	// 			message = date.timestamp.unix;
	// 			break;
	// 		case 'date.ref':
	// 			message = date.ref.replace('{{ref}}', ref);
	// 			break;
	// 		/********************* End date ***********************/
	//
	// 		/********************* Function ***********************/
	// 		case '_function.base':
	// 			message = _function.base;
	// 			break;
	// 		case '_function.arity':
	// 			message = _function.arity.replace('{{n}}', n);
	// 			break;
	// 		case '_function.minArity':
	// 			message = _function.minArity.replace('{{n}}', n);
	// 			break;
	// 		case '_function.maxArity':
	// 			message = _function.maxArity.replace('{{n}}', n);
	// 			break;
	// 		case '_function.ref':
	// 			message = _function.ref;
	// 			break;
	// 		case '_function.class':
	// 			message = _function.class;
	// 			break;
	// 		/********************* End function ***********************/
	//
	// 		/********************* Lazy ***********************/
	// 		case 'lazy.base':
	// 			message = lazy.base;
	// 			break;
	// 		case 'lazy.schema':
	// 			message = lazy.schema;
	// 			break;
	// 		/********************* End lazy ***********************/
	//
	// 		/********************* Symbol ***********************/
	// 		case 'symbol.base':
	// 			message = symbol.base;
	// 			break;
	// 		case 'symbol.map':
	// 			message = symbol.map.replace('{{map}}', map);
	// 			break;
	// 		/********************* End symbol ***********************/
	// 		default:
	// 			result = error;
	// 			break;
	// 	}
	// 	if (message) result = { message: `"${key}": ${message}` };
	// 	return result;
	// });
};
