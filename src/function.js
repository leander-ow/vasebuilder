import { create, all } from 'mathjs';

const math = create(all);

export class MathFunction {
    constructor(functionString) {
        this.compiledFunction = math.compile(functionString);
    }

    evaluate(x) {
        return this.compiledFunction.evaluate({ x });
    }
}
