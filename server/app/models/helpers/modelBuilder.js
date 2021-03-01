/**
 * Returns defineModel function
 *
 * @param  {Object} sequelize The Sequelize instance
 */
const modelBuilder = (sequelize) => {
    /**
     * Defines and returnes a new model
     *
     * @param  {Object} modelOptions The model options object
     * @param  {String} modelOptions.name The model name
     * @param  {Object} attributes The model attributes
     * @param  {Object} options The model options
     */
    const defineModel = (modelOptions) => {
        const { name, attributes, options } = modelOptions;

        const instanceMethods = { ...options.instanceMethods };
        delete options.instanceMethods;

        const model = sequelize.define(name, attributes, options);

        Object.entries(instanceMethods).forEach(([method, val]) => {
            model.prototype[method] = val;
        });

        return model;
    };
    return defineModel;
};

export default modelBuilder;
