import { inspect } from '../src';
const userData = {
  id: 1,
  name: 'John',
  profile: {
    email: 'john@example.com',
    preferences: null,
    settings: {
      theme: 'dark',
      notifications: true,
    },
  },
  history: [
    { date: new Date('2023-01-01'), action: 'login' },
    { date: new Date('2023-01-02'), action: 'logout' },
  ],
  roles: ['user', 'admin'],
  [Symbol.iterator]: () => ({ next: () => ({ value: undefined, done: true }) }),
  fn: (x: number) => x * 2,
  self: {} as any, // Circular reference
};
userData.self = userData;

const inspector = inspect(userData);

// 1. Basic properties
console.log('Keys:', inspector.keys); // [ 'id', 'name', 'profile', 'history', 'roles', Symbol(Symbol.iterator), 'fn', 'self' ]
console.log('Values:', inspector.values); // Array of corresponding values
console.log('Entries:', inspector.entries); // Array of [key, value] pairs
console.log('Size:', inspector.size); // 8

// 2. Property checks
console.log('Has "email":', inspector.in('profile')); // true

// 3. Navigation and type checking
const profile = inspector.to('profile').to('settings').to('theme');

console.log('Theme:', profile.value); // null

// 4. Function invocation
const fnResult = inspector.get('fn', 21); // 42
console.log('Function result:', fnResult);

// 5. Array handling
const historyItem = inspector.to('history').atIndex(0).get('date');
console.log('First history date:', historyItem.toISOString());

// 6. Type assertion
const asUser = inspector.as((v): v is typeof userData => true);
console.log('Asserted type:', asUser.value.name); // John

// 7. Required properties
try {
  const invalid = inspector.to('profile').required('invalid' as any);
} catch (e) {
  console.error('Required error:', e.message); // "Property invalid not found"
}

// 8. Default fallback
const nullInspector = inspect(null as any);
console.log('Fallback:', nullInspector.or('default')); // 'default'

// 9. Type narrowing
if (inspector.when('name', 'John')) {
  console.log('User is John');
}

// 10. Pick/omit
const picked = inspector.pick('id', 'name');
console.log('Picked:', picked.value); // { id: 1, name: 'John' }

const omitted = inspector.omit('id', 'roles');
console.log('Omitted:', omitted.value); // Original object without id/roles

// 11. Deep search
const found = inspector.find((v): v is Date => v instanceof Date);
console.log('Found date:', found?.value.toISOString());

// 12. Transformations
const mapped = inspector.map((v, k) => `${k}=${v}`);
console.log('Mapped:', mapped.value);

const filtered = inspector.filter((v, k) => typeof v === 'string');
console.log('Filtered:', filtered.value);

const reduced = inspector.reduce(
  (acc, v) => acc + (typeof v === 'number' ? v : 0),
  0,
);
console.log('Reduced sum:', reduced);

// 14. Empty check
console.log('Is empty:', inspect({}).isEmpty()); // true

// 15. Includes check
console.log('Contains admin:', inspector.to('roles').includes('admin')); // true

// 16. Circular reference handling
try {
  const circular = inspector.find((v): v is typeof userData => v === userData);
  console.log('Circular ref handled:', circular?.value === userData); // true
} catch (e) {
  console.error('Circular ref error:', e);
}

// 17. Error edge cases
try {
  inspect(42 as any).keys; // Throws
} catch (e) {
  console.error('Non-object keys error:', e.message);
}

try {
  inspector.atIndex(5); // Invalid array index
} catch (e) {
  console.error('Array index error:', e.message);
}

// 18. Null navigation
const nullPrefs = inspector.to('profile').to('preferences');
console.log('Null navigation:', nullPrefs.value); // null

// 19. Symbol property access
const iterator = inspector.get(Symbol.iterator);
console.log('Symbol property:', typeof iterator); // object
