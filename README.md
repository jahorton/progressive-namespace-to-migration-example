This repo explores the process of converting namespace-based TS code to module-based in a progressive manner.

Much of the conversion work is inspired by https://www.geekytidbits.com/typescript-progressively-convert-namespaces-to-modules/ and https://jorgeartieda.gitbook.io/typescript-from-namespaces-to-modules/solution,
though the ordering of certain aspects will differ here.

# Partial conversion
1. Splitting the project in two - one with modules, one with namespaces.

The practical demonstration can be found by examining https://github.com/jahorton/progressive-namespace-to-migration-example/pull/1.
