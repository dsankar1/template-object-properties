"use strict";
const _ = require('lodash');

/**
 * Creates a function which can interpolate template properties in the provided object.
 * @callback Template
 * @param {object} object
 * @returns {TemplateExecutor}
 */

/**
 * @callback TemplateExecutor
 * @param {object} data
 * @returns {object} Interpolated object
 */

const QUERY_REGEX = /\$\{([A-Za-z0-9_\-.\[\]]+)?\}/;
const EXCLUSIVE_QUERY_REGEX = new RegExp('^' + QUERY_REGEX.source + '$');

function interpolate(string, data) {
    const trimmed = _.trim(string);
    
    if (EXCLUSIVE_QUERY_REGEX.test(trimmed)) {
        const match = EXCLUSIVE_QUERY_REGEX.exec(trimmed);
        const path = _.get(match, 1);
        return _.get(data, path);
    }

    const compile = _.template(string);
    return compile(data);
}

function getTemplateProperties(value, path = [], paths = []) {
    if (_.isObjectLike(value)) {
        _.forEach(value, (child, key) => {
            getTemplateProperties(child, [...path, key], paths);
        });
    } else if (_.isString(value) && QUERY_REGEX.test(value)) {
        paths.push(path);
    }

    return paths;
}

/** @type {Template} */
function template(object) {
    const paths = getTemplateProperties(object);

    return data => {
        const interpolated = _.cloneDeep(object);

        _.forEach(paths, path => {
            const property = _.get(object, path);
            const result = interpolate(property, data);
            _.set(interpolated, path, result);
        });

        return interpolated;
    }
}

module.exports = template;
