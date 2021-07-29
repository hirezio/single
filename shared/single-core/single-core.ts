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
given('description', async ()=>{
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
  (description: string, callback: (...args:any[])=>any): void
}

export interface GivenFunction extends TestFunction {
  only: TestFunction;
  skip: TestFunction;
}

const root = (1, eval)('this');

let currentRunningFunction: 'given' | 'when' | 'then' | undefined;
let numberOfWhens: number;
let numberOfThens: number;

beforeEach(function () {
  currentRunningFunction = undefined;
  numberOfWhens = 0;
  numberOfThens = 0;
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
    
    await callback();

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
  if (potentialPromise && typeof potentialPromise.then === 'function') {
    potentialPromise.then(() => {
      currentRunningFunction = oldContext;
    });
  } else {
    currentRunningFunction = oldContext;
  }
  
};

root.then = function then(description: string, callback: (...args:any[])=>any) {
  numberOfThens++;
  if (numberOfThens > 1) {
    throw new Error(getOnlyOneError('then'));
  }
  
  if (currentRunningFunction !== 'when') {
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
