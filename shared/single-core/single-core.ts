export function getOnlyOneError(funcName: string): string {
  return `There must be only 1 "${funcName}" per test`;
}

export function getMustBeAChildError(funcName: string): string {
  let parentName = 'given';
  if (funcName === 'then') {
    parentName = 'when';
  }
  return `"${funcName}" must be a child of the function "${parentName}"`;
}

export const WHEN_IS_ASYNC_ERROR = `
====================================
You wrapped the "when" callback with "async".
Please wrap the "given" callback with async as well and run "when" with await like this:
 
                      👇  
given('description', async () => {
   👇 
  await when('description', async () => {
    
    ... your "await" code ...

  });
})
====================================
`

declare global {
  const given: GivenFunction;
  const fgiven: TestFunction;
  const xgiven: TestFunction;
  const when: TestFunction;
  const then: TestFunction;
}

export interface TestFunction{
  (description: string, callback: TestCallback): void
}

export interface GivenFunction extends TestFunction {
  only: TestFunction;
  skip: TestFunction;
}

export interface DoneFn {
  (...args: Error[]): void;
  fail: (...args: Error[]) => void;
}

export interface TestCallback {
  (done: DoneFn, ...args:any[]): any;
}

const root = (1, eval)('this');

let currentRunningFunction: 'given' | 'when' | 'then' | undefined;
let numberOfWhens: number;
let numberOfThens: number;
let doneFunctionIsSet: boolean = false;

beforeEach(function () {
  currentRunningFunction = undefined;
  numberOfWhens = 0;
  numberOfThens = 0;
  doneFunctionIsSet = false;
});

root.given = function given(description: string, callback: (...args:any[])=>any) {
  if (currentRunningFunction !== undefined) {
    throw new Error(getOnlyOneError('given'));
  }
  
  const fullDescription = getFullDescription(description, callback);
  it(fullDescription, getGivenCallbackWrapper(callback));
};

function getFullDescription(givenDescription: string, callback: (...args:any[])=>any): string{
  const functionContent = callback.toString();
  const regex = /when\(["'`](.*?)["'`],.*then\(["'`](.*?)["'`],/mgs;
  
  const match = regex.exec(functionContent);
  
  let fullDescription = `
    GIVEN ${givenDescription}`;

  if (match) {
    /* istanbul ignore next */
    if (match[1]) {
      fullDescription += `
    WHEN  ${match[1]}`;
    }
    /* istanbul ignore next */
    if (match[2]) {
      fullDescription += `
    THEN  ${match[2]}`;
    }
  }

  return fullDescription;
}

root.given.only = root.fgiven = function given(description: string, callback: (...args:any[])=>any) {
  if (currentRunningFunction !== undefined) {
    throw new Error(getOnlyOneError('given'));
  }
  
  fit('GIVEN ' + description, getGivenCallbackWrapper(callback));
};

function getGivenCallbackWrapper(callback: (...args:any[])=>any) {
  return async function givenCallbackWrapper() {

    currentRunningFunction = 'given';
    
    await promisify(callback);

  }
}

root.given.skip = root.xgiven = function given(description: string, callback: any) {
  xit(description, callback);
};


root.when = function when(description: string, callback: (...args:any[])=>any) {
  numberOfWhens++;
  if (numberOfWhens > 1) {
    throw new Error(getOnlyOneError('when'));
  }

  if (currentRunningFunction !== 'given') {
    throw new Error(getMustBeAChildError('when'));
  }
 
  const oldContext = currentRunningFunction;
  currentRunningFunction = 'when';

  const potentialPromise = callback();
  if (potentialPromise) {
    const then = potentialPromise.then;
    if (typeof then === 'function') {
      then.call(potentialPromise, () => {
        currentRunningFunction = oldContext;
      });
    } else {
      currentRunningFunction = oldContext;  
    }
  } else {
    currentRunningFunction = oldContext;
  }
  
};

root.then = function then(description: string, callback: (...args:any[])=>any) {
  numberOfThens++;
  if (numberOfThens > 1) {
    throw new Error(getOnlyOneError('then'));
  }
  
  if (!doneFunctionIsSet && currentRunningFunction !== 'when') {
    throw new Error(getMustBeAChildError('then'));
  }

  const oldContext = currentRunningFunction;
  currentRunningFunction = 'then';
  
  const potentialPromise = callback();
  if (potentialPromise && typeof potentialPromise.then === 'function') {
    potentialPromise.then(() => {
      currentRunningFunction = oldContext;
    });
  } else {
    currentRunningFunction = oldContext;
  }
};

async function promisify(fn: TestCallback): Promise<TestCallback> {
  if (doesFunctionHaveParams(fn)) {
    doneFunctionIsSet = true;
    return new Promise((resolve, reject) => {
      function next(err: Error) {
        if (err) {
          reject(err);
          return;
        }
        resolve(undefined as any);
      }
      next.fail = function nextFail(err: Error) {
        reject(err);
      };

      fn.call(this, next);
    });
  }
  return await (fn as () => any).call(this);
}

function doesFunctionHaveParams(fn: (...args: any[]) => any) {
  return fn.length > 0;
}
