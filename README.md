[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/altruisticnode/atomic-fox)
[![CI Status](https://github.com/altruisticnode/optional-deep-merge/workflows/CI/badge.svg)](https://github.com/altruisticnode/optional-deep-merge/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/optional-deep-merge)](https://www.npmjs.com/package/optional-deep-merge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# optional-deep-merge
This package provides a utility type `RecursivePartial<T>` and a function `optionalDeepMerge<T>(target: T, source: RecursivePartial<T>): T` for performing a deep merge of objects with recursively optional properties.

The `RecursivePartial<T>` type allows you to make all properties of an object type `T` recursively optional.

The `optionalDeepMerge` function performs a deep merge of an object `target` of type `T` with an object `source` of type `RecursivePartial<T>`, and returns a new object of type `T` that contains all properties from both objects, with values from the `source` object taking precedence over the `target` object.

## Usage

### Creating optional properties
To make all properties of an object type `T` recursively optional, use the `RecursivePartial<T>` type:
```typescript
import { RecursivePartial } from "optional-deep-merge";

interface Configuration {
  server: {
    host: string;
    port: number;
    ssl?: boolean;
  };
  database: {
    url: string;
    username: string;
    password: string;
  };
  logging: {
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
}

type PartialConfiguration = RecursivePartial<Configuration>;
```

### Merging recursively partial objects
To merge an object with recursively optional properties (`RecursivePartial<T>`) back to the origin type, use the `optionalDeepMerge` function:
```typescript
import { optionalDeepMerge } from "optional-deep-merge";

// Define default configuration
const defaultConfig: Configuration = {
  server: {
    host: 'localhost',
    port: 8080,
    ssl: false
  },
  database: {
    url: 'mongodb://localhost/mydb',
    username: 'myuser',
    password: 'mypassword'
  },
  logging: {
    enabled: true,
    level: 'info'
  }
};

// Define the configuration override
const customSettings: PartialConfiguration = {
  server: {
    port: 3000,
    ssl: true
  },
  database: {
    password: 'newpassword'
  },
  logging: {
    level: 'debug'
  }
};

const mergedConfig = optionalDeepMerge(defaultConfig, customSettings);
```

## License <a name = "license"></a>
Distributed under the [MIT](https://opensource.org/licenses/MIT) License. 

Please see the [LICENSE](https://github.com/altruisticnode/optional-deep-merge/blob/main/LICENSE) for more information.
